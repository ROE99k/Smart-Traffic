
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { junctionData } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

const CameraView = () => {
  // In a real app, this would fetch live or recent camera images
  // For demo, we'll use placeholder images with YOLO-style detection boxes
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Camera Monitoring</CardTitle>
        <CardDescription>Live feeds with vehicle detection</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cam-001">
          <TabsList className="grid grid-cols-4">
            {junctionData.map((junction) => (
              <TabsTrigger key={junction.cameraId} value={junction.cameraId}>
                Junction {junction.id}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {junctionData.map((junction) => (
            <TabsContent key={junction.cameraId} value={junction.cameraId}>
              <div className="relative rounded-md overflow-hidden border">
                {/* Mock camera feed with detection boxes */}
                <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-white text-sm">Camera feed simulation for {junction.name}</p>
                    
                    {/* Simulated Video Display with YOLO-style boxes */}
                    <div className="mt-4 relative mx-auto border-2 border-gray-800 bg-gray-800 w-full max-w-[600px] aspect-video">
                      {/* Simulated road background */}
                      <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                        <div className="w-full h-[20px] bg-gray-500"></div>
                      </div>
                      
                      {/* YOLO-style detection boxes */}
                      {junction.status === "normal" && (
                        <>
                          <div className="absolute w-[60px] h-[30px] border-2 border-green-400 left-[20%] top-[45%]">
                            <div className="text-xs text-green-400 absolute -top-5 left-0">Car 98%</div>
                          </div>
                          <div className="absolute w-[60px] h-[30px] border-2 border-green-400 left-[70%] top-[52%]">
                            <div className="text-xs text-green-400 absolute -top-5 left-0">Car 95%</div>
                          </div>
                        </>
                      )}
                      
                      {junction.status === "busy" && (
                        <>
                          <div className="absolute w-[60px] h-[30px] border-2 border-yellow-400 left-[10%] top-[45%]">
                            <div className="text-xs text-yellow-400 absolute -top-5 left-0">Car 97%</div>
                          </div>
                          <div className="absolute w-[60px] h-[30px] border-2 border-yellow-400 left-[30%] top-[52%]">
                            <div className="text-xs text-yellow-400 absolute -top-5 left-0">Car 92%</div>
                          </div>
                          <div className="absolute w-[80px] h-[40px] border-2 border-yellow-400 left-[50%] top-[48%]">
                            <div className="text-xs text-yellow-400 absolute -top-5 left-0">Truck 89%</div>
                          </div>
                          <div className="absolute w-[60px] h-[30px] border-2 border-yellow-400 left-[75%] top-[52%]">
                            <div className="text-xs text-yellow-400 absolute -top-5 left-0">Car 94%</div>
                          </div>
                        </>
                      )}
                      
                      {junction.status === "congested" && (
                        <>
                          <div className="absolute w-[60px] h-[30px] border-2 border-red-400 left-[5%] top-[45%]">
                            <div className="text-xs text-red-400 absolute -top-5 left-0">Car 99%</div>
                          </div>
                          <div className="absolute w-[60px] h-[30px] border-2 border-red-400 left-[20%] top-[52%]">
                            <div className="text-xs text-red-400 absolute -top-5 left-0">Car 96%</div>
                          </div>
                          <div className="absolute w-[80px] h-[40px] border-2 border-red-400 left-[35%] top-[48%]">
                            <div className="text-xs text-red-400 absolute -top-5 left-0">Truck 93%</div>
                          </div>
                          <div className="absolute w-[60px] h-[30px] border-2 border-red-400 left-[55%] top-[52%]">
                            <div className="text-xs text-red-400 absolute -top-5 left-0">Car 97%</div>
                          </div>
                          <div className="absolute w-[60px] h-[30px] border-2 border-red-400 left-[70%] top-[45%]">
                            <div className="text-xs text-red-400 absolute -top-5 left-0">Car 94%</div>
                          </div>
                          <div className="absolute w-[60px] h-[30px] border-2 border-red-400 left-[85%] top-[52%]">
                            <div className="text-xs text-red-400 absolute -top-5 left-0">Car 91%</div>
                          </div>
                        </>
                      )}
                      
                      {/* Traffic light status */}
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${junction.currentLight === 'red' ? 'bg-red-500' : 'bg-gray-600'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${junction.currentLight === 'yellow' ? 'bg-yellow-500' : 'bg-gray-600'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${junction.currentLight === 'green' ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Live status indicators */}
                <div className="p-3 bg-white border-t flex items-center justify-between">
                  <div>
                    <Badge variant={
                      junction.status === "normal" ? "default" : 
                      junction.status === "busy" ? "secondary" : 
                      "destructive"
                    }>
                      {junction.status}
                    </Badge>
                    <span className="ml-2 text-sm">
                      {junction.vehicleCount} vehicles detected
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground">
                      Signal:
                    </span>
                    <div className="ml-2 flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${junction.currentLight === 'red' ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                      <div className={`w-3 h-3 rounded-full ${junction.currentLight === 'yellow' ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                      <div className={`w-3 h-3 rounded-full ${junction.currentLight === 'green' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CameraView;
