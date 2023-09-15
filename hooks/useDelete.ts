import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModal from "./useLoginModal";
// interface Post {
// 	id: string;
// 	body: string;
// 	createdAt: string;
// 	updatedAt: string;
// 	userId: string;
// 	likedIds: string[];
// 	image?: string | null;
// 	user: User;
// 	comments: Comment[];
// }
const useDelete = ({ postId, userId }: { postId: string; userId?: string }) => {
	const { data: currentUser } = useCurrentUser();
	const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
	const { mutate: mutateFetchedPosts } = usePosts(userId);

	const loginModal = useLoginModal();

	const hasDeleted = useMemo(() => {
		return fetchedPost?.userId === currentUser?.id;
	}, [fetchedPost, currentUser]);

	const toggleDelete = useCallback(
		async (postId: string) => {
			if (!currentUser) {
				loginModal.onOpen();
				return;
			}

			try {
				await axios.delete(`/api/posts/${postId}`);

				mutateFetchedPost();
				mutateFetchedPosts();

				toast.success("Post deleted successfully");
			} catch (error) {
				console.log(error);
				toast.error("An error occurred while deleting the post");
			}
		},
		[currentUser, mutateFetchedPosts, mutateFetchedPost, loginModal]
	);

	return { hasDeleted, toggleDelete };
};

export default useDelete;
