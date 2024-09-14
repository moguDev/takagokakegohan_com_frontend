"use client";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { UserProfiles } from "@/types";
import { useAuth } from "./useAuth";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/components/Toast";

export const useRelationship = (name: string | number) => {
  const { auth } = useAuth();
  const setToast = useSetRecoilState(toastState);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [followings, setFollowings] = useState<UserProfiles[]>([]);
  const [followers, setFollowers] = useState<UserProfiles[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const checkIsFollowed = useCallback(async () => {
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

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
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
  }, [name, setFollowings, setFollowers]);

  const follow = async () => {
    if (!auth.isAuthenticated) {
      setToast({ message: "ログインしてください", case: "alert" });
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post(`/users/${name}/relationship`);
      checkIsFollowed();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const unfollow = async () => {
    if (!auth.isAuthenticated) {
      setToast({ message: "ログインしてください", case: "alert" });
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.delete(`/users/${name}/relationship`);
      checkIsFollowed();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIsFollowed();
    fetch();
  }, [name, checkIsFollowed, fetch]);

  return {
    isFollowed,
    followings,
    followers,
    loading,
    check: checkIsFollowed,
    follow,
    unfollow,
  };
};
