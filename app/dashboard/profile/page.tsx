"use server";

import { getUser, updateUserProfileData, UserData } from "@/app/action";
import { Suspense } from "react";
import Loading from "../loading";
import Profile from "@/components/dashboard/profile/Profile";


export default async function ProfilePage() {
  const user: UserData = await getUser();

  console.log(user);

  if (!user || !Object.keys(user).length) return;

  const onUpdateProfile = async (data: any) => {
    console.log(data);
    data.profile.contact = "7894561230";
    data.profile.roomNo = "123456ab";
    try {
      const result = await updateUserProfileData(data);
      console.log(result);
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
        <Profile user={user}/>
      </div>
    </Suspense>
  );
}
