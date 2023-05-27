"use client";

import { cx } from "class-variance-authority";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { createComment } from "src/utils/crud/comment";

const CommentTextarea = ({ productId }: { productId: string }) => {
	const [comment, setComment] = useState("");
	const [rate, setRate] = useState(3);

	const commentLimit = 200;

	const handleSubmitComment = async () => {
		const session = await getSession();
		// await createComment(session?.user.id, productId, comment, rate);
	};

	return (
		<div className="form-control">
			{/* <div className="rating">
				{Array(5)
					.fill(0x00)
					.map((_, i) => {
						return (
							<input
								type="radio"
								name="rating-product"
								className="mask mask-star"
								key={"rating-product-" + i}
								checked={rate === i + 1}
								onChange={() => setRate(i + 1)}
							/>
						);
					})}
			</div> */}
			{/* <div className="avatar online">
					<div className="w-10 h-10 rounded-full">
						<Image
							src={account.avatar || ""}
							width={40}
							height={40}
							alt={"avatar"}
						/>
					</div>
				</div> */}
			<div className="relative">
				<textarea
					className={cx(
						"w-full h-32 text-base resize-none textarea textarea-bordered",
						comment.length >= commentLimit ? "textarea-error" : ""
					)}
					placeholder="Add comment..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				></textarea>
				<div className="absolute bottom-0 right-0 flex items-center justify-end px-2 py-3">
					<button
						className={"btn btn-sm"}
						disabled={comment.length >= commentLimit}
						onClick={handleSubmitComment}
					>
						Publish
					</button>
				</div>
			</div>

			<label className="label">
				<span className="label-text-alt">
					<div className="flex flex-1 gap-1 carousel">
						{["Thanks for sharing", "Perfect!"].map((text: string) => {
							return (
								<div
									className={cx(
										"cursor-pointer carousel-item badge hover:shadow-lg",
										text === comment ? "badge-outline" : ""
									)}
									key={text}
									onClick={() => setComment(text)}
								>
									{text}
								</div>
							);
						})}
					</div>
				</span>
				<span
					className={cx(
						"label-text-alt whitespace-nowrap",
						comment.length >= commentLimit ? "text-error" : ""
					)}
				>
					{comment.length} / {commentLimit}
				</span>
			</label>
		</div>
	);
};

export default CommentTextarea;
