"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { axiosInstance } from "@/lib/axiosInstance";

export const useRelationship = () => {
  const { auth } = useAuth();
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const check = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/users${auth.name}/is_user_followed`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const follow = useCallback(async () => {
    setLoading(true);
    try {
      await axiosInstance.post(`/users/${auth.name}/relationship`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const unfollow = useCallback(async () => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/users/${auth.name}/relationship`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    check();
  }, [auth, check]);

  return { isFollowed, loading, follow, unfollow };
};
