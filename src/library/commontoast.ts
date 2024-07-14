import { toast } from "@/components/ui/use-toast";

export const unexpectToast = (error_message: string): void =>{
  toast({
    title: "予期しないエラーが発生しました",
    description: error_message
  });
};
