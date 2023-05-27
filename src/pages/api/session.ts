import { getServerSession } from "next-auth/next";
import { authOptions } from "src/lib/auth";

export async function handler(req: any, res: any) {
	if (req.method === "GET") {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			res.status(401).json({ message: "You must be logged in." });
			return;
		}

		return res.json({
			message: "Success",
		});
	}
}
