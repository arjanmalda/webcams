import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.style.scss";
import Table from "./components/Table/Table";
import LeafletMap from "./components/LeafletMap";
import { Form } from "react-bootstrap";

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
  const [darkTheme, setDarkTheme] = useState(false);

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
    fetch("http://192.168.1.66:3001/api/webcams")
      .then((response) => response.json())
      .then((data) => createTableColumns(data));
  }, []);

  const handleThemeChange = () => {
    setDarkTheme(!darkTheme);
  };

  if (!webcamData) {
    return <div className="App">Webcams are loading</div>;
  } else {
    return (
      <div className={`main-wrapper-${darkTheme ? "dark" : "light"}`}>
        <div className="dark-theme-toggle">
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              label={`${
                darkTheme ? "Disable dark theme" : "Enable dark theme"
              }`}
              onChange={handleThemeChange}
            />
          </Form>
        </div>

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
