import { axiosInstance } from "@/lib/axiosInstance";
import { UserProfiles } from "@/types";
import { useState, useEffect, useCallback } from "react";

export const useUserProfiles = (name: string) => {
  const [userProfiles, setUserDetails] = useState<UserProfiles>({
    name: "",
    nickname: "",
    avatar: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/users/${name}`);
      setUserDetails({
        ...res.data,
        avatar:
          res.data.avatar.url === null
            ? null
            : `http://localhost:3000${res.data.avatar.url}`,
      });
    } catch (err) {
      setError("ユーザ情報の取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [setUserDetails]);

  useEffect(() => {
    fetch();
  }, [name]);

  return { userProfiles, loading, error };
};
