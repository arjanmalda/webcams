import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import React, { useState } from "react";
import { Webcams } from "../App";

import { LatLngTuple } from "leaflet";

const defaultLatLng: LatLngTuple = [52.09061, 5.12143];
const zoom: number = 11;

const LeafletMap: any = ({ webcamData }: any) => {
  const [pinLocations, setPinLocations] = useState<any>([1, 1]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(pinLocations[0].Latitude, pinLocations[0].Longitude);
  const handleSearch = () => {
    let searchResult = [];
    for (let i = 0; i < webcamData.length; i++) {
      webcamData[i].id = i;
      if (
        webcamData[i].location
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim())
      ) {
        searchResult.push(webcamData[i]);
      }
    }
    if (searchResult.length < 1) {
      setPinLocations("No search results");
    } else {
      setPinLocations(searchResult);
    }
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
          {pinLocations === "No search results" ? (
            <div className="no-results-message">No search results</div>
          ) : (
            <div className="no-results-message"></div>
          )}
          <button onClick={handleSearch}>Search</button>
        </>
      </div>
      <MapContainer id="mapId" center={defaultLatLng} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {pinLocations[0].Latitude &&
          pinLocations.map(
            (webcam: {
              Camera: string;
              location: string;
              Latitude: number;
              Longitude: number;
            }) => {
              return (
                <Marker position={[webcam.Latitude, webcam.Longitude]}>
                  <Popup>
                    Naam: {webcam.Camera}
                    <br></br>Locatie: {webcam.location}
                  </Popup>
                </Marker>
              );
            }
          )}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
