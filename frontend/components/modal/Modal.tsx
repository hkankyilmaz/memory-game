import React from "react";

import "./index.module.scss";
import styles from "./index.module.scss";

import Button from "../ui/button/Button";

import { useAppSelector } from "@/src/app/store/hooks";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IModal {
  text?: string;
}

const Modal: React.FC<IModal> = (props) => {
  const state = useAppSelector((state) => state);

  return (
    <div
      className={`${styles.container} ${
        !state.modal.isOpen ? styles.isOpen : ""
      }`}
    >
      {state.modal.useCase == "Start Game" ? (
        <div className={styles.contentContainer}>
          <p>Who Do you wanna play Game the with ?</p>
          <div className={styles.btnContainer}>
            <Button isActive={true} text="Computer" />
            <Button isActive={true} text="People" />
            <Button isActive={true} text="Cancel" />
          </div>
        </div>
      ) : state.modal.useCase == "People" ? (
        <div className={styles.contentContainer}>
          <p>Serching Player, Please Wait ...!</p>
          <div className={styles.btnContainer}>
            <Button isActive={true} text="Cancel" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Modal;
