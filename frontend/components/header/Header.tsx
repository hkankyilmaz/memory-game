import React from "react";

import { FaUserAlt } from "react-icons/fa";
import styles from "./styles/index.module.scss";
import "./styles/index.module.scss";
import Link from "next/link";

function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.content}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <Link href="/dashboard">Dashboard</Link>
        </ul>
        <div>
          <Link href="/login">
            <FaUserAlt />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
