import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/library/session";
import AblazeLogoBlack from "@/assets/logo/black.svg";

export default async function ContentLayout({ children }: Readonly<{ children: ReactNode }>){
  const user = await getSession(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-30 w-full h-16 px-4 sm:px-16 flex justify-between items-center bg-white drop-shadow-md">
        <Link href="/">
          <div className="h-1/2">
            <Image className="h-full" alt="Ablaze Logo" src={AblazeLogoBlack}/>
          </div>
        </Link>
        <div>
          {user?(
            <Button variant="outline" asChild>
              <Link href="/dashboard" className="font-bold">ダッシュボードを開く</Link>
            </Button>
          ):(
            <>
              <Button variant="outline" asChild>
                <Link href="/signin" className="font-bold">ログインする</Link>
              </Button>
              <Button variant="default" className="hidden sm:inline-flex sm:ml-2" asChild>
                <Link href="/signup" className="font-bold">Ablaze Accountsを作成する</Link>
              </Button>
            </>
          )}
        </div>
      </header>
      <main className="min-h-screen">
        {children}
      </main>
      <footer className="flex flex-col bg-slate-50 py-10">
        <div className="flex flex-col lg:flex-row justify-center">
          <div className="h-1/2 max-lg:mx-auto lg:mx-10 mb-5 lg:mb-0">
            <Image className="" alt="Ablaze Logo" src={AblazeLogoBlack}/>
          </div>
          <div className="ml-10 lg:mr-10 max-lg:mt-5 flex flex-col">
            <h3 className="text-slate-600 font-bold">About</h3>
            <Button variant="link" className="justify-start">
              <Link href="">Ablaze Website</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="">Ablaze Support</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="">Ablaze Docs</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="">Ablaze Status</Link>
            </Button>
          </div>
          <div className="ml-10 lg:mr-10 max-lg:mt-5 flex flex-col">
            <h3 className="text-slate-600 font-bold">Services</h3>
            <Button variant="link" className="justify-start">
              <Link href="">Floorp Web Browser</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="">Twitter UI Customizer</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="">Mikanski (Misskey hosted by Ablaze)</Link>
            </Button>
          </div>
          <div className="ml-10 lg:mr-10 max-lg:mt-5 flex flex-col">
            <h3 className="text-slate-600 font-bold">Media</h3>
            <Button variant="link" className="justify-start">
              <Link href="">GitHub</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="">X (Twitter)</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="">Misskey</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="">Discord Public Server</Link>
            </Button>
          </div>
        </div>
        <div className="text-center pt-10">
          <small className="text-slate-600 font-semibold">&copy; 2024 Ablaze, Created by <a href="https://github.com/code-raisan">Raisan</a>.</small>
        </div>
      </footer>
    </>
  );
}
