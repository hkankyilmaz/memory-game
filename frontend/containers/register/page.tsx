"use client";

import React from "react";
import { z } from "zod";

import styles from "./index.module.scss";
import "./index.module.scss";
import Link from "next/link";

function Register() {
  const [isErrExist, setIsErrExist] = React.useState({
    status: false,
    emailText: "",
    passwordText: "",
    nameText: "",
  });

  const userSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Your Password must have to minumum 5 character" })
      .max(10, { message: "Your Password must maximum 10 characters" }),
    name: z
      .string()
      .min(6, { message: "Your Name must have to minumum 5 character" })
      .max(20, { message: "Your Name must maximum 10 characters" }),
  });

  if (typeof window !== "undefined") {
    document.getElementById("form_")?.addEventListener("submit", (e) => {
      e.preventDefault();

      console.log("Form Submitted");

      const spanOne = document.getElementById("spnOne") as HTMLElement;
      const spanTwo = document.getElementById("spnTwo") as HTMLElement;
      const spanThree = document.getElementById("spnThree") as HTMLElement;

      spanOne.innerHTML = "";
      spanTwo.innerHTML = "";
      spanThree.innerHTML = "";

      const _form = document.getElementById("form_") as HTMLFormElement;
      const formData = new FormData(_form);

      const email = formData.get("email")?.toString();
      const password = formData.get("password")?.toString();
      const name = formData.get("name")?.toString();

      if (typeof email !== undefined && typeof password !== undefined) {
        const data_ = Object.create(null);
        Object.defineProperties(data_, {
          email: {
            value: email,
            writable: true,
          },
          password: {
            value: password,
            writable: true,
          },
          name: {
            value: name,
            writable: true,
          },
        });

        const result = userSchema.safeParse(data_);
        console.log(result);

        if (result.success) {
          spanOne.innerHTML = "";
          spanTwo.innerHTML = "";
          spanThree.innerHTML = "";
        } else {
          setIsErrExist({ ...isErrExist, status: true });
          const errArr = result.error.issues;
          const errMail = errArr.find((item) => item.path[0] == "email");
          const errPas = errArr.find((item) => item.path[0] == "password");
          const errName = errArr.find((item) => item.path[0] == "name");

          if (errMail !== undefined) {
            spanOne.innerHTML = errMail.message;
          }
          if (errPas !== undefined) {
            spanTwo.innerHTML = errPas.message;
          }
          if (errName !== undefined) {
            spanThree.innerHTML = errName.message;
          }
        }
      }
    });
  }
  return (
    <form id="form_" className={styles.form_}>
      <h2>Register</h2>
      <label htmlFor="name_">Name and Surname:</label>
      <input type="text" name="name" id="name_" />
      <span
        id="spnThree"
        className={isErrExist.status ? styles.err : styles.errNone}
      >
        @hkankyilmaz
      </span>
      <label htmlFor="email_">E-mail Adress:</label>
      <input type="text" name="email" id="email_" />
      <span
        id="spnOne"
        className={isErrExist.status ? styles.err : styles.errNone}
      >
        @hkankyilmaz
      </span>
      <label htmlFor="password_">Password:</label>
      <input type="text" name="password" id="password_" />
      <span
        id="spnTwo"
        className={isErrExist.status ? styles.err : styles.errNone}
      >
        @hkankyilmaz
      </span>
      <button type="submit">Send</button>
      <Link href="login">
        <h4>Back To Login Page</h4>
      </Link>
    </form>
  );
}

export default Register;
