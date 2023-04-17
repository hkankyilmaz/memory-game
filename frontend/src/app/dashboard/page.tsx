"use client";

import React from "react";

import { useAppSelector, useAppDispatch } from "@/src/app/store/hooks";
import { whoIsUser } from "@/src/app/store/features/user/userSlice";

function Dashboard() {
  const user = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  console.log(user);

  return <div>Dashboard</div>;
}

export default Dashboard;
