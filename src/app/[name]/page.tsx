import React, { Suspense } from "react";
import { EditProfileModal } from "@/components/EditProfileModal";
import { UserProfiles } from "./UserProfiles";
import Loading from "../loading";

const UserProfilesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Suspense fallback={<Loading />}>
        <UserProfiles />
        <EditProfileModal />
      </Suspense>
    </div>
  );
};

export default UserProfilesPage;
