import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import React, { useState } from "react";
import { Webcams } from "../App";

import { LatLngTuple } from "leaflet";

const defaultLatLng: LatLngTuple = [52.09061, 5.12143];
const zoom: number = 11;

const LeafletMap: any = ({ webcamData }: any) => {
  const [pinLocations, setPinLocations] = useState<any>([{}]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    let searchResult = [];
    for (let i = 0; i < webcamData.length; i++) {
      webcamData[i].id = i;
      if (
        webcamData[i].location
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim())
      )
        searchResult.push({ Latitude: 52.09061, Longitude: 5.12143 });
    }
    if (searchResult.length < 1) {
      searchResult.push(webcamData[0]);
    }
    setPinLocations(searchResult);
  };

  return (
    <div className="map-wrapper">
      <div className="search-input-wrapper">
        <>
          <h2>
            Copy and paste the name of webcam to display it on the map<br></br>
            or just start typing and click search
          </h2>

          <input
            className="search-input"
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(event.target.value);
            }}
          />
          {pinLocations[0].Camera == undefined ? (
            <div className="no-results-message"></div>
          ) : (
            <div className="no-results-message">No search results</div>
          )}
          <button onClick={handleSearch}>Search</button>
        </>
      </div>
      <MapContainer id="mapId" center={defaultLatLng} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {pinLocations[0].Latitude != undefined ? (
          pinLocations.map(
            (webcam: {
              id: number;
              Camera: string;
              location: string;
              Latitude: number;
              Longitude: number;
            }) => {
              return (
                <Marker
                  key={webcam.id}
                  position={[webcam.Latitude, webcam.Longitude]}
                >
                  <Popup>
                    Name: {webcam.Camera}
                    <br></br>Location: {webcam.location}
                  </Popup>
                </Marker>
              );
            }
          )
        ) : (
          <div></div>
        )}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
