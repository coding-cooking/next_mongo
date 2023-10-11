
import  connectDb from "@/utils/db";
import { NextResponse } from "next/server";
import Post from "@/models/Post";

export const GET = async (request) => {
    try{
        await connectDb();
        const posts = await Post.find();
        
        return new NextResponse(JSON.stringify(posts), { status: 200 });

    } catch(error) {
        return new NextResponse("Database Error!", { status: 500 });
    }
    
}