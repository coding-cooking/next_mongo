import connectDb from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/src/models/Post";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
	try {
		await connectDb();

		const posts = await Post.findById(id);
		
		return new NextResponse(JSON.stringify(posts), { status: 200 });
	} catch (error) {
		return new NextResponse("Database Error!", { status: 500 });
	}
};

export const DELETE = async (request: NextRequest, { params }:{ params: { id: string } }) => {
	const { id } = params;
	try {
		await connectDb();

		await Post.findByIdAndDelete(id);

		return new NextResponse('Post has been deleted', { status: 200 });
	} catch (error) {
		return new NextResponse("Database Error!", { status: 500 });
	}
};
