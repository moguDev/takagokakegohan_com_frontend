"use client";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { UserProfiles } from "@/types";

export const useRelationship = (name: string | number) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [followings, setFollowings] = useState<UserProfiles[]>([]);
  const [followers, setFollowers] = useState<UserProfiles[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const check = useCallback(async () => {
    setLoading(true);
    try {
      const resCheck = await axiosInstance.get(
        `/users/${name}/is_user_followed`
      );
      setIsFollowed(resCheck.data.is_followed);
      const resFollowings = await axiosInstance.get(
        `/users/${name}/followings`
      );
      setFollowings(resFollowings.data);
      const resFollowers = await axiosInstance.get(`/users/${name}/followers`);
      setFollowers(resFollowers.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [name, setIsFollowed]);

  const follow = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(`/users/${name}/relationship`);
      check();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const unfollow = async () => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/users/${name}/relationship`);
      check();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    check();
  }, [name, check]);

  return {
    isFollowed,
    followings,
    followers,
    loading,
    check,
    follow,
    unfollow,
  };
};
