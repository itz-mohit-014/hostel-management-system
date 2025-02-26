import { NextRequest, NextResponse } from "next/server"


export  const POST = async (request:NextRequest) => {
    return NextResponse.json({
        message:"Data sent successfully"
    }, {
        status: 200
    })
}