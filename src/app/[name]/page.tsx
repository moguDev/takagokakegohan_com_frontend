import React from "react";
import { EditProfileModal } from "@/components/EditProfileModal";
import { UserProfiles } from "./UserProfiles";

const UserProfilesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pt-20">
      <UserProfiles />
      <EditProfileModal />
    </div>
  );
};

export default UserProfilesPage;
