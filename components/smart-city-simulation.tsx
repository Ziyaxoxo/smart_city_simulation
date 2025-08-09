"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Star } from "lucide-react"
import CityMap from "@/components/city-map"
import DataFlowAnimation from "@/components/data-flow-animation"
import LayerDescription from "@/components/layer-description"

export type Layer = "perception" | "network" | "middleware" | "application" | null

export default function SmartCitySimulation() {
  const [activeLayer, setActiveLayer] = useState<Layer>(null)
  const [animationStep, setAnimationStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [score, setScore] = useState(0)
  const [unlockedLayers, setUnlockedLayers] = useState<Layer[]>(["perception"])
  const [achievements, setAchievements] = useState<string[]>([])
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  const handleLayerClick = (layer: Layer) => {
    if (isAnimating) return

    // Check if layer is unlocked
    if (layer && !unlockedLayers.includes(layer)) {
      // Show a message that the layer is locked
      return
    }

    // Reset animation if clicking on a new layer
    if (layer !== activeLayer) {
      setActiveLayer(layer)
      setAnimationStep(0)
      setIsAnimating(true)
    }
  }

  useEffect(() => {
    if (isAnimating && activeLayer) {
      // Clear any existing timeout
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }

      // Set up the animation sequence
      animationRef.current = setTimeout(() => {
        if (animationStep < 3) {
          setAnimationStep((prev) => prev + 1)
        } else {
          setIsAnimating(false)

          // Add points when animation completes
          setScore((prev) => prev + 10)

          // Unlock next layer if this is the first time completing this layer
          if (activeLayer === "perception" && !unlockedLayers.includes("network")) {
            setUnlockedLayers((prev) => [...prev, "network"])
            setAchievements((prev) => [...prev, "Network Layer Unlocked!"])
          } else if (activeLayer === "network" && !unlockedLayers.includes("middleware")) {
            setUnlockedLayers((prev) => [...prev, "middleware"])
            setAchievements((prev) => [...prev, "Middleware Layer Unlocked!"])
          } else if (activeLayer === "middleware" && !unlockedLayers.includes("application")) {
            setUnlockedLayers((prev) => [...prev, "application"])
            setAchievements((prev) => [...prev, "Application Layer Unlocked!"])
          }

          // Add achievement for first completion of each layer
          if (!achievements.includes(`${activeLayer} Master`)) {
            setAchievements((prev) => [...prev, `${activeLayer} Master`])
          }
        }
      }, 2000) // 2 seconds per step
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [isAnimating, animationStep, activeLayer, unlockedLayers, achievements])

  return (
    <div className="space-y-8">
      {/* Score and achievements bar */}
      <div className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg text-white">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5" />
          <span className="font-bold">Score: {score}</span>
        </div>

        <div className="flex space-x-2">
          {unlockedLayers.map((layer) => (
            <Badge key={layer} variant="outline" className="bg-white/20 hover:bg-white/30">
              {layer?.charAt(0).toUpperCase() + layer?.slice(1)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Achievement notification */}
      <AnimatePresence>
        {achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <Star className="h-5 w-5" />
            <div>
              <div className="font-bold">Achievement Unlocked!</div>
              <div className="text-sm">{achievements[achievements.length - 1]}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-yellow-600"
              onClick={() => setAchievements((prev) => prev.slice(0, -1))}
            >
              ✕
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <CityMap activeLayer={activeLayer} onLayerClick={handleLayerClick} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {activeLayer
                  ? `${activeLayer.charAt(0).toUpperCase() + activeLayer.slice(1)} Layer`
                  : "Smart City Architecture"}
              </h2>

              <AnimatePresence mode="wait">
                {activeLayer ? (
                  <motion.div
                    key={`${activeLayer}-${animationStep}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <LayerDescription layer={activeLayer} step={animationStep} />
                    <DataFlowAnimation layer={activeLayer} step={animationStep} />

                    {/* Gamification elements */}
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg dark:bg-gray-800">
                      <div className="text-sm font-medium mb-2">Layer Progress</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-gradient-to-r from-green-500 to-teal-500 h-2.5 rounded-full"
                          style={{ width: `${(animationStep + 1) * 25}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>Data Collection</span>
                        <span>Processing</span>
                        <span>Complete</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="instructions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground"
                  >
                    <p>Click on any layer of the Smart City to see how data flows through the architecture.</p>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                      <li>Underground: Perception Layer (sensors and data collection)</li>
                      <li className={unlockedLayers.includes("network") ? "" : "text-gray-400"}>
                        Streets: Network Layer (data transmission)
                        {!unlockedLayers.includes("network") && " (Locked)"}
                      </li>
                      <li className={unlockedLayers.includes("middleware") ? "" : "text-gray-400"}>
                        Buildings: Middleware Layer (data processing)
                        {!unlockedLayers.includes("middleware") && " (Locked)"}
                      </li>
                      <li className={unlockedLayers.includes("application") ? "" : "text-gray-400"}>
                        City Center: Application Layer (data visualization)
                        {!unlockedLayers.includes("application") && " (Locked)"}
                      </li>
                    </ul>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">How to Play</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Start by clicking on the Underground (Perception Layer). Complete each layer's animation to
                        unlock the next layer and earn points!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
