import { NextRequest, NextResponse } from "next/server"
import { passwordRegex, studentRegisterSchema } from '@/common/types';
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { CustomError } from "@/lib/Error";


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

        const currTime = new Date(Date.now())

        if(!Otp || (Otp.otp !== data.otp)){
            throw new CustomError("Invalid OTP.", false, 403)
        }

        if(Otp.expiresAt<currTime){
            throw new CustomError("Otp expired", false, 403)
        }
        
        //delete otp after verification

        if(Otp.otp === data.otp){
            await prisma.otp.delete({
                where:{
                    id:Otp.id
                }
            })
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
            throw new CustomError("Failed to create User", false, 404)
        }
        
        return NextResponse.json({
            success:true,
            message:"User created Successfully"
        },{
            status:200
        })

    } catch (error) {
        if(error instanceof CustomError){
            return NextResponse.json({
                success:error.success,
                message:error.error
            },{
                status:error.status
            })
        }else{
            const err = (error as Error).message
            return NextResponse.json({
                success:false,
                message:err || "Something went wrong"
            },{
                status:500
            })
        }
        
    }    
}