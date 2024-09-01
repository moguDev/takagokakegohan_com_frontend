import { axiosInstance } from "@/lib/axiosInstance";
import { useState, useEffect } from "react";

interface UserDetails {
  name: string;
  nickname: string;
  avatar: string | null;
}

export const useUserDetails = (name: string) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    nickname: "",
    avatar: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = async () => {
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
  };

  useEffect(() => {
    fetchUserDetails();
  }, [name]);

  return { userDetails, loading, error, fetchUserDetails };
};
