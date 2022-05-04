import express from "express";

import csv from "csvtojson";

interface Webcams {
  Camera: string;
  location: string;
  latitude: string;
  longitude: string;
  id: number | undefined;
}

// Import csv data and parse csv data to object
const csvFilePath = "./cameras-defb.csv";
let webcams: Array<Webcams>;
csv()
  .fromFile(csvFilePath)
  .then((jsonObject) => {
    webcams = jsonObject;

    //   Read user input from command line
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    //  print search result to console

    readline.question(`Look for a webcam: `, (searchTerm: string) => {
      let searchResult = [];
      for (let i = 0; i < webcams.length; i++) {
        webcams[i].id = i;
        if (
          webcams[i].location
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase().trim())
        )
          searchResult.push(webcams[i]);
      }
      searchResult.length > 0
        ? console.log("Search result: ", searchResult)
        : console.log("No results");
      app.get("/", (req, res) => {
        res.send(webcams);
      });

      readline.close();
    });
  });

const app = express();
const port = 3002;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.send(webcams);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
