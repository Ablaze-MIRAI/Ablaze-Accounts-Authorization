"use client";

import { useEffect, useState } from "react";

const konamicommand_key_name = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];
const sayhello_words = [
  "こんにちは",
  "おはようございます",
  "こんばんは",
  "ζ*(・ヮ・)*ζ<こんあくあ～!!",
  "あけましておめでとうございます"
];

export default function SayHelloUser({ username }: { username: string }){
  const [sayhello, setSayhello] = useState(sayhello_words[0]);
  const [lock, setLock] = useState(false);

  useEffect(() =>{
    if(lock) return;

    const month = new Date().getMonth();
    const day = new Date().getDay();
    const hours = new Date().getHours();

    if(18 <= hours || hours <= 3) setSayhello(sayhello_words[2]);
    if(4 <= hours && hours <= 8) setSayhello(sayhello_words[1]);
    if(9 <= hours && hours <= 17) setSayhello(sayhello_words[0]);
    if(month === 1 && day === 1) setSayhello(sayhello_words[4]);

    let c = 0;
    window.onkeydown = (e: KeyboardEvent) =>{
      if(e.code !== konamicommand_key_name[c]) return c = 0;
      if(c !== 9) return c++;
      c = 0;

      setSayhello(sayhello_words[3]);
      setLock(true);

      console.log(
        "%cζ*(・ヮ・)*ζ<こんあくあ～!!",
        "font-size: 2rem; color: pink;"
      );
    };
  }, [sayhello, lock]);

  return (
    <div>
      <h1 className="text-2xl">{sayhello} {username}</h1>
    </div>
  );
};
