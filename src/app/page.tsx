import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.scss";
import "./page.module.scss";

import HomeContainer from "@/containers/home/Home";

export default function Home_() {
  return (
    <main className={styles.container}>
      <HomeContainer />
    </main>
  );
}
