import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";
import { getDbUserId } from "@/actions/user.action";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const user = await getProfileByUsername(username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

export default async function ProfilePageServer({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const user = await getProfileByUsername(username);
  const authUserDbId = await getDbUserId();

  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      authUserDbId={authUserDbId}
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}
