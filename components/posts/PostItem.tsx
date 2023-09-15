import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import {
	AiFillHeart,
	AiOutlineHeart,
	AiOutlineMessage,
	AiOutlineEdit,
	AiOutlineDelete,
} from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";
import useEdit from "@/hooks/useEdit";
import useDelete from "@/hooks/useDelete";

interface PostItemProps {
	data: Record<string, any>;
	userId?: string;
}

const PostIem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const { data: currentUser } = useCurrentUser();
	const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
	const { hasEdited, toggleEdit } = useEdit({ postId: data.id, userId });
	const { hasDeleted, toggleDelete } = useDelete({ postId: data.id, userId });

	const goToUser = useCallback(
		(ev: any) => {
			ev.stopPropagation();
			if (data.user && data.user.id) {
				router.push(`/users/${data.user.id}`);
			}
		},
		[router, data.user]
	);
	const goToPost = useCallback(() => {
		if (data.id) {
			router.push(`/posts/${data.id}`);
		}
	}, [router, data.id]);
	const onLike = useCallback(
		async (ev: any) => {
			ev.stopPropagation();
			if (!currentUser) {
				return loginModal.onOpen();
			}
			toggleLike();
		},
		[loginModal, currentUser, toggleLike]
	);

	const goToEdit = useCallback(() => {
		if (hasEdited) {
			router.push(`/posts/${data.id}/edit`);
		}
	}, [router, data.id, hasEdited]);

	const onDelete = useCallback(async () => {
		if (hasDeleted) {
			toggleDelete(data.id);
		}
	}, [hasDeleted, toggleDelete, data.id]);

	const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
	const createdAt = useMemo(() => {
		if (!data?.createdAt) {
			return null;
		}

		return formatDistanceToNowStrict(new Date(data.createdAt));
	}, [data.createdAt]);
	return (
		<div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
			<div className="flex flex-row items-center gap-2">
				<p
					onClick={goToUser}
					className="text-neutral-500 cursor-pointer hover:underline font-semibold">
					{data.user && data.user.name ? data.user.name : "Unknown User"}
				</p>
				<span
					onClick={goToUser}
					className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
					@{data.user && data.user.username ? `${data.user.username}` : ""}
				</span>
				<span className="text-neutral-500 text-sm">{createdAt}</span>
			</div>
			<div className="text-white mt-1">{data.body}</div>
			<div className="flex flex-row items-center mt-3 gap-10">
				<div
					onClick={goToPost}
					className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
					<AiOutlineMessage size={20} />
					<p>{data.comments?.length || 0}</p>
				</div>
				<div
					onClick={onLike}
					className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
					<LikeIcon color={hasLiked ? "red" : ""} size={20} />
					<p>{data.likedIds.length}</p>
				</div>
				<div
					onClick={goToEdit}
					className="text-neutral-500 hover:text-sky-500 transition">
					<AiOutlineEdit size={20} />
				</div>
				<div
					onClick={onDelete}
					className="text-neutral-500 hover:text-red-500 transition">
					<AiOutlineDelete size={20} />
				</div>
			</div>
		</div>
	);
};

export default PostIem;
