import express from "express";
import csv from "csvtojson";

interface Webcams {
  camera: string;
  location: string;
  latitude: string;
  longitude: string;
}

// Import csv data
const csvFilePath = "./cameras-defb.csv";

//   Read user input from command line
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// parse csv data to object and print search result to console

readline.question(`Look for a webcam: `, (searchTerm: string) => {
  let webcams: Array<Webcams>;
  csv()
    .fromFile(csvFilePath)
    .then((jsonObject) => {
      webcams = jsonObject;

      let searchResult = [];
      for (let i = 0; i < webcams.length; i++) {
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
    });

  readline.close();
});

const app = express();
const port = 3002;

app.get("/", (req, res) => {
  res.send(`Look for a webcam`);
});

app.listen(port, () => {
  //   console.log(`The application is listening on port ${port}!`);
});
