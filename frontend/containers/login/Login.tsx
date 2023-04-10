"use client";

import React from "react";
import { z } from "zod";

import styles from "./index.module.scss";
import "./index.module.scss";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormEvent, useRef } from "react";

import { useGetUserMutation } from "@/src/app/store/features/api/apiSlice";

function Login() {
  const spanOneRef = useRef<HTMLSpanElement>(null);
  const spanTwoRef = useRef<HTMLSpanElement>(null);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const spanOne = spanTwoRef.current!;
    const spanTwo = spanTwoRef.current!;

    spanOne.innerHTML = "";
    spanTwo.innerHTML = "";

    const _form = e.currentTarget;
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
          .then((res) => {
            toast.success(res.message);
            console.log(res);
          })
          .catch((err) => {
            if (err.data.message) {
              toast.error(err.data.message);
            } else {
              toast.error("Oh no, there is a problem..");
            }
          });

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
  };
  return (
    <form id="form_" className={styles.form_} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="email_">E-mail Adress:</label>
      <input type="text" name="email" id="email_" />
      <span
        id="spnOne"
        ref={spanOneRef}
        className={isErrExist.status ? styles.err : styles.errNone}
      >
        Deneme
      </span>
      <label htmlFor="password_">Password:</label>
      <input type="text" name="password" id="password_" />
      <span
        id="spnTwo"
        ref={spanTwoRef}
        className={isErrExist.status ? styles.err : styles.errNone}
      >
        Deneme
      </span>
      <button type="submit"> {isLoading ? "Loading..." : "Send"} </button>
      <Link href="register">
        <h4>Go To Register Page</h4>
      </Link>
      <ToastContainer
        hideProgressBar={true}
        autoClose={3000}
        position="top-center"
      />
    </form>
  );
}

export default Login;
