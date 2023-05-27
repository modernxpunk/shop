import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "src/utils/db";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/",
		newUser: "/",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "Email..." },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const { email, password, is_register }: any = credentials;
				if (is_register === "true") {
					const newUser = await prisma.user.create({
						data: {
							email: email,
							password: password,
						},
					});
					return newUser;
				} else {
					const user = await prisma.user.findUnique({
						where: {
							email: email,
						},
					});
					if (!user || user.password !== password) {
						return null;
					}
					return user;
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token) {
				const { password, ...user }: any = await prisma.user.findUnique({
					where: {
						id: token.sub,
					},
				});
				session.user = user;
			}
			return session;
		},
	},
};