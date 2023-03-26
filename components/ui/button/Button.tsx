import React from "react";

import "./index.module.scss";
import styles from "./index.module.scss";

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
  return (
    <button
      disabled={isActive ? false : true}
      className={`${styles.btn} ${styles.btnNone}`}
    >
      {text}{" "}
    </button>
  );
};

export default Button;
