import React, { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import Table from "./components/Table";

interface Webcams {
  Camera: string;
  location: string;
  latitude: string;
  longitude: string;
  id: number;
}
function App() {
  const [webcamData, setWebcamData] = useState<Webcams[]>();
  const [cameras3, setCameras3] = useState<Webcams[]>();
  const [cameras5, setCameras5] = useState<Webcams[]>();
  const [cameras35, setCameras35] = useState<Webcams[]>();
  const [camerasOther, setCamerasOther] = useState<Webcams[]>();

  const createTableColumns = (webcams: Webcams[]) => {
    let row1 = [];
    let row2 = [];
    let row3 = [];
    let row4 = [];

    for (let i = 0; i < webcams.length; i++) {
      if (parseInt(webcams[i].Camera.replace(/\D/g, "")) % 3 === 0) {
        row1.push(webcams[i]);
      }
      if (parseInt(webcams[i].Camera.replace(/\D/g, "")) % 5 === 0) {
        row2.push(webcams[i]);
      }
      if (
        parseInt(webcams[i].Camera.replace(/\D/g, "")) % 3 === 0 &&
        parseInt(webcams[i].Camera.replace(/\D/g, "")) % 5 === 0
      ) {
        row3.push(webcams[i]);
      }
      if (
        parseInt(webcams[i].Camera.replace(/\D/g, "")) % 3 !== 0 &&
        parseInt(webcams[i].Camera.replace(/\D/g, "")) % 5 !== 0
      ) {
        row4.push(webcams[i]);
      }
      setCameras3(row1);
      setCameras5(row2);
      setCameras35(row3);
      setCamerasOther(row4);
    }
    setWebcamData(webcams);
  };

  useEffect(() => {
    fetch("http://localhost:3002")
      .then((response) => response.json())
      .then((data) => createTableColumns(data));
  }, [webcamData]);

  if (!webcamData) {
    return <div className="App">Webcams are loading</div>;
  } else {
    return (
      <div className="App">
        <table id="cameraTableContainer">
          <tbody>
            <tr>
              <td>
                <table id="column3">
                  <thead>
                    <tr>
                      <th>Cameras 3</th>
                    </tr>
                    <tr>
                      <th>Number</th>
                      <th>Name</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cameras3 &&
                      cameras3.map((webcam) => {
                        return (
                          <tr>
                            <td>{webcam.Camera}</td>
                            <td>{webcam.location}</td>
                            <td>{webcam.latitude}</td>
                            <td>{webcam.longitude}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                  ;
                </table>
              </td>
              <td>
                <table id="column5">
                  <thead>
                    <tr>
                      <th>Cameras 5</th>
                    </tr>
                    <tr>
                      <th>Number</th>
                      <th>Name</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cameras5 &&
                      cameras5.map((webcam) => {
                        return (
                          <tr>
                            <td>{webcam.Camera}</td>
                            <td>{webcam.location}</td>
                            <td>{webcam.latitude}</td>
                            <td>{webcam.longitude}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
              <td>
                <table id="column15">
                  <thead>
                    <tr>
                      <th>Cameras 3 &amp; 5</th>
                    </tr>
                    <tr>
                      <th>Number</th>
                      <th>Name</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cameras35 &&
                      cameras35.map((webcam) => {
                        return (
                          <tr>
                            <td>{webcam.Camera}</td>
                            <td>{webcam.location}</td>
                            <td>{webcam.latitude}</td>
                            <td>{webcam.longitude}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
              <td>
                <table id="columnOther">
                  <thead>
                    <tr>
                      <th>Cameras Overig</th>
                    </tr>
                    <tr>
                      <th>Number</th>
                      <th>Name</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                    </tr>
                  </thead>
                  <tbody>
                    {camerasOther &&
                      camerasOther.map((webcam) => {
                        return (
                          <tr>
                            <td>{webcam.Camera}</td>
                            <td>{webcam.location}</td>
                            <td>{webcam.latitude}</td>
                            <td>{webcam.longitude}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
