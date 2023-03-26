"use client";

import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import styles from "./index.module.scss";
import "./index.module.scss";

import Chat from "@/components/chat/Chat";
import Game from "@/components/game/Game";
import GameDetail from "@/components/gameDetail/GameDetail";

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titleh1}>Welcome To Memory Game</h1>
      <Chat />
      <Game />
      <GameDetail />
    </div>
  );
}

export default Home;