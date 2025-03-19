import { CustomError } from "@/lib/Error";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type ReqData = {
    email:string,
    role : "Student" | "Admin" | "Warden" 
}

export const POST = async (req: NextRequest) => {
  const data : ReqData = await req.json();

  try {

    let user;
    
    if(!data.email){
        throw new CustomError('Invalid Email', false, 403)
    }

    if(data.role === 'Student'){
        user = await prisma.user.findFirst({
            where:{
                email:data.email
            }
        })

    }else{
        user = await prisma.admin.findFirst({
            where:{
                email:data.email
            }
        })
    }

    if(!user || !user.id){
        throw new CustomError('Invalid Email', false, 403)
    }

    const deleteOtp = await prisma.otp.deleteMany({
        where:{
            email:data.email
        }
    })

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
