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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  AdminUser,
  SendVerifyEmail,
  StudentUser,
  UserData,
} from "@/app/action";
import { useState } from "react";
import { removeNullValues } from "@/hooks/removeNullValues";
import ProfilePicture from "./ProfilePicture";
import Verify from "../Verify";
import { Check } from "lucide-react";
import UpdatePassword from "./UpdatePassword";

type updateUserDataField = AdminUser | StudentUser;

interface data {
  user: UserData;
  onUpdateProfile: (data: updateUserDataField) => Promise<any>;
}

const Profile = ({ user, onUpdateProfile }: data) => {
  if (!user || !Object.keys(user).length) return;

  if (typeof user === "string") {
    toast.dismiss();
    toast.error(user);
    return;
  }

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editAccountSetting, setAccountSetting] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [modal, setModal] = useState<boolean>(false);
  const [verifyEmail, setVerifyEmail] = useState<string>(currentUser.email);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    resetField,
    watch,
    reset,
    getValues,
  } = useForm<updateUserDataField>({
    defaultValues: currentUser,
  });

  const updateUserDetails = async (data: updateUserDataField) => {
    toast.dismiss();
    const toastId = toast.loading("saving...");

    setAccountSetting(false);
    setEditProfile(false);

    const currentChanges = getValues();

    if (JSON.stringify(currentChanges) === JSON.stringify(currentUser)) {
      toast.dismiss(toastId);
      toast.error("No changes detected.");
      return;
    }

    try {
      const updateData = removeNullValues(data);
      updateData.profile = removeNullValues(data.profile);

      const result = await onUpdateProfile(updateData);

      console.log(result);

      if (typeof result === "string") {
        toast.error(result, { id: toastId });
        reset();
        return;
      }

      toast.success("Profile updated successfully!", { id: toastId });
      setAccountSetting(false);
      setCurrentUser(result);
    } catch (error) {
      toast.error("Something went wrong...", { id: toastId });
      console.log(error);
      reset();
    }
  };


  const handleChange = (name: string, value: string) => {
    if (name === "courseName" && value !== "other") {
      setValue(name, value);
      resetField("otherCourseName");
    } else if (name === "courseName") {
      setValue(name, value);
    }
  };

  const cancelHandler = () => {
    setAccountSetting(false);
    reset();
  };

  const verifyHandler = async () => {
    toast.dismiss();
    const toastId = toast.loading("sending otp...");

    const { email } = getValues();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      toast.error("invalid email", { id: toastId });
      return;
    }

    setVerifyEmail(email);
    try {
      const sendOtp = await SendVerifyEmail(email);

      if (typeof sendOtp === "string") {
        toast.error(sendOtp, { id: toastId });
        return;
      }

      if (sendOtp.message) {
        toast.success(sendOtp.message, { id: toastId });
        setModal(true);
        return;
      }
    } catch (error) {
      const errMsg = (error as Error).message || "Something went wrong.";
      toast.error(errMsg);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <ProfilePicture
        user={currentUser}
        getValues={getValues}
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        register={register}
        updateUserDetails={updateUserDetails}
      />

      <Card className="flex-1 bg-primary-foreground/25 max-w-[800px]">
        <CardHeader className="px-4">
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Update your account information and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Tabs defaultValue="general">
            <TabsList className="mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              {/* <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <form
                onSubmit={handleSubmit(updateUserDetails)}
                className="space-y-6"
              >
                <div className="grid gap-4 md:grid-cols-2 max-w-[480px]">
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

                  {currentUser.role === "Student" && (
                    <div className=" w-full space-y-2">
                      <Label htmlFor="roomNo">Room No.</Label>
                      <Input
                        id="roomNo"
                        type="text"
                        disabled={!editAccountSetting}
                        defaultValue={currentUser.profile.roomNo}
                        {...register("profile.roomNo")}
                        placeholder="Enter your room number"
                      />
                    </div>
                  )}

                  {currentUser.role !== "Student" && (
                    <div className=" w-full space-y-2">
                      <Label htmlFor="roomNo">Department</Label>
                      <Input
                        id="department"
                        type="text"
                        disabled={!editAccountSetting}
                        defaultValue={currentUser.department}
                        {...register("department")}
                        placeholder="Enter your department"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="contact">Phone</Label>
                    <Input
                      id="contact"
                      type="tel"
                      defaultValue={currentUser.profile.contact}
                      placeholder="Enter mobile number"
                      {...register("profile.contact")}
                      disabled={!editAccountSetting}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2 relative flex flex-col">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={currentUser.email}
                      placeholder="Enter email"
                      className="pr-9"
                      {...register("email")}
                      disabled={!editAccountSetting}
                    />
                    {
                      watch("email") === verifyEmail && 
                    <Check className="text-green-500 absolute top-6 right-1 h-5"/>
                    }

                    {watch("email") && ( watch("email") !== verifyEmail )  && (
                      <Button
                        type="button"
                        onClick={() => verifyHandler()}
                        variant="secondary"
                        className="inline-block ml-auto"
                      >
                        Verify Email
                      </Button>
                    )}

                    {errors.email && (
                      <p className="text-xs text-red-500">Email is not valid</p>
                    )}
                  </div>

                  {currentUser.role === "Student" && (
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="courseName">Course/Program</Label>

                      <Select
                        value={watch("courseName")}
                        onValueChange={(value) => {
                          handleChange("courseName", value);
                          // setSelectedCourse(value);
                        }}
                        disabled={!editAccountSetting}
                      >
                        <SelectTrigger id="courseName">
                          <SelectValue placeholder={currentUser.courseName} />
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
                          defaultValue={currentUser.otherCourseName}
                          placeholder="Enter departname name"
                          {...register("otherCourseName")}
                          disabled={!editAccountSetting}
                        />
                      )}
                    </div>
                  )}
                </div>

                <div className="h-[1px] w-full bg-primary/10"></div>

                <div className="flex gap-4 max-sm:flex-wrap justify-end mt-10">
                  <Button
                    variant="outline"
                    className={`w-full sm:w-fit ${editAccountSetting && "hidden"}`}
                    type="button"
                    disabled={editAccountSetting}
                    onClick={() => setAccountSetting(true)}
                  >
                    Edit Profile
                  </Button>

                  <Button
                    variant="outline"
                    className={`w-full sm:w-fit ${!editAccountSetting && "hidden"}`}
                    type="button"
                    onClick={() => cancelHandler()}
                  >
                    Cancel Edit
                  </Button>

                  <Button
                    disabled={!editAccountSetting}
                    className="w-full sm:w-fit"
                    variant={!editAccountSetting ? "secondary" : "default"}
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="password" className="space-y-4">
              <UpdatePassword/>
            </TabsContent>

            {/* <TabsContent
              value="notifications"
              className="space-y-4"
            ></TabsContent> */}

          </Tabs>
        </CardContent>
      </Card>

      {modal && (
        <Verify
          email={verifyEmail}
          setEmail={setVerifyEmail}
          modal={modal}
          setModal={setModal}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
};

export default Profile;
