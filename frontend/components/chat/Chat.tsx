import React from "react";
import { RiSendPlane2Fill } from "react-icons/ri";

import styles from "./styles/index.module.scss";
import "./styles/index.module.scss";

import { useAppSelector, useAppDispatch } from "@/src/app/store/hooks";
import { setChat } from "@/src/app/store/features/chat/chatSlice";

function Chat() {
  const btnRef = React.useRef();
  const chat = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  console.log(chat);

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.content}>
          {chat.map((item, idx) => (
            <span
              key={idx}
              className={item.fromMe ? styles.rightText : styles.leftText}
            >
              {item.text}
            </span>
          ))}
        </div>
        <form onSubmit={handleSubmit} className={styles.inputContainer}>
          <input type="text" />
          <button type="submit">
            <RiSendPlane2Fill className={styles.sendIcon} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
