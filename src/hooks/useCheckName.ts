"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { useCallback, useState } from "react";

export const useCheckName = () => {
  const [isUnique, setIsUnique] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const checkName = useCallback(async (name: string) => {
    setLoading(true);
    try {
      const res = axiosInstance.get(`/users/check_name/${name}`);
    } catch (error) {
    } finally {
    }
  }, []);

  return { isUnique, loading, checkName };
};
