import { toast } from "react-toastify";

export const ShowSuccessToast = (message) => {
    
  toast.success(message, {
    position: "top-right",
    autoClose: 150,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  
};

export const ShowErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

