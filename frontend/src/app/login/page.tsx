import React from "react";

import styles from "./style/index.module.scss";
import "./style/index.module.scss";

import LoginContainer from "@/containers/loginContainer/Login";

function Register() {
  return (
    <main className={styles.container}>
      <LoginContainer />
    </main>
  );
}

export default Register;
