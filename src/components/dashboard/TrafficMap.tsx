
import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { junctionData } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// API key would normally be properly managed in a real app
const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your Google Maps API key

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.5rem"
};

// Center on Pokhara
const defaultCenter = {
  lat: 28.2296,
  lng: 83.9892
};

const TrafficMap = () => {
  const [selected, setSelected] = useState<any | null>(null);
  const [mapApiKeyInput, setMapApiKeyInput] = useState("");
  const [usingCustomKey, setUsingCustomKey] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: usingCustomKey ? mapApiKeyInput : API_KEY
  });

  const onMarkerClick = useCallback((junction: any) => {
    setSelected(junction);
  }, []);

  const onInfoWindowClose = useCallback(() => {
    setSelected(null);
  }, []);

  const getMarkerIcon = (status: string) => {
    switch (status) {
      case "normal":
        return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      case "busy":
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case "congested":
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      default:
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    }
  };

  const applyCustomKey = () => {
    setUsingCustomKey(true);
  };

  if (loadError) {
    return (
      <Card className="bg-white/50 backdrop-blur-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-gray-800">Traffic Map</CardTitle>
          <CardDescription>Real-time view of traffic junctions in Pokhara</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-red-50/80 text-red-700 rounded-md">
            <p>Error loading Google Maps. Please check your API key.</p>
            <div className="mt-4">
              <input
                type="text"
                value={mapApiKeyInput}
                onChange={(e) => setMapApiKeyInput(e.target.value)}
                placeholder="Enter your Google Maps API key"
                className="px-3 py-2 border rounded w-full mb-2"
              />
              <Button onClick={applyCustomKey} variant="outline">Apply Key</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card className="bg-white/50 backdrop-blur-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-gray-800">Traffic Map</CardTitle>
          <CardDescription>Real-time view of traffic junctions in Pokhara</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[400px] flex items-center justify-center bg-gray-50/80 rounded-md">
            <p className="text-gray-600">Loading map...</p>
          </div>
          <div className="mt-4 p-4 border rounded bg-white/80">
            <p className="text-sm text-gray-600 mb-2">
              If the map doesn't load, you may need to enter your Google Maps API key:
            </p>
            <input
              type="text"
              value={mapApiKeyInput}
              onChange={(e) => setMapApiKeyInput(e.target.value)}
              placeholder="Enter your Google Maps API key"
              className="px-3 py-2 border rounded w-full mb-2"
            />
            <Button onClick={applyCustomKey} variant="outline">Apply Key</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/50 backdrop-blur-sm border border-gray-100">
      <CardHeader>
        <CardTitle className="text-gray-800">Pokhara Traffic Map</CardTitle>
        <CardDescription>Real-time monitoring of Prithvi Chowk and Sabhagriha Chowk</CardDescription>
      </CardHeader>
      <CardContent>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={14}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            styles: [
              {
                featureType: "all",
                elementType: "geometry.fill",
                stylers: [{ weight: 2 }]
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6B7280" }]
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [{ color: "#E5E7EB" }]
              }
            ]
          }}
        >
          {junctionData.map((junction) => (
            <Marker
              key={junction.id}
              position={{ lat: junction.lat, lng: junction.lng }}
              onClick={() => onMarkerClick(junction)}
              icon={getMarkerIcon(junction.status)}
            />
          ))}
          
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={onInfoWindowClose}
            >
              <div className="p-2 max-w-[200px]">
                <h3 className="font-semibold text-gray-800">{selected.name}</h3>
                <p className="text-sm">
                  Status: <span className={`
                    ${selected.status === "normal" ? "text-green-600" : ""}
                    ${selected.status === "busy" ? "text-yellow-600" : ""}
                    ${selected.status === "congested" ? "text-red-600" : ""}
                  `}>{selected.status}</span>
                </p>
                <p className="text-sm text-gray-600">Vehicle Count: {selected.vehicleCount}</p>
                <p className="text-sm text-gray-600">Wait Time: {selected.waitTime}s</p>
                <p className="text-xs text-gray-500 mt-1">
                  Last Updated: {new Date(selected.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </CardContent>
    </Card>
  );
};

export default TrafficMap;
