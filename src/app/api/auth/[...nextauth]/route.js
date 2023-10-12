import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials"
import connectDb from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialProvider({
			id: "credentials",
			name: "Credentials",
			async authorize(credentials){
				await connectDb();
				try{
					const user = await User.findOne({email: credentials.email});
					if(user) {
						//check password
						const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

						if(isPasswordCorrect){
							return user;
						} else {
							throw new Error("Wrong Credentials!");
						}
					} else {
						throw new Error("User not found!")
					}

				}catch(err){
					throw new Error(err)
				}
			}
		}),
	],
	pages: {
		error:"/dashboard/login"
	}
});
export {handler as GET, handler as POST}
