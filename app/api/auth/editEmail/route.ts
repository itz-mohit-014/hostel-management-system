import { CustomError } from "@/lib/Error";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { serverSession } from "@/lib/serverSession";

export const POST= async(req:NextRequest)=>{

    const session = await serverSession();

    if(!session){
        throw new CustomError("Unauthorised access");
    }

    try {
        const data = await req.json()

        if(!data || !data.email){
            throw new CustomError("Invalid Data")
        }

        const verifyOtp = await prisma.otp.findFirst({
            where:{
                email:data.email
            },
            select:{
                email:true,
                expiresAt:true,
                otp:true
            }
        })
        if(verifyOtp == null){
            throw new CustomError("Otp not found, Please try again")
        }
        const currDate = new Date(Date.now())


        if(currDate > verifyOtp?.expiresAt || verifyOtp.otp !== data.otp){
            throw new CustomError("Otp timeout, Please try again")
        }

        await prisma.otp.deleteMany({
            where:{
                email:data.email
            }
        })
        return NextResponse.json({
            success:true,
            message:"Email Verified Successfully",
            email: data.email
        },{
            status:200
        })

    } catch (error) {
        if(error instanceof CustomError){
            return NextResponse.json({
                message:error.error
            },{status:500})
        }else{
            const err = (error as Error).message
            return NextResponse.json({
                message:err
            },{status:500})
        }
    }
}