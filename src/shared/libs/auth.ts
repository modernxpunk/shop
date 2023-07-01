import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "src/server/prisma";
import { getUser } from "../../server/fetch";
import { User } from "@prisma/client";

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
			async authorize(credentials) {
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
				const user = await getUser(token.sub as string);
				session.user = {
					id: user.id,
					avatar: user.avatar || null,
					email: user.email,
					username: user.username,
				} as User;
			}
			return session;
		},
	},
};
