import { NextRequest, NextResponse } from "next/server"
import { AdminRegisterSchema, passwordRegex, studentRegisterSchema } from '@/common/types';
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { CustomError } from "@/lib/Error";

// step 1 : check the user type -> Student | Admin | Warden
// step 2 : validate the OTP to that user.
// step 3 : hash the password and save user to db.
// step 4 : return the response.

type ReqData = {
  userData : Zod.infer<typeof AdminRegisterSchema > | Zod.infer<typeof studentRegisterSchema >;
  otp : string
}

export const POST = async (req: NextRequest) => {
    const data : ReqData = await req.json(); // data : { userdata, otp } 

    const parseData =  data.userData.role !== "Student"
    ? AdminRegisterSchema.safeParse(data.userData)
    : studentRegisterSchema.safeParse(data.userData) ;
  
    if ( !parseData.success ) {
      return NextResponse.json(
        {
          message:
            parseData.error.issues.slice(-1)[0].message || "Invalid Details",
        },
        { status: 400 }
      );
    }
  
    try {
     
      const otpRecord = await prisma.otp.findFirst({
        where: { 
            email: data.userData.email
        },
      });
  
      const currentTime = new Date();
  
      console.log(otpRecord)
      console.log(data.otp)
      
      if (!otpRecord || otpRecord.otp !== data.otp) {
        throw new CustomError("Invalid OTP.", false, 403);
      }
  
      if (otpRecord.expiresAt < currentTime) {
        throw new CustomError("OTP expired", false, 403);
      }
      
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);

      const hashedPassword = bcrypt.hashSync(parseData.data.password, salt);
      parseData.data.password = hashedPassword;
      
      console.log(parseData.data.role);

      let createdUser ;

      if( parseData.data.role === 'Student' ) { 
          delete parseData.data.acceptTerms;

        createdUser = await prisma.user.create({
          data : parseData.data
        })
        
      }

      if( parseData.data.role === "Admin" || parseData.data.role === "Warden" ) { 
        createdUser = await prisma.admin.create({
          data : parseData.data
        })
      }
  
      if (!createdUser?.id) {
        throw new CustomError("Failed to create User", false, 404);
      }

       // Delete OTP after successful verification
      await prisma.otp.delete({
        where: { id: otpRecord.id },
      });
  
      return NextResponse.json(
        {
          success: true,
          message: "User created Successfully",
        },
        { status: 200 }
      );

    } catch (error) {
      if (error instanceof CustomError) {
        return NextResponse.json(
          {
            success: error.success,
            message: error.error,
          },
          { status: error.status }
        );
      } else {
        const errMessage = (error as Error).message;
        return NextResponse.json(
          {
            success: false,
            message: errMessage || "Something went wrong",
          },
          { status: 500 }
        );
      }
    }
  };
  