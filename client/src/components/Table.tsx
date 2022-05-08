import { Webcams } from "../App";

// I have no idea why the type <React.FC<Webcams> is not accepted here
const Table: any = ({
  cameras3,
  cameras5,
  cameras35,
  camerasOther,
}: Webcams) => {
  return (
    <table className="table mt-5">
      <tbody>
        <tr>
          <td>
            <table className="table">
              <thead>
                <tr>
                  <th className="table-header h3" colSpan={4}>
                    Cameras 3
                  </th>
                </tr>
              </thead>
              <thead>
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
                      <tr key={webcam.id}>
                        <td>{webcam.Camera}</td>
                        <td>{webcam.location}</td>
                        <td>{webcam.Latitude}</td>
                        <td>{webcam.Longitude}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </td>
          <td>
            <table className="table">
              <thead>
                <tr>
                  <th className="table-header h3" colSpan={4}>
                    Cameras 5
                  </th>
                </tr>
              </thead>
              <thead>
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
                      <tr key={webcam.id}>
                        <td>{webcam.Camera}</td>
                        <td>{webcam.location}</td>
                        <td>{webcam.Latitude}</td>
                        <td>{webcam.Longitude}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </td>
          <td>
            <table className="table">
              <thead>
                <tr>
                  <th className="table-header h3" colSpan={4}>
                    Cameras 3 &amp; 5
                  </th>
                </tr>
              </thead>
              <thead>
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
                      <tr key={webcam.id}>
                        <td>{webcam.Camera}</td>
                        <td>{webcam.location}</td>
                        <td>{webcam.Latitude}</td>
                        <td>{webcam.Longitude}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </td>
          <td>
            <table className="table">
              <thead>
                <tr>
                  <th className="table-header h3" colSpan={4}>
                    Cameras Overig
                  </th>
                </tr>
              </thead>
              <thead>
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
                      <tr key={webcam.id}>
                        <td>{webcam.Camera}</td>
                        <td>{webcam.location}</td>
                        <td>{webcam.Latitude}</td>
                        <td>{webcam.Longitude}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
