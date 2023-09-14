import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import useCurrentUser from "./useCurrentUser";

const useFollowPosts = () => {
  const { data:currentUser } = useCurrentUser();
  
  // Construct an array of user IDs to include the current user and their followed users
  const userIds = [currentUser?.id, ...currentUser?.followingIds];

  // Construct the URL to fetch posts from the specified user IDs
  const url = `/api/posts?userIds=${userIds.join(',')}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { data, error, isLoading, mutate };
}
 
export default useFollowPosts;