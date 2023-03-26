import React from "react";

import styles from "./styles/index.module.scss";
import "./styles/index.module.scss";

import Square from "./square/Square";

function Game() {
  return (
    <div className={styles.container}>
      <div className={styles.gameContainer}>
        {Array(25)
          .fill("")
          .map((item: any, idx: number) => (
            <Square id={idx} key={idx} />
          ))}
      </div>
    </div>
  );
}

export default Game;
