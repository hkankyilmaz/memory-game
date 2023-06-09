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
  const [getUserWithToken, { isLoading, data }] = useGetUserWithTokenMutation();
  const userName = useAppSelector((state) => state.user.name);
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // const token = getCookies();
    // if (typeof token.token === "string" && userName === "Quest") {
    //   dispatch(setPlayerOneName(userName));
    //   console.log(token.token);
    //   getUserWithToken(token.token)
    //     .unwrap()
    //     .then((res) => {
    //       console.log(res);
    //       dispatch(
    //         whoIsUser({
    //           email: res.email,
    //           name: res.name,
    //         })
    //       );
    //     })
    //     .catch((err) => console.log(err));
    // }
  }, []);

  console.log(state);
  return (
    <div className={styles.container}>
      <h1 className={styles.titleh1}>
        {state.user.name}, Welcome To Memory Game
      </h1>
      <Chat />
      <Game />
      <GameDetail />
    </div>
  );
}

export default Home;
