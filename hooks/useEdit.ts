import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModal from "./useLoginModal";

const useEdit = ({ postId, userId }: { postId: string; userId?: string }) => {
	const { data: currentUser } = useCurrentUser();
	const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
	const { mutate: mutateFetchedPosts } = usePosts(userId);

	const loginModal = useLoginModal();

	const hasEdited = useMemo(() => {
		return fetchedPost?.userId === currentUser?.id;
	}, [fetchedPost, currentUser]);

	const toggleEdit = useCallback(
		async (updatedPostData: string) => {
			try {
				if (!currentUser) {
					loginModal.onOpen();
					return;
				}

				const response = await axios.put(`/api/posts/${postId}`, {
					updatedPostData,
				});

				if (response.status === 200) {
					toast.success("Post edited successfully!");
					mutateFetchedPost(response.data);
					mutateFetchedPosts();
				} else {
					toast.error("Failed to edit the post. Please try again later.");
				}
			} catch (error) {
				console.error("Error editing post:", error);
				toast.error(
					"An error occurred while editing the post. Please try again later."
				);
			}
		},
		[currentUser, loginModal, postId, mutateFetchedPost, mutateFetchedPosts]
	);

	return { hasEdited, toggleEdit };
};

export default useEdit;
