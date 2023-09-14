import PostIem from "./PostItem";
import usePosts from "@/hooks/usePosts";

interface PostFeedProps {
	userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
	const { data: posts = [] } = usePosts(userId);
	return (
		<>
			{posts.map((post: Record<string, any>) => (
				<PostIem userId={userId} key={post.id} data={post} />
			))}
		</>
	);
};

export default PostFeed;
