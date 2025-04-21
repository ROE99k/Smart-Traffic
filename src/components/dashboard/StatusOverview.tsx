
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusStats } from "@/lib/mockData";
import { CircleCheck, CircleAlert, AlertTriangle } from "lucide-react";

const StatusOverview = () => {
  const stats = getStatusStats();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Junctions</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            Smart traffic junctions
          </p>
        </CardContent>
      </Card>
      <Card className="bg-green-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Normal Flow</CardTitle>
          <CircleCheck className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.normal}</div>
          <p className="text-xs text-muted-foreground">
            Junctions with normal traffic
          </p>
        </CardContent>
      </Card>
      <Card className="bg-yellow-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Busy</CardTitle>
          <CircleAlert className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.busy}</div>
          <p className="text-xs text-muted-foreground">
            Junctions with heavy traffic
          </p>
        </CardContent>
      </Card>
      <Card className="bg-red-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Congested</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.congested}</div>
          <p className="text-xs text-muted-foreground">
            Junctions requiring attention
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusOverview;
