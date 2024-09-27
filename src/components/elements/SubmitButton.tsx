import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/elements/Loader";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
export function SubmitButton({ children, variant }: { children: ReactNode, variant?: ButtonVariant }){
  const router = useRouter();
  const { pending } = useFormStatus();

  useEffect(() => router.refresh(), [router, pending]);

  return (
    <Button variant={variant} type="submit" disabled={pending}>
      <Loader loading={pending}/>
      {children}
    </Button>
  );
};
