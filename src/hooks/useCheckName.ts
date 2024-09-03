"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { useCallback, useState } from "react";

export const useCheckName = () => {
  const [isUnique, setIsUnique] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const checkName = useCallback(
    async (name: string) => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/users/check_name`, {
          params: { name: name },
        });
        setIsUnique(res.data.is_unique);
        console.log(isUnique);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [setIsUnique]
  );

  return { isUnique, loading, checkName };
};
