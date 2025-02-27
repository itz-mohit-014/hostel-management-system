import nodemailer from "nodemailer"
import { prisma } from "./prisma"

export const mailSender = async(email:string, title:string, body:string) =>{
    try {
        
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },

        })
        let info = await transporter.sendMail({
            from:'singhamankr17@gmail.com',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        
        return info
    } catch (error) {
         await prisma.otp.deleteMany({
            where:{
                email:email
            }
        })
       throw new Error('Fail to send mail')

    }
}

