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
import { setRoom } from "@/src/app/store/features/chat/chatSlice";
import {
  setPlayerTwoName,
  setPlayerOneName,
} from "@/src/app/store/features/game/gameSlice";

import { subscribeSeekGame, subscribeRoom, init } from "@/src/app/socketio";
import { setChat } from "@/src/app/store/features/chat/chatSlice";

function Home() {
  const [getUserWithToken, { isLoading, data }] = useGetUserWithTokenMutation();
  const userName = useAppSelector((state) => state.user.name);
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  console.log(state);

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

    subscribeSeekGame(
      (message: {
        text?: string;
        fromMe?: boolean;
        email?: string;
        name?: string;
      }) => {
        console.log(message);
        if (message.email) {
          dispatch(setRoom(message.email));
          console.log(message.email);
          subscribeRoom();
        }

        if (message.name && userName !== message.name && userName !== "Quest") {
          dispatch(setPlayerTwoName(message.name));
        } else {
          dispatch(setPlayerOneName(userName));
        }

        if (message.text && message.fromMe) {
          dispatch(setChat({ text: message.text, fromMe: message.fromMe }));
        }
      }
    );
    console.log(state);
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
