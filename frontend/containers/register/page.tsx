import React from "react";

import styles from "./index.module.scss";
import "./index.module.scss";
import Link from "next/link";

function Register() {
  return (
    <form className={styles.form_}>
      <h2>Register</h2>
      <label htmlFor="name_">Name and Surname:</label>
      <input type="text" name="name" id="name_" />
      <label htmlFor="email_">E-mail Adress:</label>
      <input type="text" name="email" id="email_" />
      <label htmlFor="password_">Password:</label>
      <input type="text" name="password" id="password_" />
      <button type="submit">Send</button>
      <Link href="login">
        <h4>Back To Login Page</h4>
      </Link>
    </form>
  );
}

export default Register;
