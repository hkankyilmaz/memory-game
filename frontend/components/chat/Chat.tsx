import React from "react";
import { RiSendPlane2Fill } from "react-icons/ri";

import styles from "./styles/index.module.scss";
import "./styles/index.module.scss";

import { useAppSelector, useAppDispatch } from "@/src/app/store/hooks";
import { setChat } from "@/src/app/store/features/chat/chatSlice";

import { sendMessage } from "@/src/app/socketio";

function Chat() {
  const btnRef = React.useRef();
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [chat_, setChat_] = React.useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setChat({ fromMe: true, text: chat_ }));
    sendMessage({ fromMe: true, text: chat_, room: state.chat.room });
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.content}>
          {state.chat.chat.map((item, idx) => (
            <span
              key={idx}
              className={item.fromMe ? styles.rightText : styles.leftText}
            >
              {item.text}
            </span>
          ))}
        </div>
        <form onSubmit={handleSubmit} className={styles.inputContainer}>
          <input onChange={(e) => setChat_(e.target.value)} type="text" />
          <button type="submit">
            <RiSendPlane2Fill className={styles.sendIcon} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
