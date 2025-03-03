import { NextRequest, NextResponse } from "next/server"
import { passwordRegex, studentRegisterSchema } from '@/common/types';
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";


export  const POST = async (req:NextRequest) => {
    const data = await req.json()
    const parseData = studentRegisterSchema.safeParse(data.userData);

    if(!parseData || !parseData.success){
        return NextResponse.json({
            message:"Invalid Details"
        },{
            status:411
        })
    } 

    try {

       const Otp = await prisma.otp.findFirst({
            where:{
                email: data.userData.email
            }
        })

        if(!Otp || (Otp.otp !== data.otp)){
            throw new Error("Invalid OTP.")
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(parseData.data.password, salt);

        delete parseData.data.acceptTerms;
        parseData.data.password = hashPassword;

        const createUser = await prisma.user.create({
            data:parseData.data
        })  

        if(!createUser.id){
            throw new Error("Failed to create User")
        }
        
        return NextResponse.json({
            success:true,
            message:"User created Successfully"
        },{
            status:200
        })

    } catch (error) {
        const err = (error as Error).message
        return NextResponse.json({
            message:err
        },{
            status:500
        })
    }    
}