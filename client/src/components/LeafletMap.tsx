import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState } from "react";

import { LatLngTuple } from "leaflet";
import { Alert, Button, Form } from "react-bootstrap";

const defaultLatLng: LatLngTuple = [52.09061, 5.12143];
const zoom: number = 11;

const LeafletMap: any = ({ webcamData }: any) => {
  const [pinLocations, setPinLocations] = useState<any>([1, 1]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
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
      <h1 className="page-title">
        Copy and paste the name of a webcam to display it on the map or just
        start typing and click search
      </h1>
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
      <div className="search-input-wrapper">
        <Form onSubmit={handleSearch} className="search-container">
          <Form.Control
            className="m-1"
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(event.target.value);
            }}
            required
          />
          {pinLocations === "No search results" ? (
            <Alert className="no-results-message" variant="warning m-3">
              No search results
            </Alert>
          ) : (
            <div className="no-results-message"></div>
          )}
          <Button type="submit" className="m-1">
            Search
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LeafletMap;
