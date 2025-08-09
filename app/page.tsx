import SmartCitySimulation from "@/components/smart-city-simulation"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Smart City Simulation
        </h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Explore how data flows through the Smart City architecture layers. Click on different areas of the city to see
          the data flow simulation and unlock new layers as you progress!
        </p>
        <SmartCitySimulation />
      </div>
    </main>
  )
}
