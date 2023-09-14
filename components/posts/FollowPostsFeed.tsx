import PostIem from "./PostItem";
import useFollowPosts from "@/hooks/useFollowPosts";
interface FollowPostsFeedProps {
	userId?: string;
}

const FollowPostsFeed: React.FC<FollowPostsFeedProps> = ({ userId }) => {
	const { data: posts = [] } = useFollowPosts();

	console.log("posts:", posts);
	return (
		<>
			{posts && posts.length > 0 ? (
				posts.map((post: Record<string, any>) => (
					<PostIem userId={userId} key={post.id} data={post} />
				))
			) : (
				<p>No posts available.</p>
			)}
		</>
	);
};

export default FollowPostsFeed;
