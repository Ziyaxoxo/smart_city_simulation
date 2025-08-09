"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { Layer } from "@/components/smart-city-simulation"
import { Sun, Moon } from "lucide-react"

interface CityMapProps {
  activeLayer: Layer
  onLayerClick: (layer: Layer) => void
}

export default function CityMap({ activeLayer, onLayerClick }: CityMapProps) {
  const [hoveredLayer, setHoveredLayer] = useState<Layer>(null)
  const [isDayTime, setIsDayTime] = useState(true)
  const [movingCars, setMovingCars] = useState<{ id: number; left: number; top: number; direction: string }[]>([])

  // Day-night cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDayTime((prev) => !prev)
    }, 30000) // Toggle every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Generate moving cars
  useEffect(() => {
    const cars = []
    for (let i = 0; i < 5; i++) {
      cars.push({
        id: i,
        left: Math.random() * 80,
        top: 60 + Math.random() * 15,
        direction: Math.random() > 0.5 ? "right" : "left",
      })
    }
    setMovingCars(cars)
  }, [])

  return (
    <div
      className={`relative w-full aspect-[4/3] transition-all duration-1000 ${isDayTime ? "bg-[#e6f7ff]" : "bg-[#0a1929]"}`}
    >
      {/* Sky */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          isDayTime ? "bg-gradient-to-b from-[#87ceeb] to-[#e6f7ff]" : "bg-gradient-to-b from-[#0a1929] to-[#162a3a]"
        } h-1/4`}
      >
        {/* Sun/Moon */}
        <motion.div
          className="absolute"
          initial={{ top: "100%", left: "10%" }}
          animate={{
            top: isDayTime ? "10%" : "100%",
            left: isDayTime ? "80%" : "10%",
            opacity: isDayTime ? 1 : 0,
          }}
          transition={{ duration: 2 }}
        >
          <Sun className="w-12 h-12 text-yellow-400" />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ top: "100%", left: "80%" }}
          animate={{
            top: !isDayTime ? "10%" : "100%",
            left: !isDayTime ? "20%" : "80%",
            opacity: !isDayTime ? 1 : 0,
          }}
          transition={{ duration: 2 }}
        >
          <Moon className="w-10 h-10 text-gray-200" />
        </motion.div>
      </div>

      {/* Stars (only visible at night) */}
      {!isDayTime && (
        <>
          <div className="absolute top-[5%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-[8%] left-[25%] w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-[3%] left-[45%] w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-[7%] left-[65%] w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-[10%] left-[85%] w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-[12%] left-[35%] w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-[2%] left-[75%] w-1 h-1 bg-white rounded-full animate-pulse"></div>
        </>
      )}

      {/* Application Layer - City Center */}
      <motion.div
        className={`absolute top-[15%] left-[40%] w-[20%] h-[25%] cursor-pointer`}
        onClick={() => onLayerClick("application")}
        onMouseEnter={() => setHoveredLayer("application")}
        onMouseLeave={() => setHoveredLayer(null)}
        whileHover={{ scale: 1.05 }}
        animate={{
          filter: activeLayer === "application" ? "brightness(1.3)" : "brightness(1)",
          boxShadow: activeLayer === "application" ? "0 0 15px rgba(255, 255, 255, 0.8)" : "none",
        }}
      >
        {/* City Center Buildings */}
        <div className="absolute bottom-0 w-full flex justify-center">
          <div className={`w-[30%] h-[80px] ${isDayTime ? "bg-[#4a4a4a]" : "bg-[#2a2a2a]"} mx-1 relative`}>
            {!isDayTime && (
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-1 p-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-yellow-300 opacity-80"></div>
                ))}
              </div>
            )}
          </div>
          <div className={`w-[20%] h-[120px] ${isDayTime ? "bg-[#6a6a6a]" : "bg-[#3a3a3a]"} mx-1 relative`}>
            {!isDayTime && (
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-6 gap-1 p-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="bg-yellow-300 opacity-80"></div>
                ))}
              </div>
            )}
          </div>
          <div className={`w-[25%] h-[100px] ${isDayTime ? "bg-[#5a5a5a]" : "bg-[#2a2a2a]"} mx-1 relative`}>
            {!isDayTime && (
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-5 gap-1 p-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="bg-yellow-300 opacity-80"></div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Label */}
        {(hoveredLayer === "application" || activeLayer === "application") && (
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            Application Layer
          </div>
        )}
      </motion.div>

      {/* Middleware Layer - Buildings */}
      <motion.div
        className={`absolute top-[30%] left-[15%] w-[70%] h-[30%] cursor-pointer`}
        onClick={() => onLayerClick("middleware")}
        onMouseEnter={() => setHoveredLayer("middleware")}
        onMouseLeave={() => setHoveredLayer(null)}
        whileHover={{ scale: 1.02 }}
        animate={{
          filter: activeLayer === "middleware" ? "brightness(1.3)" : "brightness(1)",
          boxShadow: activeLayer === "middleware" ? "0 0 15px rgba(255, 255, 255, 0.8)" : "none",
        }}
      >
        {/* Buildings */}
        <div className="absolute bottom-0 w-full flex justify-between">
          {[
            { width: "15%", height: "60px", color: isDayTime ? "#8a8a8a" : "#4a4a4a", windows: 6 },
            { width: "10%", height: "80px", color: isDayTime ? "#7a7a7a" : "#3a3a3a", windows: 8 },
            { width: "12%", height: "50px", color: isDayTime ? "#9a9a9a" : "#5a5a5a", windows: 4 },
            { width: "18%", height: "70px", color: isDayTime ? "#6a6a6a" : "#2a2a2a", windows: 9 },
            { width: "14%", height: "90px", color: isDayTime ? "#5a5a5a" : "#1a1a1a", windows: 12 },
            { width: "16%", height: "60px", color: isDayTime ? "#8a8a8a" : "#4a4a4a", windows: 6 },
          ].map((building, index) => (
            <div
              key={index}
              className="mx-1 relative"
              style={{
                width: building.width,
                height: building.height,
                backgroundColor: building.color,
              }}
            >
              {!isDayTime && (
                <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
                  {Array.from({ length: building.windows }).map((_, i) => (
                    <div key={i} className="bg-yellow-300 opacity-80"></div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Label */}
        {(hoveredLayer === "middleware" || activeLayer === "middleware") && (
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            Middleware Layer
          </div>
        )}
      </motion.div>

      {/* Network Layer - Streets */}
      <motion.div
        className={`absolute top-[60%] left-[10%] w-[80%] h-[20%] cursor-pointer`}
        onClick={() => onLayerClick("network")}
        onMouseEnter={() => setHoveredLayer("network")}
        onMouseLeave={() => setHoveredLayer(null)}
        whileHover={{ scale: 1.02 }}
        animate={{
          filter: activeLayer === "network" ? "brightness(1.3)" : "brightness(1)",
          boxShadow: activeLayer === "network" ? "0 0 15px rgba(255, 255, 255, 0.8)" : "none",
        }}
      >
        {/* Streets */}
        <div className={`absolute top-0 w-full h-[20px] ${isDayTime ? "bg-[#555]" : "bg-[#333]"}`}></div>
        <div className={`absolute top-[40px] w-full h-[20px] ${isDayTime ? "bg-[#555]" : "bg-[#333]"}`}></div>
        <div className={`absolute left-[20%] top-0 w-[20px] h-full ${isDayTime ? "bg-[#555]" : "bg-[#333]"}`}></div>
        <div className={`absolute left-[60%] top-0 w-[20px] h-full ${isDayTime ? "bg-[#555]" : "bg-[#333]"}`}></div>

        {/* Moving cars */}
        {movingCars.map((car) => (
          <motion.div
            key={car.id}
            className={`absolute w-[15px] h-[8px] ${isDayTime ? "bg-red-500" : "bg-red-700"} rounded-sm`}
            initial={{ left: `${car.left}%`, top: `${car.top}%` }}
            animate={{
              left: car.direction === "right" ? ["0%", "100%"] : ["100%", "0%"],
              top: `${car.top}%`,
            }}
            transition={{
              left: {
                duration: 8 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
            }}
          >
            {/* Car lights */}
            {!isDayTime && (
              <>
                <div className="absolute top-0 left-0 w-[3px] h-[3px] bg-yellow-300 rounded-full"></div>
                <div className="absolute top-0 right-0 w-[3px] h-[3px] bg-red-300 rounded-full"></div>
              </>
            )}
          </motion.div>
        ))}

        {/* Label */}
        {(hoveredLayer === "network" || activeLayer === "network") && (
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            Network Layer
          </div>
        )}
      </motion.div>

      {/* Perception Layer - Underground */}
      <motion.div
        className={`absolute bottom-0 left-0 w-full h-[20%] ${
          isDayTime ? "bg-gradient-to-b from-[#8B4513] to-[#654321]" : "bg-gradient-to-b from-[#3a2008] to-[#251808]"
        } cursor-pointer`}
        onClick={() => onLayerClick("perception")}
        onMouseEnter={() => setHoveredLayer("perception")}
        onMouseLeave={() => setHoveredLayer(null)}
        whileHover={{ scale: 1.02 }}
        animate={{
          filter: activeLayer === "perception" ? "brightness(1.3)" : "brightness(1)",
          boxShadow: activeLayer === "perception" ? "0 0 15px rgba(255, 255, 255, 0.8)" : "none",
        }}
      >
        {/* Sensors */}
        {[
          { top: "20%", left: "20%" },
          { top: "40%", left: "40%" },
          { top: "30%", left: "60%" },
          { top: "60%", left: "80%" },
          { top: "70%", left: "30%" },
        ].map((sensor, index) => (
          <motion.div
            key={index}
            className="absolute w-[10px] h-[10px] bg-yellow-400 rounded-full"
            style={{ top: sensor.top, left: sensor.left }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: index * 0.5,
            }}
          />
        ))}

        {/* Label */}
        {(hoveredLayer === "perception" || activeLayer === "perception") && (
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            Perception Layer
          </div>
        )}
      </motion.div>

      {/* Day/Night toggle button */}
      <button
        onClick={() => setIsDayTime((prev) => !prev)}
        className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
      >
        {isDayTime ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>
    </div>
  )
}
