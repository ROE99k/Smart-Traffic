import StatusOverview from "@/components/dashboard/StatusOverview";
import TrafficMap from "@/components/dashboard/TrafficMap";
import TrafficCharts from "@/components/dashboard/TrafficCharts";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import CameraView from "@/components/dashboard/CameraView";
import DataExport from "@/components/dashboard/DataExport";
import TrafficControls from "@/components/dashboard/TrafficControls";
import { useEffect } from "react";
import { testFirebaseURL } from "@/lib/api";

const Dashboard = () => {
  console.log("Dashboard component is rendering");
  console.log("Child components:", {
    StatusOverview: typeof StatusOverview,
    TrafficMap: typeof TrafficMap,
    TrafficCharts: typeof TrafficCharts,
    AlertsPanel: typeof AlertsPanel,
    CameraView: typeof CameraView,
    DataExport: typeof DataExport,
  });

  useEffect(() => {
    testFirebaseURL();
  }, []);

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-1">Traffic Control Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time monitoring and management of smart traffic light system
        </p>
      </div>

      {/* Status Cards */}
      <StatusOverview />

      {/* Map & Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TrafficMap />
        <TrafficCharts />
      </div>

      {/* Remove Traffic Controls from the center */}
      {/* <TrafficControls /> */}

      {/* Camera, Alerts & Export Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CameraView />
        </div>
        <div className="space-y-6">
          <AlertsPanel />
          <DataExport />
          {/* Move Traffic Controls to the side */}
          <TrafficControls />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
