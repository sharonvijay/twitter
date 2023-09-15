import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			const { postId } = req.query;

			if (!postId || typeof postId !== "string") {
				throw new Error("Invalid ID");
			}

			const post = await prisma.post.findUnique({
				where: { id: postId },
				include: {
					user: true,
					comments: {
						include: {
							user: true,
						},
						orderBy: {
							createdAt: "desc",
						},
					},
				},
			});

			return res.status(200).json(post);
		} catch (error) {
			console.log(error);
			return res.status(400).end();
		}
	} else if (req.method === "PUT") {
		try {
			const { postId } = req.query;

			if (!postId || typeof postId !== "string") {
				throw new Error("Invalid ID");
			}
			const { updatedPostData } = req.body;

			if (!updatedPostData || typeof updatedPostData !== "string") {
				throw new Error("Invalid post content");
			}

			const updatedPost = await prisma.post.update({
				where: { id: postId },
				data: { body: updatedPostData },
			});
			return res.status(200).json(updatedPost);
		} catch (error) {
			console.log(error);
			return res.status(400).end();
		}
	} else if (req.method === "DELETE") {
		try {
			const { postId } = req.query;

			if (!postId || typeof postId !== "string") {
				throw new Error("Invalid ID");
			}

			await prisma.post.delete({ where: { id: postId } });

			return res.status(204).end();
		} catch (error) {
			console.log(error);
			return res.status(400).end();
		}
	} else {
		console.log("Invalid Method");
		return res.status(405).end();
	}
}
