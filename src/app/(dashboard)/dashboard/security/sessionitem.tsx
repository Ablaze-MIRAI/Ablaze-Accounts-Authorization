"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";

type DeviceName = "unknown" | "desktop" | "phone" | "windows" | "android" | "mac";

export const SessionItem = ({ path, time, name, icon }: { path: string, time: Date, name: string, icon: DeviceName }) =>{
  //const [localetime, setLocaletime] = useState(time.toLocaleString());

  //useEffect(() => setLocaletime(time.toLocaleString(window.navigator.language)), [time]);

  const IconByName = {
    "unknown": "ri-device-fill",
    "desktop": "ri-computer-fill",
    "phone": "ri-smartphone-fill",
    "windows": "ri-windows-fill",
    "android": "ri-android-fill",
    "mac": "ri-finder-fill",
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 p-4">
          <div className="text-4xl text-slate-700">
            <i className={IconByName[icon]}></i>
          </div>
          <div>
            <p>{name}</p>
            <p>{time.toLocaleString("ja-JP")}</p>
          </div>
        </div>
        <Link href={path} className="h-full p-4">
          <div className="text-4xl text-gray-300 hover:text-gray-400">
            <i className="ri-arrow-right-wide-line"></i>
          </div>
        </Link>
      </div>
    </Card>
  );
};
