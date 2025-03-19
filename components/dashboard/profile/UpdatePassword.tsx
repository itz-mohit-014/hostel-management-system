import { passwordRegex } from "@/common/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const { register, handleSubmit, reset, watch, getValues } = useForm();

  const [newPassword, setNewPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const updateUserPassword = (data: any) => {
    toast.dismiss();
    const currentData = getValues();

    if(!currentData.newPassword || !currentData.confirmPassword){
        toast.error("password can't be empty.");
        return;   
    }

    if(currentData.newPassword !== currentData.confirmPassword){
        toast.error("Confirm password mismatch");
        return;
    }
    
    console.log(passwordRegex.test(currentData.confirmPassword) )
    
    if(
        !passwordRegex.test(currentData.confirmPassword) 
    ){
        toast.error("Confirm password mismatch");
        return;
    }


  };

  const cancelHandler = () => {
    setNewPassword(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(updateUserPassword)} className="space-y-4">
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

      <div className="flex gap-4 w-fit ml-auto mt-10">
        <Button
          variant="outline"
          className={`w-full ${newPassword && "hidden"}`}
          type="button"
          disabled={newPassword}
          onClick={() => {
            setNewPassword(true);
          }}
        >
          Edit Profile
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
