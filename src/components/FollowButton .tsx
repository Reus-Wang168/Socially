"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { getDbUserId, toggleFollow } from "@/actions/user.action";
import { useRouter } from "next/navigation";
import prisma from "@/lib/prisma";

function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentlyFollowing, setIsCurrentlyFollowing] = useState(false);
  const router = useRouter();

  // Check initial follow status
  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const currentUserId = await getDbUserId(); // You'll need to implement this
        if (!currentUserId) return;
        
        const existingFollow = await prisma.follows.findUnique({
          where: {
            followerId_followingId: {
              followerId: currentUserId,
              followingId: userId,
            },
          },
        });
        
        setIsCurrentlyFollowing(!!existingFollow);
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };
    
    checkFollowStatus();
  }, [userId]);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const result = await toggleFollow(userId);
      if (result?.success) {
        setIsCurrentlyFollowing(!isCurrentlyFollowing);
        toast.success(
          isCurrentlyFollowing ? "Unfollowed successfully" : "Followed successfully"
        );
        router.refresh(); // Refresh to update any follower counts
      } else {
        toast.error(result?.error || "Operation failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Follow error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant={isCurrentlyFollowing ? "outline" : "secondary"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-24" // Slightly wider to accommodate "Unfollow"
    >
      {isLoading ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : isCurrentlyFollowing ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </Button>
  );
}

export default FollowButton;