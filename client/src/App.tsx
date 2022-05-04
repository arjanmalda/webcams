import React, { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import Table from "./components/Table";
import LeafletMap from "./components/LeafletMap";

export interface Webcams {
  map(arg0: (webcam: Webcams) => JSX.Element): React.ReactNode;
  Camera: string;
  location: string;
  Latitude: string;
  Longitude: string;
  id: number;
  webcamData: Webcams[];
  cameras3: Webcams;
  cameras5: Webcams;
  cameras35: Webcams;
  camerasOther: Webcams;
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
  }, []);

  if (!webcamData) {
    return <div className="App">Webcams are loading</div>;
  } else {
    return (
      <div className="App">
        <LeafletMap webcamData={webcamData} />
        {
          <Table
            cameras3={cameras3}
            cameras5={cameras5}
            cameras35={cameras35}
            camerasOther={camerasOther}
          />
        }
      </div>
    );
  }
}

export default App;
