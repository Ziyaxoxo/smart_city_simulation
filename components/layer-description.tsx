import type { Layer } from "@/components/smart-city-simulation"

interface LayerDescriptionProps {
  layer: Layer
  step: number
}

export default function LayerDescription({ layer, step }: LayerDescriptionProps) {
  if (!layer) return null

  const descriptions = {
    perception: [
      "The Perception Layer is where data collection begins. Sensors throughout the city gather environmental data.",
      "Sensors are collecting temperature (25°C), humidity (50%), and light intensity (800 lux) data in real-time.",
      "The collected data is being packaged for transmission through the network. Each sensor has a unique identifier.",
      "Data packets are now ready to be sent to the Network Layer. The packets include timestamp and location data.",
    ],
    network: [
      "The Network Layer handles data transmission across the city's infrastructure using various communication protocols.",
      "Data packets from sensors are being transmitted through wireless networks, fiber optics, and cellular networks.",
      "The network ensures reliable delivery of data from sensors to processing centers with error correction and packet routing.",
      "Data has been successfully transmitted and is ready for processing in the Middleware Layer. Network latency: 5ms.",
    ],
    middleware: [
      "The Middleware Layer is responsible for processing and analyzing the raw sensor data using advanced algorithms.",
      "Data is being filtered, aggregated, and analyzed to extract meaningful insights. Anomalies are being detected.",
      "Machine learning models are processing the data to identify patterns and predict future conditions in the city.",
      "Processing complete. The analyzed data is now ready for visualization in the Application Layer. 3 insights generated.",
    ],
    application: [
      "The Application Layer presents the processed data in a user-friendly interface for city administrators and citizens.",
      "Dashboards and visualizations are being generated based on the processed data from all city sensors.",
      "Users can now monitor real-time city metrics, receive alerts, and make data-driven decisions for city management.",
      "The complete data flow cycle is finished. The Smart City is now operating efficiently based on real-time data.",
    ],
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{descriptions[layer][step]}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-gradient-to-r from-green-500 to-teal-500 h-2.5 rounded-full"
          style={{ width: `${(step + 1) * 25}%` }}
        ></div>
      </div>
      <div className="text-xs text-right text-muted-foreground">Step {step + 1} of 4</div>
    </div>
  )
}
