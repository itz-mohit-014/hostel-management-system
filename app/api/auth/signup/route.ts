import { NextRequest, NextResponse } from "next/server"
import { registerSchema } from '@/common/types';
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";


export  const POST = async (req:NextRequest) => {
    const data = await req.json()
    const parseData = registerSchema.safeParse(data)
    if(!parseData || !parseData.success){
        return NextResponse.json({
            message:"Invalid Details"
        },{
            status:411
        })
    } 
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(parseData.data.password, salt);

        const createUser = await prisma.user.create({
            data:{
                name:parseData.data.name,
                email:parseData.data.email,
                password:hashPassword,
            }
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