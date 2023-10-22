import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials"
import connectDb from "@/src/utils/db";
import User from "@/src/models/User";
import bcrypt from "bcrypt";



const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),

		CredentialProvider({
			name: "credentials",
			// name: "Credentials",
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				await connectDb();
				try {
					const user = await User.findOne({ email: credentials?.email});
					if (user && credentials) {
						//check password
						const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

						if (isPasswordCorrect) {
							return user;
						} else {
							throw new Error("Wrong Credentials!");
						}
					} else {
						throw new Error("User not found!");
					}

				} catch (err: any) {
					throw new Error(err);
				}
			},
			// credentials: {}
		}),
	],
	pages: {
		error:"/dashboard/login"
	}
});
export {handler as GET, handler as POST}
