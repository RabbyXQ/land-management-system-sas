import React, { useEffect, useState } from "react";
import { Grid, Box, Text } from "@chakra-ui/react";
import Land from "../../Components/Land";
import Map from "../../Components/Map";
import AppLayout from "../../Layouts/AppLayout";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthGuard from "../../Components/AuthGuard";

interface LandData {
  id: number;
  name: string;
  location: string;
  size: string;
  owner: string;
  landType: string;
  marketValue: string;
  notes: string;
  polygons: Array<Array<{ lat: number; lng: number }>>; // Polygons as a JSON array
}

const ViewLand: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [landData, setLandData] = useState<LandData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [polygons, setPolygons] = useState<google.maps.LatLngLiteral[][]>([]);

  const handlePolygonsChange = (updatedPolygons: google.maps.LatLngLiteral[][]) => {
    setPolygons(updatedPolygons);
  };

  const handleSendData = async (polygons: google.maps.LatLngLiteral[][]) => {
    try {
      await axios.put(`http://localhost:4000/lands/${id}`, { polygons });
      alert("Polygon data sent successfully.");
    } catch (err) {
      console.error("Error sending polygon data:", err);
      alert("Error sending polygon data.");
    }
  };

  useEffect(() => {
    const fetchLandData = async () => {
      if (id) {
        const numericId = Number(id);
        if (!isNaN(numericId)) {
          try {
            const response = await axios.get(`http://localhost:4000/lands/${numericId}`);
            setLandData(response.data);
          } catch (err) {
            console.error("Error fetching land data:", err);
            setError("Error fetching land data.");
          } finally {
            setLoading(false);
          }
        } else {
          console.error("Invalid ID format");
          setError("Invalid ID format.");
          setLoading(false);
        }
      }
    };

    fetchLandData();
  }, [id]);

  // Debug: Log polygons and display them on the page
  useEffect(() => {
    console.log("Polygons from map:", polygons);
  }, [polygons]);

  return (
    <AuthGuard>
      <Grid templateColumns={{ base: "1fr", lg: "40fr 60fr" }} gap={4} p={4}>
        {landData && (
          <>
            <Map 
              
              id={Number(id)}
              
            />
            <Land
              id={Number(id)}
              title="landDetails"
              name={landData.name}
              location={landData.location}
              size={landData.size}
              owner={landData.owner}
              land_type={landData.landType}
              market_value={landData.marketValue}
              notes={landData.notes}
              view={true}
            />
            {/* Display polygons on the page */}
            <Box mt={4}>
              <Text fontWeight="bold">Polygons Data:</Text>
              <pre>{JSON.stringify(polygons, null, 2)}</pre>
            </Box>
          </>
        )}
      </Grid>
    </AuthGuard>
  );
};

export default ViewLand;
