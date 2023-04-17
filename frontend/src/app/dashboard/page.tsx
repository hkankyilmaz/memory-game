"use client";

import React from "react";
import { useAppSelector } from "../store/hooks";

function Dashboard() {
  const user = useAppSelector((state) => state);
  console.log(user);

  return <div>Dashboard</div>;
}

export default Dashboard;
