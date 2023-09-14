import PostIem from "./PostItem";
import useFollowPosts from "@/hooks/useFollowPosts";

interface FollowPostsFeedProps {
	userId?: string;
}

const FollowPostsFeed: React.FC<FollowPostsFeedProps> = ({ userId }) => {
	const { posts, isLoading, error } = useFollowPosts();
	return (
		<>
			{isLoading ? (
				<p className="text-white">Loading...</p>
			) : error ? (
				<p className="text-white">Error: {error.message}</p>
			) : posts.length > 0 ? (
				posts.map((post: Record<string, any>) => (
					<PostIem userId={userId} key={post.id} data={post} />
				))
			) : (
				<p className="text-white">No posts available.</p>
			)}
		</>
	);
};

export default FollowPostsFeed;
