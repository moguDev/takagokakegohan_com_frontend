import React, { Suspense } from "react";
import { EditProfileModal } from "@/components/EditProfileModal";
import { UserProfilesPage } from "./UserProfilesPage";
import Loading from "../loading";

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
