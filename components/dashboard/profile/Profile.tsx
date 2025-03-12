"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AdminUser, StudentUser, updateUserProfileData, UserData } from "@/app/action";
import { useState } from "react";

interface data {
  user: UserData;
  // onUpdateProfile: (data: UserData) => UserData
  onUpdateProfile?: (data: any) => any | void
}

type updateUserDataField = AdminUser | StudentUser;

const Profile = ({ user, onUpdateProfile }: data) => {
  if (!user || !Object.keys(user).length) return;

  if (typeof user === "string") {
    toast.dismiss();
    toast.error(user);
    return;
  }

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editAccountSetting, setAccountSetting] = useState<boolean>(false);

  const { role, ...userWithRole } = user;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    resetField,
    watch,
    getValues
  } = useForm<updateUserDataField>({
    defaultValues: userWithRole,
  });

  const updateUserDetails = async (data: any) => {
    console.log(data);
    setAccountSetting(false);
    setEditProfile(false);
    return;
    try {
      // const result = await updateUserProfileData(data);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPassword = (data: any) => {
    console.log(data);
  };

  const handleChange = (name: string, value: string) => {
    if (name === "courseName" && value !== "other") {
      setValue(name, value);
      resetField("otherCourseName");
    } else if (name === "courseName") {
      setValue(name, value);
    }
  };

  return (
    <div className="flex flex-col items-start gap-6 md:flex-row">
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            View and update your profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.profile.profilePicture} alt="Profile" />
            <AvatarFallback className="uppercase">
              {user?.firstName[0]}
              {user?.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h3 className="text-lg font-medium capitalize">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>

          {user.role === "Student" && (
            <div className=" w-full space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                type="text"
                defaultValue={user.studentId}
                disabled={!editProfile}
                {...register("studentId")}
                placeholder="Enter your strudent Id"
              />
            </div>
          )}

          <Button variant="outline" disabled={editProfile} className="w-full">
            Change Avatar
          </Button>

          <div className="flex gap-4 w-full">
            <Button
              variant="outline"
              className="w-full"
              type="button"
              disabled={editProfile}
              onClick={() => setEditProfile(true)}
            >
              Edit Profile
            </Button>

            <Button
              variant={editProfile ? "default" : "secondary"}
              className="w-full"
              disabled={!editProfile}
              onClick={() => updateUserDetails(getValues())}
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 max-w-[480px]">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Update your account information and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList className="mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <form
                onSubmit={handleSubmit(updateUserDetails)}
                className="space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      className="capitalize"
                      defaultValue={user.firstName}
                      placeholder="Enter first name"
                      {...register("firstName")}
                      disabled={!editAccountSetting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      className="capitalize"
                      defaultValue={user.lastName}
                      placeholder="Enter last name"
                      {...register("lastName")}
                      disabled={!editAccountSetting}
                    />
                  </div>

                  {user.role === "Student" && (
                    <div className=" w-full space-y-2">
                      <Label htmlFor="roomNo">Room No.</Label>
                      <Input
                        id="roomNo"
                        type="text"
                        disabled={!editAccountSetting}
                        defaultValue={user.profile.roomNo}
                        {...register("profile.roomNo")}
                        placeholder="Enter your room number"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="contact">Phone</Label>
                    <Input
                      id="contact"
                      type="tel"
                      defaultValue={user.profile.contact}
                      placeholder="Enter mobile number"
                      {...register("profile.contact")}
                      disabled={!editAccountSetting}
                    />
                  </div>
                   
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email}
                      placeholder="Enter email"
                      {...register("email")}
                      disabled={!editAccountSetting}
                    />
                  </div>

                  {user.role === "Student" && (
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="course">Course/Program</Label>

                      <Select
                        defaultValue={user.courseName}
                        onValueChange={(value) =>
                          handleChange("courseName", value)
                        }
                        disabled={!editAccountSetting}
                      >
                        <SelectTrigger id="courseName">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cse">Computer Science</SelectItem>
                          <SelectItem value="ece">
                            Electronics Engineering
                          </SelectItem>
                          <SelectItem value="mech">
                            Mechanical Engineering
                          </SelectItem>
                          <SelectItem value="civil">
                            Civil Engineering
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>

                      {watch("courseName") === "other" && (
                        <Input
                          id="other"
                          type="text"
                          defaultValue={user.otherCourseName}
                          placeholder="Enter departname name"
                          {...register("otherCourseName")}
                          disabled={!editAccountSetting}
                        />
                      )}
                    </div>
                  )}

                </div>

                <div className="flex gap-4 w-fit ml-auto mt-10">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setAccountSetting(true)}
                    type="button"
                    disabled={editAccountSetting}
                  >
                    Edit
                  </Button>
                  <Button disabled={!editAccountSetting} variant={"secondary"} type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="password" className="space-y-4">
              <form
                onSubmit={handleSubmit(updateUserPassword)}
                className="space-y-4"
              >
                <div className="space-y-6">
                  <div className="space-y-2 max-w-[400px]">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="passwordd"
                      placeholder="Enter new password"
                      // {...register("newPassword")}
                    />
                  </div>
                  <div className="space-y-2 max-w-[400px]">
                    <Label htmlFor="confPassword">Confirm Password</Label>
                    <Input
                      id="confPassword"
                      type="password"
                      placeholder="Re-enter new password"
                      // {...register("lastName")}
                    />
                  </div>
                </div>

                <Button variant={"secondary"} className="mt-10" type="submit">
                  Save Changes
                </Button>
              </form>
            </TabsContent>

            <TabsContent
              value="notifications"
              className="space-y-4"
            ></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
