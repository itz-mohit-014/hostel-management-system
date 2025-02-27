import { mailSender } from "@/lib/mailSender";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"
import otpGenerator from 'otp-generator'

export const POST = async(req:NextRequest)=>{
    const data = await req.json()


    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});

    try {
        const createOtp = await prisma.otp.create({
            data:{
                email:data.email,
                otp:otp,
                expiresAt:new Date(Date.now() + 5*60*1000)
            }
        })
    
        if(!createOtp.id){
            throw new Error("Otp generation failed")
        }

        const mailResponse = await mailSender(data.email, otp)

        return NextResponse.json({
            success:true,
            message:"OTP sent successfully"
        })

    } catch (error) {
        const err = (error as Error).message
        return NextResponse.json({
            success:false,
            message:err
        },{
            status:500
        })
    }
}