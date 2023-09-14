import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import useCurrentUser from "./useCurrentUser";
type Post = {
  id: string;
  body: string;
  createdAt: Date; 
  updatedAt: Date; 
  userId: string;
  likedIds: string[];
  image?: string | null;
};
const useFollowPosts = () => {
  const { data: currentUser } = useCurrentUser();

  // Ensure currentUser and followingIds are available before constructing userIds
  const userIds = currentUser?.id
    ? currentUser.followingIds
      ? [currentUser.id, ...currentUser.followingIds]
      : [currentUser.id]
    : [];

  console.log("userIds:", userIds);

  // Construct the URL to fetch posts from the specified user IDs
  const url = `/api/posts?userIds=${userIds.join(",")}`;

  const { data: allPosts, error, isValidating } = useSWR(url, fetcher);

  // Filter the posts based on userIds
  const filteredPosts = allPosts?.filter((post:Post) => userIds.includes(post.userId)) || [];

  console.log("filteredPosts:", filteredPosts);

  return {
    posts: filteredPosts,
    error,
    isLoading: !allPosts && !error,
    isValidating,
  };
};

export default useFollowPosts;
