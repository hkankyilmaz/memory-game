"use client";

import React from "react";
import { z } from "zod";

import styles from "./index.module.scss";
import "./index.module.scss";
import Link from "next/link";

import { useGetUserMutation } from "@/src/app/store/features/api/apiSlice";

function Login() {
  console.log("resfles");
  const [isErrExist, setIsErrExist] = React.useState({
    status: false,
    emailText: "",
    passwordText: "",
  });
  const [getUser, { isLoading, data }] = useGetUserMutation();

  const userSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Your Password must have to minumum 5 character" })
      .max(10, { message: "Your Password must maximum 10 characters" }),
  });

  if (typeof window !== "undefined") {
    document.getElementById("form_")?.addEventListener("submit", (e) => {
      e.preventDefault();

      const spanOne = document.getElementById("spnOne") as HTMLElement;
      const spanTwo = document.getElementById("spnTwo") as HTMLElement;

      spanOne.innerHTML = "";
      spanTwo.innerHTML = "";

      const _form = document.getElementById("form_") as HTMLFormElement;
      const formData = new FormData(_form);

      const email = formData.get("email")?.toString();
      const password = formData.get("password")?.toString();

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
        });

        const result = userSchema.safeParse(data_);

        if (result.success) {
          console.log(data_);
          getUser({
            email: data_.email,
            password: data_.password,
          })
            .unwrap()
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

          spanOne.innerHTML = "";
          spanTwo.innerHTML = "";
        } else {
          setIsErrExist({ ...isErrExist, status: true });
          const errArr = result.error.issues;
          const errMail = errArr.find((item) => item.path[0] == "email");
          const errPas = errArr.find((item) => item.path[0] == "password");

          if (errMail !== undefined) {
            spanOne.innerHTML = errMail.message;
          }
          if (errPas !== undefined) {
            spanTwo.innerHTML = errPas.message;
          }
        }
      }
    });
  }
  return (
    <form id="form_" className={styles.form_}>
      <h2>Login</h2>
      <label htmlFor="email_">E-mail Adress:</label>
      <input type="text" name="email" id="email_" />
      <span
        id="spnOne"
        className={isErrExist.status ? styles.err : styles.errNone}
      >
        Deneme
      </span>
      <label htmlFor="password_">Password:</label>
      <input type="text" name="password" id="password_" />
      <span
        id="spnTwo"
        className={isErrExist.status ? styles.err : styles.errNone}
      >
        Deneme
      </span>
      <button type="submit"> {isLoading ? "Loading..." : "Send"} </button>
      <Link href="register">
        <h4>Go To Register Page</h4>
      </Link>
    </form>
  );
}

export default Login;
