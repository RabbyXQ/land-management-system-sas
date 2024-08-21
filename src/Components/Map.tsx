import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, LoadScript, Polygon, DrawingManager, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const Map: React.FC = () => {
  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [markedLocation, setMarkedLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [selectedPolygonIndex, setSelectedPolygonIndex] = useState<number | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          map.setCenter({ lat: latitude, lng: longitude });
        },
        () => {
          console.error("Error getting current location");
          map.setCenter(defaultCenter);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      map.setCenter(defaultCenter);
    }
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const onPolygonComplete = useCallback((polygon: google.maps.Polygon) => {
    polygon.setMap(null); // Remove the polygon from DrawingManager after it's drawn
    setPolygons((prevPolygons) => [...prevPolygons, polygon]);
    polygon.addListener("click", () => {
      const index = polygons.indexOf(polygon);
      setSelectedPolygonIndex(index); // Set the clicked polygon as selected
    });
  }, [polygons]);

  const handleMarkLocation = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      if (center) {
        setMarkedLocation(center.toJSON());
      }
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setCurrentLocation(newLocation);
          if (mapRef.current) {
            mapRef.current.setCenter(newLocation);
          }
        },
        () => {
          console.error("Error getting current location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    setMarkedLocation({
      lat: event.latLng?.lat() || 0,
      lng: event.latLng?.lng() || 0,
    });
  };

  const handleDeletePolygon = () => {
    if (selectedPolygonIndex !== null) {
      const polygonToRemove = polygons[selectedPolygonIndex];
      polygonToRemove.setMap(null); // Remove polygon from the map
      setPolygons((prevPolygons) =>
        prevPolygons.filter((_, index) => index !== selectedPolygonIndex)
      );
      setSelectedPolygonIndex(null);
    }
  };

  const handleAddPoint = (event: google.maps.MapMouseEvent) => {
    if (selectedPolygonIndex !== null && event.latLng) {
      const selectedPolygon = polygons[selectedPolygonIndex];
      const path = selectedPolygon.getPath();
      path.push(event.latLng); // Add the new point to the polygon's path
      selectedPolygon.setPath(path); // Update the polygon with the new path
    }
  };

  const handleRemovePoint = (event: google.maps.MapMouseEvent) => {
    if (selectedPolygonIndex !== null && event.latLng) {
      const selectedPolygon = polygons[selectedPolygonIndex];
      const path = selectedPolygon.getPath();
      let indexToRemove: number | null = null;
      path.forEach((latLng, index) => {
        if (latLng.equals(event.latLng)) {
          indexToRemove = index;
        }
      });
      if (indexToRemove !== null) {
        path.removeAt(indexToRemove); // Remove the point from the polygon's path
        selectedPolygon.setPath(path); // Update the polygon with the new path
      }
    }
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div style={{ position: "relative", height: "400px" }}>
        <LoadScript
          googleMapsApiKey="AIzaSyBI5XtEyQENmu9h8-8wUdxUDAj2J9vQFSg"
          libraries={['drawing']}  // <-- Add this line to include the drawing library
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleAddPoint} // Handle adding points
            onDblClick={handleRemovePoint} // Handle removing points
          >
            <DrawingManager
              onPolygonComplete={onPolygonComplete}
              options={{
                drawingControl: true,
                drawingControlOptions: {
                  drawingModes: ["polygon"] as google.maps.drawing.OverlayType[],
                },
              }}
            />

            {polygons.map((polygon, index) => (
              <Polygon
                key={index}
                paths={polygon.getPath().getArray().map(latLng => latLng.toJSON())}
                options={{
                  fillColor: "blue",
                  fillOpacity: 0.3,
                  strokeColor: "blue",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  clickable: true,
                  editable: true,
                  draggable: true,
                }}
                onClick={() => setSelectedPolygonIndex(index)}
              />
            ))}

            {currentLocation && (
              <Marker
                position={currentLocation}
                label="You are here"
              />
            )}

            {markedLocation && (
              <Marker
                position={markedLocation}
                label="Marked Location"
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                }}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <div style={{ position: "absolute", top: "420px", left: "10px", zIndex: 1 }}>
        <button onClick={handleMarkLocation} style={{ display: "block", marginBottom: "10px" }}>
          Mark Location
        </button>
        <button onClick={handleCurrentLocation} style={{ display: "block", marginBottom: "10px" }}>
          Current Location
        </button>
        <button onClick={handleDeletePolygon} style={{ display: "block", marginBottom: "10px" }}>
          Delete Selected Polygon
        </button>
      </div>
    </div>
  );
};

export default Map;
