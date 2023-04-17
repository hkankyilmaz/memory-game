"use client";

import React from "react";

import styles from "./index.module.scss";
import "./index.module.scss";

import Chat from "@/components/chat/Chat";
import Game from "@/components/game/Game";
import GameDetail from "@/components/gameDetail/GameDetail";

import { useAppSelector } from "@/src/app/store/hooks";

function Home() {
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
