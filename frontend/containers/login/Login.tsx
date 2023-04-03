import React from "react";

import styles from "./index.module.scss";
import "./index.module.scss";

function Login() {
  return (
    <form className={styles.form_}>
      <h2>Login</h2>
      <label htmlFor="email_">E-mail Adress:</label>
      <input type="text" name="email" id="email_" />
      <label htmlFor="password_">Password:</label>
      <input type="text" name="password" id="password_" />
      <button type="submit">Send</button>
      <h4>Go To Register Page</h4>
    </form>
  );
}

export default Login;
