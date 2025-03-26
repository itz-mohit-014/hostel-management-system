"use server"

import { CustomError } from "@/lib/Error";
import { prisma } from "@/lib/prisma";

import { AdminRegisterSchema, profile, studentRegisterSchema } from "@/common/types";
import  otpGenerator  from 'otp-generator';
import { mailSender } from "@/lib/mailSender";
import { serverSession } from "../lib/serverSession";

export type AdminUser = Omit<Zod.infer<typeof AdminRegisterSchema>, "password"> & { profile:  Zod.infer<typeof profile>  } ;
export type StudentUser = Omit<Zod.infer<typeof studentRegisterSchema>, "password"> & { profile:  Zod.infer<typeof profile>  };

export type UserData = AdminUser | StudentUser | null | string  ;

export const getUser = async (): Promise<UserData> => {

  const userFromSession = await serverSession();
  if (!userFromSession) return null;

  const { id, role } = userFromSession ;

  try {

    const user =
      role === "Student"
        ? await prisma.user.findUnique({
            where: { id },
            include: { profile: true } 
          })
          : await prisma.admin.findUnique({
            where: { id },
            include: { profile: true } 
          });

    if (!user) throw new CustomError("User not found", false, 404);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword as StudentUser | AdminUser;

  } catch (error) {
    if (error instanceof CustomError) {
      return error.error;
    } else {
      return (error as Error).message ;
    }
  }
};


export const updateUserProfileData = async (updateData : any) => {
  
    const userFromSession = await serverSession();
    if(!userFromSession) return null;

    const {id , role} = userFromSession;

    try {

      if (!updateData || typeof updateData !== "object") {
        throw new CustomError("Invalid update data", false, 400);
      }

      if (updateData.profile && typeof updateData.profile === "object") {
        delete updateData.profile.id;
      }

      if(updateData.profile.userId) delete updateData.profile.userId ;
      
      if(updateData.profile.adminId) delete updateData.profile.adminId ;
  
      delete updateData.id;

      if(role === "Student"){
        updateData.courseName !== "other" ? updateData.otherCourseName = "" : null;
      }
      
      const user =
        role === "Student"
          ? await prisma.user.update({
              where : {
                id: id
              },
              data: {
                ...updateData,
                profile:{
                  update: {
                    ...updateData.profile
                  }
                }
              },
              include: { profile: true } 
            })
            : await prisma.admin.update({
              where : {
                id: id
              },
              data: {
                ...updateData,
                profile:{
                  update: {
                    ...updateData.profile
                  }
                }
              },
              include: { profile: true } 
            });
  
      if (!user) throw new CustomError("User not found", false, 404);
  
      const { password, ...userWithoutPassword } = user;
  
      return userWithoutPassword as StudentUser | AdminUser;
  
    } catch (error) {
      console.log(error)

      if (error instanceof CustomError) {
        return error.error;
      } else {
        return (error as Error).message ;
      }
    }
}

export const SendVerifyEmail = async(email:string)=>{
  try {
    if(!email) {
      throw new CustomError("Email Not Found")
    }
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});
    //delete previous otp

    const deleteOtp = await prisma.otp.deleteMany({
      where:{
        email:email
      }
    })

    const addOtp = await prisma.otp.create({      
      data:{
        otp:otp,
        email:email,
        expiresAt:new Date(Date.now() + 5 * 60 *1000)
      }
    })

    if(!addOtp || !addOtp.id){
      throw new CustomError("Failed to generate Otp")
    }

    mailSender(email, otp)
    
    return {message: "OTP sent successfully"};

  } catch (error) {
    if(error instanceof CustomError){
      return error.error
    }else{
      return (error as Error).message
    }
  }
}

