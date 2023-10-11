import connectDb from "@/utils/db";
import { NextResponse } from "next/server";
import Post from "@/models/Post";

export const GET = async (request, {params}) => {
    const { id } = params;
	try {
		await connectDb();
		const posts = await Post.findById(id);
		console.log("@@@@", posts);
		return new NextResponse(JSON.stringify(posts), { status: 200 });
	} catch (error) {
		console.log("@@@@", error);
		return new NextResponse("Database Error!", { status: 500 });
	}
};
