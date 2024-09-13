import React, { Suspense } from "react";
import { EditProfileModal } from "@/components/EditProfileModal";
import { UserProfilesPage } from "./UserProfilesPage";
import Loading from "../loading";
import { Metadata } from "next";
import { axiosInstance } from "@/lib/axiosInstance";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = params;
  const res = await axiosInstance.get(`/users/${name}`);

  return {
    title: `${res.data.nickname}（@${res.data.name}）さん | たまごかけごはん.com`,
  };
}

const Page: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Suspense fallback={<Loading />}>
        <UserProfilesPage />
        <EditProfileModal />
      </Suspense>
    </div>
  );
};

export default UserProfilesPage;
