"use client";

import React from "react";
import { z } from "zod";

import styles from "./index.module.scss";
import "./index.module.scss";
import Link from "next/link";

import { FormEvent, useRef } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRegisterUserMutation } from "@/src/app/store/features/api/userApiSlice";

function Login() {
  const spanOneRef = useRef<HTMLSpanElement>(null);
  const spanTwoRef = useRef<HTMLSpanElement>(null);
  const spanThreeRef = useRef<HTMLSpanElement>(null);

  const [isErrExist, setIsErrExist] = React.useState({
    status: false,
  });
  const [getUser, { isLoading, data }] = useRegisterUserMutation();

  const userSchema = z.object({
    email: z.string().email(),
    name: z
      .string()
      .min(6, { message: "Your Name must have to minumum 5 character" })
      .max(10, { message: "Your Name must maximum 20 characters" }),
    password: z
      .string()
      .min(6, { message: "Your Password must have to minumum 5 character" })
      .max(10, { message: "Your Password must maximum 10 characters" }),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const spanOne = spanOneRef.current!;
    const spanTwo = spanTwoRef.current!;
    const spanThree = spanThreeRef.current!;

    spanOne.innerHTML = "";
    spanTwo.innerHTML = "";
    spanThree.innerHTML = "";

    const _form = e.currentTarget;
    const formData = new FormData(_form);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();

    if (
      typeof email !== undefined &&
      typeof password !== undefined &&
      typeof name !== undefined
    ) {
      const data_ = Object.create(null);
      Object.defineProperties(data_, {
        name: {
          value: name,
          writable: true,
        },
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
        getUser({
          name: data_.name,
          email: data_.email,
          password: data_.password,
        })
          .unwrap()
          .then((res) => {
            toast.success(res.message);
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
        spanThree.innerHTML = "";
      } else {
        setIsErrExist({ ...isErrExist, status: true });
        const errArr = result.error.issues;
        const errMail = errArr.find((item) => item.path[0] == "email");
        const errPas = errArr.find((item) => item.path[0] == "password");
        const errName = errArr.find((item) => item.path[0] == "name");

        if (errName !== undefined) {
          spanOne.innerHTML = errName.message;
        }
        if (errMail !== undefined) {
          spanTwo.innerHTML = errMail.message;
        }
        if (errPas !== undefined) {
          spanThree.innerHTML = errPas.message;
        }
      }
    }
  };
  return (
    <form id="form_" className={styles.form_} onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label htmlFor="name_">Name and Surname:</label>
      <input type="text" name="name" id="name_" />
      <span
        ref={spanOneRef}
        id="spnOne"
        className={isErrExist.status ? styles.err : styles.errNone}
      ></span>
      <label htmlFor="email_">E-mail Adress:</label>
      <input type="text" name="email" id="email_" />
      <span
        id="spnTwo"
        ref={spanTwoRef}
        className={isErrExist.status ? styles.err : styles.errNone}
      ></span>
      <label htmlFor="password_">Password:</label>
      <input type="text" name="password" id="password_" />
      <span
        id="spnThre"
        ref={spanThreeRef}
        className={isErrExist.status ? styles.err : styles.errNone}
      ></span>
      <button type="submit"> {isLoading ? "Loading..." : "Send"} </button>
      <Link href="register">
        <h4>Back To Login Page</h4>
      </Link>
    </form>
  );
}

export default Login;
