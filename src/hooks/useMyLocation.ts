//custom hook to get current user location
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";

export default function useMyLocation() {
  const [location, setLocation] = useState<{
    loaded: boolean;
    coordinates: LatLngExpression;
  }>({
    loaded: false,
    coordinates: [0, 0],
  });

  const onSuccess = (location: any) => {
    setLocation({
      loaded: true,
      coordinates: [location.coords.latitude, location.coords.longitude],
    });
  };

  const onError = (error: any) => {
    setLocation({
      loaded: true,
      coordinates: [0, 0],
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}
