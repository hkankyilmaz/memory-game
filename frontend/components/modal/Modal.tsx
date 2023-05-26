import React, { useEffect } from "react";

import "./index.module.scss";
import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/button/Button";

import { useAppSelector, useAppDispatch } from "@/src/app/store/hooks";
import { setModal } from "@/src/app/store/features/modal/modalSlice";

import "react-toastify/dist/ReactToastify.css";

interface IModal {
  text?: string;
}

const Modal: React.FC<IModal> = (props) => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.game.playerOne.name !== "" && state.game.playerTwo.name !== "") {
      setTimeout(() => {
        dispatch(setModal(false));
      }, 25000);
    }
  }, [dispatch, state.game.playerOne.name, state.game.playerTwo.name]);

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
          <p>
            Serching Player, Please Wait ...!{" "}
            <FontAwesomeIcon
              spin
              style={{ color: "white", marginLeft: ".5rem" }}
              icon={faRotate}
              size="lg"
            />
          </p>
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
