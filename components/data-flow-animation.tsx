"use client"

import { motion } from "framer-motion"
import type { Layer } from "@/components/smart-city-simulation"
import { Thermometer, Droplets, Sun, Wifi, Server, BarChart4, Database } from "lucide-react"

interface DataFlowAnimationProps {
  layer: Layer
  step: number
}

export default function DataFlowAnimation({ layer, step }: DataFlowAnimationProps) {
  if (!layer) return null

  // Animation variants for data packets
  const packetVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.3 },
    },
  }

  // Animation variants for flow lines
  const flowLineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  }

  // Animation variants for particles
  const particleVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: (i: number) => ({
      opacity: [0, 1, 0],
      y: [0, -100],
      transition: {
        delay: i * 0.2,
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1,
      },
    }),
  }

  return (
    <div className="relative h-[200px] border rounded-lg bg-black/5 overflow-hidden">
      {/* Perception Layer Animation */}
      {layer === "perception" && (
        <div className="absolute inset-0 flex items-center justify-center">
          {step >= 0 && (
            <div className="grid grid-cols-3 gap-4 p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <Thermometer className="h-8 w-8 text-red-500" />
                <span className="text-xs mt-1">25°C</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center"
              >
                <Droplets className="h-8 w-8 text-blue-500" />
                <span className="text-xs mt-1">50%</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center"
              >
                <Sun className="h-8 w-8 text-yellow-500" />
                <span className="text-xs mt-1">800 lux</span>
              </motion.div>
            </div>
          )}

          {step >= 1 && (
            <>
              {/* Data particles rising from sensors */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={particleVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute bottom-0 w-2 h-2 rounded-full bg-green-500"
                  style={{ left: `${20 + i * 15}%` }}
                />
              ))}

              <motion.div
                className="absolute bottom-0 w-full flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-green-500/50"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 rgba(34, 197, 94, 0.4)",
                      "0 0 20px rgba(34, 197, 94, 0.6)",
                      "0 0 0 rgba(34, 197, 94, 0.4)",
                    ],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                  }}
                >
                  DATA
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
      )}

      {/* Network Layer Animation */}
      {layer === "network" && (
        <div className="absolute inset-0 flex items-center justify-center">
          {step >= 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
              <svg width="100%" height="100%" viewBox="0 0 400 200">
                <motion.path
                  d="M 50,100 C 100,50 300,150 350,100"
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth="4"
                  variants={flowLineVariants}
                  initial="hidden"
                  animate="visible"
                />

                {/* Glowing effect */}
                <motion.path
                  d="M 50,100 C 100,50 300,150 350,100"
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth="8"
                  strokeOpacity="0.3"
                  variants={flowLineVariants}
                  initial="hidden"
                  animate="visible"
                />

                {/* Second glowing effect */}
                <motion.path
                  d="M 50,100 C 100,50 300,150 350,100"
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth="12"
                  strokeOpacity="0.1"
                  variants={flowLineVariants}
                  initial="hidden"
                  animate="visible"
                />
              </svg>
            </motion.div>
          )}

          {step >= 1 && (
            <>
              {/* Multiple data packets */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2"
                  initial={{ x: 50 }}
                  animate={{ x: 350 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: i * 0.7,
                  }}
                >
                  <div className="relative">
                    <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-green-500/50">
                      DATA
                    </div>
                    <Wifi className="absolute -top-8 left-0 h-6 w-6 text-blue-500" />
                  </div>
                </motion.div>
              ))}

              {/* Network nodes */}
              <motion.div
                className="absolute left-[25%] top-[30%] h-4 w-4 bg-blue-500 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0.4)",
                    "0 0 15px rgba(59, 130, 246, 0.7)",
                    "0 0 0 rgba(59, 130, 246, 0.4)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />

              <motion.div
                className="absolute left-[75%] top-[40%] h-4 w-4 bg-blue-500 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0.4)",
                    "0 0 15px rgba(59, 130, 246, 0.7)",
                    "0 0 0 rgba(59, 130, 246, 0.4)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              />
            </>
          )}
        </div>
      )}

      {/* Middleware Layer Animation */}
      {layer === "middleware" && (
        <div className="absolute inset-0 flex items-center justify-center">
          {step >= 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center"
            >
              <Server className="h-16 w-16 text-purple-500" />
            </motion.div>
          )}

          {step >= 1 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <svg width="100%" height="100%" viewBox="0 0 400 200" className="absolute">
                <motion.circle
                  cx="200"
                  cy="100"
                  r="60"
                  fill="transparent"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="10 5"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />

                {/* Glowing effect */}
                <motion.circle
                  cx="200"
                  cy="100"
                  r="70"
                  fill="transparent"
                  stroke="#a855f7"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              </svg>

              {/* Database icon */}
              <motion.div
                className="absolute left-[30%] top-[30%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Database className="h-10 w-10 text-blue-500" />
              </motion.div>

              {/* Data packets being processed */}
              <motion.div
                className="absolute"
                variants={packetVariants}
                initial="hidden"
                animate="visible"
                style={{ left: "160px", top: "70px" }}
              >
                <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg shadow-green-500/50">
                  T
                </div>
              </motion.div>

              <motion.div
                className="absolute"
                variants={packetVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                style={{ left: "220px", top: "70px" }}
              >
                <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg shadow-blue-500/50">
                  H
                </div>
              </motion.div>

              <motion.div
                className="absolute"
                variants={packetVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                style={{ left: "190px", top: "130px" }}
              >
                <div className="h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg shadow-yellow-500/50">
                  L
                </div>
              </motion.div>

              {/* Processing particles */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 bg-purple-500 rounded-full"
                  style={{
                    left: `${200 + 40 * Math.cos((i * Math.PI) / 3)}px`,
                    top: `${100 + 40 * Math.sin((i * Math.PI) / 3)}px`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Application Layer Animation */}
      {layer === "application" && (
        <div className="absolute inset-0 flex items-center justify-center">
          {step >= 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full p-4 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-bold mb-2"
              >
                Smart City Dashboard
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-4"
              >
                <BarChart4 className="h-12 w-12 text-teal-500" />

                <div className="space-y-2">
                  <motion.div
                    className="h-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "8rem" }}
                    transition={{ duration: 1, delay: 0.6 }}
                  ></motion.div>
                  <motion.div
                    className="h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "6rem" }}
                    transition={{ duration: 1, delay: 0.8 }}
                  ></motion.div>
                  <motion.div
                    className="h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "10rem" }}
                    transition={{ duration: 1, delay: 1 }}
                  ></motion.div>
                </div>
              </motion.div>

              {/* Interactive elements */}
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-4 flex space-x-2"
                >
                  <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors">
                    Traffic
                  </button>
                  <button className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors">
                    Energy
                  </button>
                  <button className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 transition-colors">
                    Air Quality
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
