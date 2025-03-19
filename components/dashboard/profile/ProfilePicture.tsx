// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import React, { ChangeEvent, useRef, useState } from "react";
// import { AdminUser, StudentUser } from "@/app/action";
// import { UseFormRegister, UseFormGetValues } from "react-hook-form";
// import { CldUploadWidget   } from "next-cloudinary";

// type updateUserDataField = AdminUser | StudentUser;

// type Data = {
//   user: AdminUser | StudentUser;
//   register: UseFormRegister<updateUserDataField>;
//   getValues: UseFormGetValues<updateUserDataField>;
//   updateUserDetails: (data: updateUserDataField) => Promise<void>;
//   editProfile: boolean;
//   setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const ProfilePicture = ({
//   user,
//   register,
//   getValues,
//   updateUserDetails,
//   editProfile,
//   setEditProfile,
// }: Data) => {
//   if (!user || !Object.keys(user).length) return;

//   const inputRef = useRef<HTMLInputElement>(null);

//   const [profilePic, setProfilePic] = useState<string | null>(
//     user.profile.profilePicture || null
//   );

//   const handleUploadSuccess = (result: any) => {
//     if (result.event === "success") {
//       setProfilePic(result.info.secure_url);
//     }
//   };

//   const handleUserSelectProfile = (e: ChangeEvent<HTMLInputElement>) => {
//     const target = e.target;

//     if (target.files && target.files.length > 0) {
//       const file = target.files[0];
//       const imageUrl = URL.createObjectURL(file); 
//       setProfilePic(imageUrl);
//       console.log("Selected file:", file);
//     }

//   };

//   return (
//     <Card className="w-fit">
//       <CardHeader>
//         <CardTitle>Your Profile</CardTitle>
//         <CardDescription>
//           View and update your profile information.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="flex flex-col items-center space-y-4">
//         <Avatar className="h-24 w-24">
//           <AvatarImage
//             src={profilePic || user.profile.profilePicture}
//             alt="Profile"
//             className="object-cover h-full w-full"
//           />
//           <AvatarFallback className="uppercase">
//             {user?.firstName[0]}
//             {user?.lastName[0]}
//           </AvatarFallback>
//         </Avatar>


//         <div className="text-center">
//           <h3 className="text-lg font-medium capitalize">
//             {user.firstName} {user.lastName}
//           </h3>
//           <p className="text-sm text-muted-foreground">{user?.email}</p>
//         </div>

//         {user.role === "Student" && (
//           <div className="w-full space-y-2">
//             <Label htmlFor="studentId">Student ID</Label>
//             <Input
//               id="studentId"
//               type="text"
//               defaultValue={user.studentId}
//               disabled={!editProfile}
//               {...register("studentId")}
//               placeholder="Enter your student ID"
//             />
//           </div>
//         )}

//         {user.role !== "Student" && (
//           <div className="w-full space-y-2">
//             <Label htmlFor="staffId">Staff ID</Label>
//             <Input
//               id="staffId"
//               type="text"
//               defaultValue={user.staffId}
//               disabled={!editProfile}
//               {...register("staffId")}
//               placeholder="Enter your staff ID"
//             />
//           </div>
//         )}


//         <CldUploadWidget
//           uploadPreset="hostelHeaven_images"
//           onSuccess={handleUploadSuccess}
//         >
//           {({ open }) => (
//             <Button
//               variant="outline"
//               disabled={editProfile}
//               className="w-full"
//               onClick={() => open()}
//             >
//               Change Avatar
//             </Button>
//           )}
//         </CldUploadWidget>


//         <input
//           type="file"
//           name="profilePic"
//           id="profilePic"
//           className="hidden"
//           ref={inputRef}
//           accept="image/*"
//           onChange={handleUserSelectProfile}
//         />

//         <Button
//           variant="outline"
//           disabled={editProfile}
//           className="w-full"
//           onClick={() => inputRef.current?.click()}
//         >
//           Change Avatar
//         </Button>

//         <div className="flex gap-4 w-full">
//           <Button
//             variant="outline"
//             className="w-full"
//             type="button"
//             disabled={editProfile}
//             onClick={() => setEditProfile(true)}
//           >
//             Edit Profile
//           </Button>

//           <Button
//             variant={editProfile ? "default" : "secondary"}
//             className="w-full"
//             disabled={!editProfile}
//             onClick={() => updateUserDetails(getValues())}
//           >
//             Save Changes
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProfilePicture;






"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { ChangeEvent, useRef, useState } from "react";
import { AdminUser, StudentUser } from "@/app/action";
import { UseFormRegister, UseFormGetValues } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

type updateUserDataField = AdminUser | StudentUser;

type Data = {
  user: AdminUser | StudentUser;
  register: UseFormRegister<updateUserDataField>;
  getValues: UseFormGetValues<updateUserDataField>;
  updateUserDetails: (data: updateUserDataField) => Promise<void>;
  editProfile: boolean;
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfilePicture = ({
  user,
  register,
  getValues,
  updateUserDetails,
  editProfile,
  setEditProfile,
}: Data) => {

  if (!user || !Object.keys(user).length) return;

  const inputRef = useRef<HTMLInputElement>(null);
  const [profilePic, setProfilePic] = useState(user.profile.profilePicture);

  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    toast.dismiss();
    
    const file = e.target.files?.[0];
    if (!file) return;

    setEditProfile(true)
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hostelHeaven_images"); 

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/mohitjangid/image/upload`, 
        formData );

        const { data } = response

      if (data.secure_url) {
        setProfilePic(data.secure_url); 
      }

      console.log(data)

    } catch (error) {

      console.error("Upload error:", error);
      toast.error("uploading profile failed.");
      
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>
          View and update your profile information.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profilePic} alt="Profile" className="object-cover h-full w-full"/>
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
          <div className="w-full space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              type="text"
              defaultValue={user.studentId}
              disabled={!editProfile}
              {...register("studentId")}
              placeholder="Enter your student ID"
            />
          </div>
        )}

        {user.role !== "Student" && (
          <div className="w-full space-y-2">
            <Label htmlFor="staffId">Staff ID</Label>
            <Input
              id="staffId"
              type="text"
              defaultValue={user.staffId}
              disabled={!editProfile}
              {...register("staffId")}
              placeholder="Enter your staff ID"
            />
          </div>
        )}

        <input
          type="file"
          name="profilePic"
          id="profilePic"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
          accept="image/*"
        />

        <Button
          variant="outline"
          disabled={editProfile || uploading}
          className="w-full"
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading..." : "Change Avatar"}
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
            onClick={() => {
              const currentData = getValues();
              currentData.profile.profilePicture = profilePic ;

              updateUserDetails(currentData);
            }
            }
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePicture;
