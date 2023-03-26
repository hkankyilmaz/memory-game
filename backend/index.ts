import express, { Express, Request, Response } from "express";

const app = express();

app.listen(8080, () => {
  console.log("Hello Server");
});
