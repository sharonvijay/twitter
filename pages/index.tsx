import Form from "@/components/Form";
import Header from "@/components/Header";
import FollowPostsFeed from "@/components/posts/FollowPostsFeed";
export default function Home() {
	return (
		<>
			<Header label="Home" />
			<Form placeholder="What is Happening?!" />
			<FollowPostsFeed />
		</>
	);
}
