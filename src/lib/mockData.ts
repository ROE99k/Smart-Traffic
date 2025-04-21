// Mock data to simulate traffic data from API
export const junctionData = [
  {
    id: 1,
    name: "Prithvi Chowk",
    lat: 28.2372,
    lng: 83.9928,
    status: "normal", // normal, busy, congested
    currentLight: "green", // red, yellow, green
    vehicleCount: 24,
    waitTime: 45,
    lastUpdated: new Date().toISOString(),
    cameraId: "cam-001"
  },
  {
    id: 2,
    name: "Sabhagriha Chowk",
    lat: 28.2195,
    lng: 83.9856,
    status: "busy",
    currentLight: "red",
    vehicleCount: 42,
    waitTime: 120,
    lastUpdated: new Date().toISOString(),
    cameraId: "cam-002"
  }
];

// Generate historical traffic data for the past week
export const generateHistoricalData = (junctionId: number) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = [];
  
  // Generate 7 days of hourly data
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // Create morning and evening peaks
      let baseCount = 10;
      if (hour >= 8 && hour <= 10) baseCount = 50; // Morning peak
      else if (hour >= 17 && hour <= 19) baseCount = 60; // Evening peak
      else if (hour >= 12 && hour <= 14) baseCount = 30; // Lunch peak
      else if (hour >= 0 && hour <= 5) baseCount = 5; // Night low
      
      // Weekend adjustment
      if (day >= 5) {
        // Weekends have different patterns
        if (hour >= 10 && hour <= 18) baseCount = Math.max(baseCount * 0.8, 15);
        else baseCount = Math.max(baseCount * 0.6, 5);
      }
      
      // Add randomness
      const count = Math.floor(baseCount + (Math.random() * baseCount * 0.3) - (baseCount * 0.15));
      
      // Calculate wait time based on count (simplified)
      const waitTime = Math.min(Math.floor(count * 1.5), 240);
      
      data.push({
        timestamp: new Date(Date.now() - (7 - day) * 24 * 60 * 60 * 1000 - (24 - hour) * 60 * 60 * 1000).toISOString(),
        day: days[day],
        hour,
        junctionId,
        vehicleCount: count,
        waitTime: waitTime,
        status: count > 50 ? "congested" : count > 30 ? "busy" : "normal",
      });
    }
  }
  
  return data;
};

// Generate alert data
export const generateAlerts = () => {
  return [
    {
      id: 1,
      junctionId: 3,
      junctionName: "Central Market Crossing",
      type: "congestion",
      message: "Severe congestion detected. Traffic wait time exceeds 3 minutes.",
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
      severity: "high",
      resolved: false
    },
    {
      id: 2,
      junctionId: 2,
      junctionName: "Tech Park Junction",
      type: "anomaly",
      message: "Unusual traffic pattern detected. Vehicle count increased by 60% in 10 minutes.",
      timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(), // 42 minutes ago
      severity: "medium",
      resolved: false
    },
    {
      id: 3,
      junctionId: 1,
      junctionName: "Main Street & Broadway",
      type: "system",
      message: "ESP32 device restarted successfully after maintenance.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      severity: "low",
      resolved: true
    },
    {
      id: 4,
      junctionId: 4,
      junctionName: "University Road",
      type: "maintenance",
      message: "Camera calibration scheduled for tomorrow at 02:00.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      severity: "info",
      resolved: true
    }
  ];
};

// Generate week-to-week comparison data
export const generateWeekComparisonData = (junctionId: number) => {
  const data = [];
  const hoursInDay = Array.from({ length: 24 }, (_, i) => i);
  
  // Current week
  hoursInDay.forEach(hour => {
    let baseCount = 10;
    if (hour >= 8 && hour <= 10) baseCount = 50;
    else if (hour >= 17 && hour <= 19) baseCount = 60;
    else if (hour >= 12 && hour <= 14) baseCount = 30;
    else if (hour >= 0 && hour <= 5) baseCount = 5;
    
    const currentCount = Math.floor(baseCount + (Math.random() * baseCount * 0.3) - (baseCount * 0.15));
    
    // Previous week (slightly different pattern to show changes)
    const previousFactor = 0.8 + (Math.random() * 0.4); // Between 80% and 120% of current
    const previousCount = Math.floor(currentCount * previousFactor);
    
    data.push({
      hour: `${hour}:00`,
      current: currentCount,
      previous: previousCount,
      diff: currentCount - previousCount
    });
  });
  
  return data;
};

// Export utility function to prepare CSV data
export const prepareExportData = (junctionId: number, days = 7) => {
  const data = generateHistoricalData(junctionId);
  // Take most recent 'days' worth of data
  return data.slice(-24 * days);
};

// Get current status statistics
export const getStatusStats = () => {
  return {
    total: junctionData.length,
    normal: junctionData.filter(j => j.status === "normal").length,
    busy: junctionData.filter(j => j.status === "busy").length,
    congested: junctionData.filter(j => j.status === "congested").length,
  };
};
