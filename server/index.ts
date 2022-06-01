import express from "express";

import csv from "csvtojson";

interface Webcams {
  Camera: string;
  location: string;
  latitude: string;
  longitude: string;
  id: number;
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
        ? console.log(
            "Search result: ",
            searchResult.map((webcam) => `${webcam.location} | `)
          )
        : console.log("No results");
      app.get("/api/webcams", (req, res) => {
        res.send(webcams);
      });

      readline.close();
    });
  });

const app = express();
const port = 3001;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/api/webcams", (req, res) => {
  res.send(webcams);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
