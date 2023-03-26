import React from "react";

import styles from "./styles/index.module.scss";
import "./styles/index.module.scss";

function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.content}>
        <ul>
          <li>Home</li>
          <li>Dasboard</li>
        </ul>
        <div>Icon</div>
      </div>
    </div>
  );
}

export default Header;
