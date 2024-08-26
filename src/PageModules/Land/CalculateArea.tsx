import React, { useEffect, useState } from 'react';

interface LatLng {
  lat: number;
  lng: number;
}

interface CalculateAreaProps {
  polygonPoints: LatLng[][];
}

const CalculateArea: React.FC<CalculateAreaProps> = ({ polygonPoints }) => {
  const [area, setArea] = useState<number | null>(null);

  useEffect(() => {
    if (window.google && window.google.maps.geometry && window.google.maps.geometry.spherical) {
      const path = polygonPoints[0].map(point => new google.maps.LatLng(point.lat, point.lng));
      const computedArea = google.maps.geometry.spherical.computeArea(path);
      setArea(computedArea);
    } else {
      console.error('Google Maps API or geometry library not loaded');
    }
  }, [polygonPoints]);

  return (
    <div>
      <h3>Calculated Area:</h3>
      <p>{area ? `${area.toFixed(2)} square meters` : 'Calculating area...'}</p>
    </div>
  );
};

export default CalculateArea;
