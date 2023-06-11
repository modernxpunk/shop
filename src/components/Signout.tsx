"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Icon from "./Icon";

const SignOut = () => {
	return (
		<Link href="#" onClick={() => signOut()}>
			<Icon name="logout" className="w-4 h-4 fill-current" />
			Logout
		</Link>
	);
};

export default SignOut;
