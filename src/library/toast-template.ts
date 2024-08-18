import { toast } from "sonner";

export const UnexpectedErrorToast = (): void =>{
  toast.error("予期しないエラーが発生しました");
};
