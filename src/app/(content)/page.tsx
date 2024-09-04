// React/Next
import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

// Library
import { getSession } from "@/library/session";

export default async function ContentRootPage(){
  const user = await getSession(false);

  return (
    <>
      <section className="h-[100svh] flex justify-center items-center sm:justify-around flex-col sm:flex-row">
        <div className="flex flex-col items-center sm:block">
          <h1 className="font-bold text-slate-800 text-5xl sm:text-6xl leading-relaxed sm:leading-relaxed">
            すべての<br/>
            <span className="text-[#FFA800] font-extrabold">Ablazeアプリ</span>を<br/>
            これ<span className="text-[#DB00FF] font-extrabold">ひとつ</span>で
          </h1>
          <div className="w-full max-sm:px-5 mt-8">
            {user?(
              <>
                <Button variant="secondary" className="w-full h-12 max-sm:hidden">
                  <Link href="/dashboard" className="font-bold text-md">アカウントダッシュボードを開く</Link>
                </Button>
                <Button variant="default" className="w-full h-12 sm:hidden">
                  <Link href="/dashboard" className="font-bold text-md ">アカウントダッシュボードを開く</Link>
                </Button>
              </>
            ):(
              <>
                <Button variant="secondary" className="w-full h-12 max-sm:hidden">
                  <Link href="/signup" className="font-bold text-md">Ablaze Accountsを作成する</Link>
                </Button>
                <Button variant="default" className="w-full h-12 sm:hidden">
                  <Link href="/signup" className="font-bold text-md">Ablaze Accountsを作成する</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        <div>{/* Introduce content */}</div>
      </section>
      <section className="min-h-[50svh] mt-24">
        <div className="w-3/4 mx-auto">
          <h1 className="text-2xl font-bold text-center mb-5">Ablaze Accountsとは</h1>
          <p className="text-center">
            Ablaze AccountsはAblazeアプリで共通使用できるアカウントサービスです。<br/>
            サービスの利用やデータの連携・同期を簡単に行うことができます。
          </p>
        </div>
      </section>
    </>
  );
}
