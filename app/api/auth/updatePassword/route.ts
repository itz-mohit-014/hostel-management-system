import { CustomError } from "@/lib/Error";
import { NextRequest, NextResponse } from "next/server";
import  bcrypt  from 'bcrypt';
import { prisma } from "@/lib/prisma";
import { serverSession } from "@/lib/serverSession";


export const PUT = async(req:NextRequest)=>{
    try {
        const data = await req.json()

        const session = await serverSession();
        if(!session){
            throw new CustomError("Unauthorized Access")
        }


        if(!data && !data.newPassword){
            throw new CustomError("New Password Not found")
        }
 
        let user;
        if(session.role === "Student"){

         user = await prisma.user.findUnique({
            where:{
                id:session.id
            }
        })
        }
        else{
            user = await prisma.admin.findUnique({
                where:{
                    id:session.id
                }
            })  
        }
        if(!user){
            throw new CustomError("User not found")
        }

        const checkPassword = await bcrypt.compare(data.newPassword, user?.password)

        if(checkPassword){
            throw new CustomError("Please enter new Password")
        }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);

      const hashedPassword = bcrypt.hashSync(data.newPassword, salt);
        let updatePassword;
        if(session.role === "Student"){
            updatePassword = await prisma.user.update({
                where:{
                    id:session.id
                },data:{
                    password:hashedPassword
                }
            })
        }else{
            updatePassword = await prisma.admin.update({
                where:{
                    id:session.id
                },data:{
                    password:hashedPassword
                }
            })
        }

        if(!updatePassword || !updatePassword.id){
            throw new CustomError("Failed to update Password")
        }

        return NextResponse.json({
            success:true,
            message:"Password Updated successfully"
        },{status:200})

    } catch (error) {
            if(error instanceof CustomError){

        return NextResponse.json({
            success:false,
            message:error.error
        },{status:500})
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