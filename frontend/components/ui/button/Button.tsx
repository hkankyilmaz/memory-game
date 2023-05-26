import React, { useEffect } from "react";

import "./index.module.scss";
import styles from "./index.module.scss";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/src/app/store/hooks";
import {
  setModal,
  setUseCase,
} from "@/src/app/store/features/modal/modalSlice";
import { joinRoom } from "@/src/app/socketio";

interface Ibutton {
  isActive: boolean;
  text: string;
  backgroundColor?: string;
  hoverColor?: string;
  size?: number;
}

const Button: React.FC<Ibutton> = ({
  text,
  isActive,
  backgroundColor,
  hoverColor,
  size,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  useEffect(() => {
    dispatch(setModal(false));
  }, [dispatch, state.game.playerTwo.name]);

  const handleClick = () => {
    switch (text) {
      case "Start Game":
        /**
         * When click the Start game button first setmodal(true)
         * doesnt work. I dont know this is happen.
         */
        dispatch(setUseCase("Start Game"));
        dispatch(setModal(true));
        console.log(state);
        break;
      case "Pause Game":
        break;
      case "Finish Game":
        break;
      case "Cancel":
        dispatch(setModal(false));
        break;
      case "Computer":
        break;
      case "People":
        if (state.user.name !== "Quest") {
          setTimeout(() => {
            joinRoom({ name: state.user.name, email: state.user.email });
          }, 2000);
          dispatch(setUseCase("People"));
        } else toast.error("Please Login...!");
        break;

      default:
        break;
    }
  };

  return (
    <button
      onClick={() => handleClick()}
      disabled={isActive ? false : true}
      className={`${styles.btn} ${styles.btnNone}`}
    >
      {text}
    </button>
  );
};

export default Button;
