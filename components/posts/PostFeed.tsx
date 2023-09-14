import PostIem from "./PostItem";
import useFollowPosts from "@/hooks/useFollowPosts";
interface PostFeedProps {
	userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
	const { data: posts = [] } = useFollowPosts();
	return (
		<>
			{posts.map((post: Record<string, any>) => (
				<PostIem userId={userId} key={post.id} data={post} />
			))}
		</>
	);
};

export default PostFeed;
