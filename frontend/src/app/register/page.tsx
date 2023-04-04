import React from "react";

import styles from "./style/index.module.scss";
import "./style/index.module.scss";

import RegisterContainer from "@/containers/register/page";

function Register() {
  return (
    <main className={styles.container}>
      <RegisterContainer />
    </main>
  );
}

export default Register;
