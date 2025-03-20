import { passwordRegex } from "@/common/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const { register, handleSubmit, reset, watch, getValues } = useForm();

  const [newPassword, setNewPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const updateUserPassword = async(data: any) => {
    toast.dismiss();
    const id = toast.loading("Updating password")
    const currentData = getValues();


    if(!currentData.newPassword || !currentData.confirmPassword){
        toast.error("password can't be empty.",{id:id});
        return;   
    }

    if(currentData.newPassword !== currentData.confirmPassword){
        toast.error("Confirm password mismatch",{id:id});
        return;
    }
    
    console.log(passwordRegex.test(currentData.newPassword) )
    
    if(!passwordRegex.test(currentData.newPassword) ){
        toast.error("Password isn't valid",{id:id});
        return;
    }
    try {
      
    const updatePass = await axios.put('/api/auth/updatePassword',{newPassword:currentData.newPassword})
    console.log(updatePass)

    if(updatePass.data.success){
      toast.success(updatePass.data.message,{id:id})
    }

    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message,{id:id})

      }else{
        toast.error("Something went wrong",{id:id})
      }
    }finally{
      setNewPassword(false)
      reset()
    }

  };

  const cancelHandler = () => {
    setNewPassword(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(updateUserPassword)} className="space-y-4">
    {/* <ul className="list-disc pl-5 space-y-2 text-gray-700">
  <li className="text-green-600 font-semibold">Password must be at least 8 characters long</li>
  <li className="text-blue-600">Must contain at least one uppercase letter (A-Z)</li>
  <li className="text-purple-600">Must contain at least one lowercase letter (a-z)</li>
  <li className="text-red-600">Must contain at least one number (0-9)</li>
  <li className="text-yellow-600">Must contain at least one special character (!@#$%^&*)</li>
</ul> */}
      <div className="space-y-6">
        <div className="space-y-2 max-w-[400px] relative">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            {...register("newPassword")}
            disabled={!newPassword}
          />
          {watch("newPassword") && (
            <div
              className="absolute top-1/2 -translate-y-1/5 right-3"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              { showNewPassword ? (
                <Eye className="h-4" />
              ) : (
                <EyeOff className="h-4" />
              )}
            </div>
          )}
        </div>

        <div className="space-y-2 max-w-[400px] relative">
          <Label htmlFor="confPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type={showConfirmPass ? "text" : "password"}
            placeholder="Re-enter new password"
            {...register("confirmPassword")}
            disabled={!newPassword}
          />
          {watch("confirmPassword") && (
            <div
              className="absolute top-1/2 -translate-y-1/5 right-3"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? (
                <Eye className="h-4" />
              ) : (
                <EyeOff className="h-4" />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="h-[2px] w-full bg-primary/10"></div>

      <div className="flex flex-wrap gap-4 w-fit ml-auto mt-10">
        <Button
          variant="outline"
          className={`w-full ${newPassword && "hidden"}`}
          type="button"
          disabled={newPassword}
          onClick={() => {
            setNewPassword(true);
          }}
        >
          Change Password
        </Button>

        <Button
          variant="outline"
          className={`w-full ${!newPassword && "hidden"}`}
          type="button"
          onClick={() => cancelHandler()}
        >
          Cancel Edit
        </Button>

        <Button
          disabled={!newPassword}
          variant={!newPassword ? "secondary" : "default"}
          type="submit"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default UpdatePassword;
