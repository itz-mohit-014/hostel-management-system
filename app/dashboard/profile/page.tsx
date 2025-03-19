"use server";

import { AdminUser, getUser, StudentUser, updateUserProfileData, UserData } from "@/app/action";
import { Suspense } from "react";
import Loading from "../loading";
import Profile from "@/components/dashboard/profile/Profile";


export default async function ProfilePage() {
  const user: UserData = await getUser();

  if (!user || !Object.keys(user).length) return;

  const onUpdateProfile = async (data: AdminUser | StudentUser | String) => {
    console.log(data);
    try {
      const result = await updateUserProfileData(data);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Profile user={user} onUpdateProfile={updateUserProfileData}/>
      </div>
    </Suspense>
  );
}
