import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const CanaryAlert = () =>{
  return (
    <Alert variant="destructive">
        <AlertTitle>
          <span className="text-2xl mr-1"><i className="ri-alert-line"></i></span>
          これはCANARY(カナリア)版です
        </AlertTitle>
        <AlertDescription>
          このバージョンでは試験期間を終了し、ベータ版へ移行する際に全データが消去されます
        </AlertDescription>
      </Alert>
  );
};
