import useCurrentUser from "@/hooks/useCurrentUser";
import PostIem from "./PostItem";
import useFollowPosts from "@/hooks/useFollowPosts";

interface FollowPostsFeedProps {
	userId?: string;
}

const FollowPostsFeed: React.FC<FollowPostsFeedProps> = ({ userId }) => {
	const { posts, isLoading, error } = useFollowPosts();
	const { data: currentUser } = useCurrentUser();
	return (
		<>
			{!currentUser ? (
				<p className="text-white font-bold items-center justify-items-center ml-20 pl-20 mt-3">
					Sign in to Continue
				</p>
			) : isLoading ? (
				<p className="text-white">Loading...</p>
			) : error ? (
				<p className="text-white">Error: {error.message}</p>
			) : posts.length > 0 ? (
				posts.map((post: Record<string, any>) => (
					<PostIem userId={userId} key={post.id} data={post} />
				))
			) : (
				<p className="text-white mt-3">No posts available.</p>
			)}
		</>
	);
};

export default FollowPostsFeed;
