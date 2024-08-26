// src/ViewLand.tsx
import React, { useState } from "react";
import { Grid } from "@chakra-ui/react";
import { Typography, message } from "antd";
import Map from "../../Components/Map";
import AppLayout from "../../Layouts/AppLayout";
import Land from "../../Components/Land";
import AuthGuard from "../../Components/AuthGuard";

const { Title } = Typography;

const MapWrapper: React.FC<{ id: number | null }> = ({ id }) => {
  const isLocked = id === null;

  return (
    <div>
      {isLocked ? (
        <div style={{ backgroundColor: '#f0f0f0', color: '#a0a0a0', padding: '20px', textAlign: 'center' }}>
          Map is locked. Please add land details to unlock.
        </div>
      ) : (
        <Map id={id} />
      )}
    </div>
  );
};

const AddLand: React.FC = () => {
  const [responseData, setResponseData] = useState<any>(null);
  const [landId, setLandId] = useState<number | null>(null);

  const handleResponse = (data: any) => {
    setResponseData(data);
    if (data && data.id) {
      setLandId(data.id);
    }
  };

  // Determine the mode for the Land component
  const isAdding = landId === null;

  return (
    <AuthGuard>
      <Grid
        templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
        gap={4}
        p={4}
      >
        <MapWrapper id={landId} />
        <div>
          <Land
            id={landId || 0} // Default to 0 if landId is null
            title={landId ? "View Land Details" : "Add Land Details"}
            name=""
            location=""
            size=""
            owner=""
            land_type=""
            market_value=""
            notes=""
            add={isAdding} // Set to true if adding new land
            view={!isAdding} // Set to true if viewing existing land
            onResponse={handleResponse}
          />
          {!isAdding && landId && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <p>Click on Edit to mark Land from map</p>
            </div>
          )}
        </div>
      </Grid>
      
    </AuthGuard>
  );
};

export default AddLand;
