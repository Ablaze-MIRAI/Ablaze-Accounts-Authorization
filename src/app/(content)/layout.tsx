import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/library/session";
import AblazeAccountsFullBlack from "@/assets/logo/black-new-full.svg";
import AblazeAccountsShortBlack from "@/assets/logo/black-new.svg";
import AblazeBlack from "@/assets/logo/black.svg";

export default async function ContentLayout({ children }: Readonly<{ children: ReactNode }>){
  const user = await getSession(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-30 w-full h-16 px-4 sm:px-12 flex justify-between items-center bg-white drop-shadow-md">
        <Link href="/" className="h-full flex items-center">
          <div className="h-3/4">
            <Image className="h-full w-full" alt="Ablaze Logo" src={AblazeAccountsShortBlack}/>
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
          <div className="space-y-4 lg:w-1/2 w-full flex flex-col justify-center">
            <div className="max-lg:mx-auto max-w-64 lg:mx-10 mb-5 lg:mb-0">
              <Image className="h-full w-full" alt="Ablaze Logo" src={AblazeAccountsFullBlack}/>
            </div>
            <div className="max-lg:mx-auto max-w-44 lg:mx-10 mb-5 lg:mb-0">
              <Image className="h-full" alt="Ablaze Logo" src={AblazeBlack}/>
            </div>
          </div>
          <div className="ml-10 lg:mr-10 max-lg:mt-5 flex flex-col">
            <h3 className="text-slate-600 font-bold">About</h3>
            <Button variant="link" className="justify-start">
              <Link href="https://ablaze.one">Ablaze Website</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="https://support.ablaze.one">Ablaze Support</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="https://docs.ablaze.one">Ablaze Docs</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="https://status.ablaze.one">Ablaze Status</Link>
            </Button>
          </div>
          <div className="ml-10 lg:mr-10 max-lg:mt-5 flex flex-col">
            <h3 className="text-slate-600 font-bold">Services</h3>
            <Button variant="link" className="justify-start">
              <Link href="https://floorp.app">Floorp Web Browser</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="https://ablaze.one/projects/tuic">Twitter UI Customizer</Link>
            </Button>
          </div>
          <div className="ml-10 lg:mr-10 max-lg:mt-5 flex flex-col">
            <h3 className="text-slate-600 font-bold">Media</h3>
            <Button variant="link" className="justify-start">
              <Link href="https://github.com/Ablaze-MIRAI">GitHub</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="https://x.com/Ablaze_MIRAI">X (Twitter)</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="https://misskey.io/@ablaze">Misskey (ActivityPub)</Link>
            </Button>
            <Button variant="link" className="justify-start">
              <Link href="https://aka.ablaze.one/discord">Discord Public Server</Link>
            </Button>
          </div>
        </div>
        <div className="text-center pt-10">
          <small className="text-slate-600 font-semibold">&copy; 2024 Ablaze, Created by <a href="https://github.com/code-raisan" className="underline">Raisan</a>.</small>
        </div>
      </footer>
    </>
  );
}
