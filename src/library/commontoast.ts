import { toast } from "sonner";

export const unexpectToast = (error_message: string): void =>{
  toast("予期しないエラーが発生しました", { description: error_message });
};
