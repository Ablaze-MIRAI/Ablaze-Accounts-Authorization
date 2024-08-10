import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const CanaryAlert = () =>{
  return (
    <Alert variant="destructive">
        <AlertTitle>
          <span className="text-2xl mr-1"><i className="ri-alert-line"></i></span>
          これはBETA(ベータ)版です
        </AlertTitle>
        <AlertDescription>
          不具合などはDiscordやフォーラムでお知らせください。
        </AlertDescription>
      </Alert>
  );
};
