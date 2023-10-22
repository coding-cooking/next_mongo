import connectDb from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import User from "@/src/models/User";

export const POST = async (request: NextRequest) => {
    const { name, email, password } = await request.json();

    await connectDb(); 

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    })

    try{
        await newUser.save();
        return new NextResponse("User has been created", {
					status: 201,
				});

    }catch(err: any) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};