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
import { whoIsUser } from "@/src/app/store/features/user/userSlice";

import { init } from "@/src/app/socketio";

function Home() {
  const [getUserWithToken, { isLoading, data }] = useGetUserWithTokenMutation();
  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const token = getCookies();

    init();
    console.log(token.token);
    if (typeof token.token === "string" && userName === "Quest") {
      console.log(token.token);
      getUserWithToken(token.token)
        .unwrap()
        .then((res) => {
          console.log(res);
          dispatch(
            whoIsUser({
              email: res.email,
              name: res.name,
            })
          );
        })
        .catch((err) => console.log(err));
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
