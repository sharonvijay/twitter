import Avatar from "@/components/Avater";
import EditForm from "@/components/EditForm";
import Header from "@/components/Header";
// import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const EditPostPage = () => {
	const router = useRouter();
	const { postId } = router.query;

	console.log(`Edit route error ${postId}`);

	const { data: fetchedPost, isLoading } = usePost(postId as string);
	// const { data: currentUser } = useCurrentUser();

	if (isLoading || !fetchedPost) {
		return (
			<div className="flex justify-center items-center h-full">
				<ClipLoader color="lightblue" size={80} />
			</div>
		);
	}
	return (
		<>
			<Header showBackArrow label="Edit Tweet" />
			{/* <Avatar userId={currentUser.id} /> */}
			<EditForm data={fetchedPost} postId={postId as string} />
		</>
	);
};

export default EditPostPage;
