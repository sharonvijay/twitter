// components/EditForm.tsx
import { useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useEdit from "@/hooks/useEdit";
import useCurrentUser from "@/hooks/useCurrentUser";
import { formatDistanceToNowStrict } from "date-fns";
import Button from "./Button";

interface EditFormProps {
	postId: string;
	data: Record<string, any>;
}

const EditForm: React.FC<EditFormProps> = ({ postId, data }) => {
	const router = useRouter();
	const [body, setBody] = useState(data.body);
	const [loading, setLoading] = useState(false);

	const { data: currentUser } = useCurrentUser();

	const { hasEdited, toggleEdit } = useEdit({ postId });

	const createdAt = useMemo(() => {
		if (!data?.createdAt) {
			return null;
		}

		return formatDistanceToNowStrict(new Date(data.createdAt));
	}, [data.createdAt]);

	const handleSubmit = async () => {
		setLoading(true);

		try {
			if (hasEdited) {
				await toggleEdit(body);
				setLoading(false);

				router.push(`/posts/${postId}`);
			} else {
				console.error(
					"Cannot edit a post that does not belong to the current user."
				);
				setLoading(false);
			}
		} catch (error) {
			console.error("Error editing post:", error);
			setLoading(false);
		}
	};

	return (
		<div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
			<div className="flex flex-row items-center gap-2">
				<p className="text-neutral-500 cursor-pointer hover:underline font-semibold">
					{currentUser.name}
				</p>
				<span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
					@{currentUser.username}
				</span>
				<span className="text-neutral-500 text-sm">{createdAt}</span>
			</div>
			{/* <div className="text-white mt-1">{data.body}</div> */}
			<div className="mt-4 w-full">
				<textarea
					value={body}
					onChange={(e) => setBody(e.target.value)}
					placeholder="Edit your tweet..."
					className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
				/>
				<hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
				<div>
					<Button
						onClick={handleSubmit}
						disabled={loading}
						label="Edit Tweet"
					/>
				</div>
			</div>
		</div>
	);
};

export default EditForm;
