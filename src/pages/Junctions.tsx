
import TrafficMap from "@/components/dashboard/TrafficMap";
import TrafficAnalysis from "@/components/junctions/TrafficAnalysis";

const Junctions = () => {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-1">Junction Management</h1>
        <p className="text-muted-foreground">
          Monitor and analyze traffic patterns at key junctions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TrafficMap />
        <TrafficAnalysis />
      </div>
    </div>
  );
};

export default Junctions;
