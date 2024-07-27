import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const SettingContainer = ({ children, title, description, id }: { children: ReactNode, title: string | ReactNode, description: string | ReactNode, id?: string }) =>{
  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
};

export const SettingContent = ({ children }: { children: ReactNode }) =>{
  return (
    <CardContent>
      {children}
    </CardContent>
  );
};

export const SettingFooter = ({ children }: { children: ReactNode }) =>{
  return (
    <CardFooter>
      {children}
    </CardFooter>
  );
};
