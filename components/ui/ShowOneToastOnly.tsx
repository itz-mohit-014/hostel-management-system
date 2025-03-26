import toast from "react-hot-toast";

export const showToast = (message: string, type: string) => {
    toast.dismiss()
    

    switch (type) {
        case "success":
          toast.success(message);
          break;
        case "error":
          toast.error(message);
          break;
        default:
          toast(message); // Fallback
      }


  };