"use client";

import React from "react";

import styles from "./index.module.scss";
import "./index.module.scss";

import Chat from "@/components/chat/Chat";
import Game from "@/components/game/Game";
import GameDetail from "@/components/gameDetail/GameDetail";

import { getCookies } from "cookies-next";

import { useAppDispatch, useAppSelector } from "@/src/app/store/hooks";
import { useGetUserWithTokenMutation } from "@/src/app/store/features/api/userApiSlice";

function Home() {
  const [getUser, { isLoading, data }] = useGetUserWithTokenMutation();
  React.useEffect(() => {
    const token = getCookies();
    console.log(token);
    if (typeof token === "string") {
      getUser(token);
    }
  }, []);
  const user = useAppSelector((state) => state.user);
  return (
    <div className={styles.container}>
      <h1 className={styles.titleh1}>{user.name}, Welcome To Memory Game</h1>
      <Chat />
      <Game />
      <GameDetail />
    </div>
  );
}

export default Home;
