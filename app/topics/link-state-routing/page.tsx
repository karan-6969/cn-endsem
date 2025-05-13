"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home, Play, Pause, RotateCcw } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LinkStateRoutingPage() {
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const animationRef = useRef<number | null>(null)
  const [selectedRouter, setSelectedRouter] = useState("A")

  // Define the network topology
  const topology = {
    nodes: {
      A: { x: 100, y: 100, neighbors: ["B", "C"] },
      B: { x: 300, y: 100, neighbors: ["A", "C", "D"] },
      C: { x: 100, y: 300, neighbors: ["A", "B", "D"] },
      D: { x: 300, y: 300, neighbors: ["B", "C"] },
    },
    links: [
      { from: "A", to: "B", cost: 1 },
      { from: "A", to: "C", cost: 1 },
      { from: "B", to: "C", cost: 1 },
      { from: "B", to: "D", cost: 1 },
      { from: "C", to: "D", cost: 1 },
    ],
  }

  // Dijkstra's algorithm results for each router
  const shortestPaths = {
    A: {
      A: { distance: 0, path: ["A"] },
      B: { distance: 1, path: ["A", "B"] },
      C: { distance: 1, path: ["A", "C"] },
      D: { distance: 2, path: ["A", "B", "D"] },
    },
    B: {
      A: { distance: 1, path: ["B", "A"] },
      B: { distance: 0, path: ["B"] },
      C: { distance: 1, path: ["B", "C"] },
      D: { distance: 1, path: ["B", "D"] },
    },
    C: {
      A: { distance: 1, path: ["C", "A"] },
      B: { distance: 1, path: ["C", "B"] },
      C: { distance: 0, path: ["C"] },
      D: { distance: 1, path: ["C", "D"] },
    },
    D: {
      A: { distance: 2, path: ["D", "B", "A"] },
      B: { distance: 1, path: ["D", "B"] },
      C: { distance: 1, path: ["D", "C"] },
      D: { distance: 0, path: ["D"] },
    },
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Content sections animation
    gsap.from(".content-section", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
      },
    })

    // Draw initial network topology
    drawNetworkTopology()

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  useEffect(() => {
    drawNetworkTopology()
  }, [animationStep, selectedRouter])

  const drawNetworkTopology = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw links
    topology.links.forEach((link) => {
      const fromNode = topology.nodes[link.from as keyof typeof topology.nodes]
      const toNode = topology.nodes[link.to as keyof typeof topology.nodes]

      // Determine if this link is part of the shortest path from selected router
      const isShortestPath =
        animationStep >= 4 &&
        shortestPaths[selectedRouter as keyof typeof shortestPaths][
          link.to as keyof typeof shortestPaths.A
        ]?.path.includes(link.from) &&
        shortestPaths[selectedRouter as keyof typeof shortestPaths][link.to as keyof typeof shortestPaths.A]?.path
          .indexOf(link.from)
          .toString() ===
          (
            shortestPaths[selectedRouter as keyof typeof shortestPaths][
              link.to as keyof typeof shortestPaths.A
            ]?.path.indexOf(link.to) - 1
          ).toString()

      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)
      ctx.strokeStyle = isShortestPath ? "#10b981" : "#888"
      ctx.lineWidth = isShortestPath ? 3 : 2
      ctx.stroke()

      // Draw link cost
      const midX = (fromNode.x + toNode.x) / 2
      const midY = (fromNode.y + toNode.y) / 2
      ctx.fillStyle = "#1f2937"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(link.cost.toString(), midX, midY - 10)
    })

    // Draw nodes
    Object.entries(topology.nodes).forEach(([name, node]) => {
      const isSelected = name === selectedRouter
      const isActive = animationStep > 0 && ["A", "B", "C", "D"].indexOf(name) < animationStep

      // Node circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, 25, 0, Math.PI * 2)
      if (isSelected) {
        ctx.fillStyle = "#3b82f6" // Blue for selected router
      } else if (isActive) {
        ctx.fillStyle = "#10b981" // Green for active router in animation
      } else {
        ctx.fillStyle = "#f3f4f6" // Light gray for inactive routers
      }
      ctx.fill()
      ctx.strokeStyle = "#1f2937"
      ctx.stroke()

      // Node label
      ctx.fillStyle = isSelected || isActive ? "#ffffff" : "#1f2937"
      ctx.font = "bold 16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`R${name}`, node.x, node.y)
    })

    // Draw animation effects based on step
    if (animationStep > 0 && animationStep < 4) {
      // Simulate LSA flooding
      const sourceRouter = Object.keys(topology.nodes)[animationStep - 1]
      const sourceNode = topology.nodes[sourceRouter as keyof typeof topology.nodes]

      Object.entries(topology.nodes).forEach(([name, node]) => {
        if (
          name !== sourceRouter &&
          topology.nodes[sourceRouter as keyof typeof topology.nodes].neighbors.includes(name)
        ) {
          // Draw LSA packet
          const progress = (animationStep % 1) * 2 // 0 to 2 for smooth animation
          const packetProgress = progress > 1 ? 2 - progress : progress // 0->1->0 for back and forth
          const packetX = sourceNode.x + (node.x - sourceNode.x) * packetProgress
          const packetY = sourceNode.y + (node.y - sourceNode.y) * packetProgress

          ctx.beginPath()
          ctx.arc(packetX, packetY, 8, 0, Math.PI * 2)
          ctx.fillStyle = "#ef4444" // Red for LSA packets
          ctx.fill()
        }
      })
    }
  }

  const startAnimation = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setAnimationStep(1)

    const animate = () => {
      setAnimationStep((prev) => {
        const newStep = prev + 0.02
        if (newStep >= 5) {
          setIsAnimating(false)
          return 4 // Final step showing shortest paths
        }
        return newStep
      })
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const pauseAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    setIsAnimating(false)
  }

  const resetAnimation = () => {
    pauseAnimation()
    setAnimationStep(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SideNav className="mt-8" />
              </SheetContent>
            </Sheet>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Link>
              </Button>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm font-medium">Link State Routing</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/topics/ip-protocols">
                Next Topic
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 md:py-12 flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <SideNav />
          </div>
        </aside>

        <main className="flex-1 max-w-3xl">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Link State Routing</h1>
            <p className="text-muted-foreground">Understanding link state routing protocols and their operation.</p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Introduction to Link State Routing</h2>
              <p>
                Link State Routing is one of the two primary approaches to dynamic routing (the other being Distance
                Vector Routing). In link state protocols, each router builds a complete and independent map of the
                entire network topology and then calculates the best path to each destination using this map.
              </p>
              <p>
                Unlike distance vector protocols, which share routing tables with neighbors, link state protocols share
                information about the state of their directly connected links with all other routers in the network.
                This approach results in faster convergence and more accurate routing decisions, making link state
                protocols well-suited for large and complex networks.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Link State Routing Fundamentals</h2>
              <p>The key characteristics of link state routing include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Complete Topology Knowledge:</strong> Each router builds and maintains a complete map of the
                  network.
                </li>
                <li>
                  <strong>Link State Advertisements (LSAs):</strong> Routers share information about their directly
                  connected links with all other routers.
                </li>
                <li>
                  <strong>Dijkstra's Shortest Path First (SPF) Algorithm:</strong> Used to calculate the optimal path to
                  each destination.
                </li>
                <li>
                  <strong>Event-Driven Updates:</strong> Updates are sent only when network changes occur, rather than
                  periodically.
                </li>
                <li>
                  <strong>Hierarchical Design:</strong> Many link state protocols support hierarchical network design to
                  improve scalability.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How Link State Routing Works</h2>
              <p>The operation of link state routing protocols can be broken down into five main steps:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Neighbor Discovery:</strong> Routers identify their directly connected neighbors through hello
                  packets.
                </li>
                <li>
                  <strong>Link State Information Exchange:</strong> Each router creates Link State Advertisements (LSAs)
                  describing its directly connected links and their costs.
                </li>
                <li>
                  <strong>Flooding:</strong> LSAs are flooded throughout the network so that all routers receive
                  information about all links.
                </li>
                <li>
                  <strong>Topology Database Construction:</strong> Each router builds a complete topology database (also
                  called a link state database) using the received LSAs.
                </li>
                <li>
                  <strong>Shortest Path Calculation:</strong> Each router independently runs Dijkstra's SPF algorithm on
                  its topology database to calculate the shortest path to each destination.
                </li>
              </ol>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md my-6">
                <h3 className="text-lg font-medium mb-4 text-center">Link State Routing Simulation</h3>
                <div className="flex justify-center mb-4">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    className="border border-gray-300 rounded-lg bg-white"
                  ></canvas>
                </div>
                <div className="flex justify-center gap-4 mb-4">
                  <Button onClick={startAnimation} disabled={isAnimating} className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start Simulation
                  </Button>
                  <Button
                    onClick={pauseAnimation}
                    disabled={!isAnimating}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Pause className="h-4 w-4" />
                    Pause
                  </Button>
                  <Button onClick={resetAnimation} variant="outline" className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => setSelectedRouter("A")}
                    variant={selectedRouter === "A" ? "default" : "outline"}
                    size="sm"
                  >
                    Router A
                  </Button>
                  <Button
                    onClick={() => setSelectedRouter("B")}
                    variant={selectedRouter === "B" ? "default" : "outline"}
                    size="sm"
                  >
                    Router B
                  </Button>
                  <Button
                    onClick={() => setSelectedRouter("C")}
                    variant={selectedRouter === "C" ? "default" : "outline"}
                    size="sm"
                  >
                    Router C
                  </Button>
                  <Button
                    onClick={() => setSelectedRouter("D")}
                    variant={selectedRouter === "D" ? "default" : "outline"}
                    size="sm"
                  >
                    Router D
                  </Button>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Shortest Paths from Router {selectedRouter}</h4>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Destination</TableHead>
                          <TableHead>Distance</TableHead>
                          <TableHead>Path</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(shortestPaths[selectedRouter as keyof typeof shortestPaths]).map(
                          ([dest, info]) => (
                            <TableRow key={dest}>
                              <TableCell>Router {dest}</TableCell>
                              <TableCell>{info.distance}</TableCell>
                              <TableCell>{info.path.join(" → ")}</TableCell>
                            </TableRow>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Animation steps:</p>
                  <ol className="list-decimal pl-6">
                    <li>Neighbor discovery and initial LSA creation</li>
                    <li>LSA flooding throughout the network</li>
                    <li>Topology database construction</li>
                    <li>SPF calculation and routing table creation</li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Dijkstra's Shortest Path First Algorithm</h2>
              <p>
                The Dijkstra's Shortest Path First (SPF) algorithm is the heart of link state routing protocols. It
                calculates the shortest path from a source node to all other nodes in a graph with non-negative edge
                weights.
              </p>
              <p>Here's a simplified explanation of how the algorithm works:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Initialization:</strong> Create a set of unvisited nodes. Assign a tentative distance value of
                  infinity to all nodes except the source node, which gets a value of 0.
                </li>
                <li>
                  <strong>Selection:</strong> Select the unvisited node with the smallest tentative distance as the
                  current node.
                </li>
                <li>
                  <strong>Relaxation:</strong> For each neighbor of the current node, calculate the tentative distance
                  through the current node. If this distance is less than the previously recorded tentative distance,
                  update the tentative distance and set the current node as the predecessor.
                </li>
                <li>
                  <strong>Mark as Visited:</strong> After considering all neighbors, mark the current node as visited.
                </li>
                <li>
                  <strong>Repeat:</strong> Repeat steps 2-4 until all nodes are visited or the smallest tentative
                  distance among unvisited nodes is infinity (indicating unreachable nodes).
                </li>
                <li>
                  <strong>Path Construction:</strong> Construct the shortest path to each destination by following the
                  predecessor chain from the destination back to the source.
                </li>
              </ol>

              <h3 className="text-xl font-medium mt-6">Worked Example: Dijkstra's Algorithm</h3>
              <p>
                Let's work through a step-by-step example of Dijkstra's algorithm using the network topology shown in
                the simulation above, with Router A as the source:
              </p>

              <div className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Step 1: Initialization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Set distance to A = 0 (source node)</li>
                      <li>Set distance to B = ∞</li>
                      <li>Set distance to C = ∞</li>
                      <li>Set distance to D = ∞</li>
                      <li>Unvisited set = {"{A, B, C, D}"}</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Step 2: Process Node A</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Select A (smallest distance in unvisited set)</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        Neighbor B: distance to A (0) + cost A→B (1) = 1
                        <br />1 &lt; ∞, so update distance to B = 1, predecessor = A
                      </li>
                      <li>
                        Neighbor C: distance to A (0) + cost A→C (1) = 1
                        <br />1 &lt; ∞, so update distance to C = 1, predecessor = A
                      </li>
                      <li>Mark A as visited</li>
                      <li>Unvisited set = {"{B, C, D}"}</li>
                      <li>Current distances: A=0, B=1, C=1, D=∞</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Step 3: Process Node B</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Select B (smallest distance in unvisited set, tied with C but chosen arbitrarily)</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        Neighbor C: distance to B (1) + cost B→C (1) = 2
                        <br />2 &gt; 1, so no update (C already has a better path through A)
                      </li>
                      <li>
                        Neighbor D: distance to B (1) + cost B→D (1) = 2
                        <br />2 &lt; ∞, so update distance to D = 2, predecessor = B
                      </li>
                      <li>Mark B as visited</li>
                      <li>Unvisited set = {"{C, D}"}</li>
                      <li>Current distances: A=0, B=1, C=1, D=2</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Step 4: Process Node C</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Select C (smallest distance in unvisited set)</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        Neighbor D: distance to C (1) + cost C→D (1) = 2
                        <br />2 = 2, so no update (D already has an equally good path through B)
                      </li>
                      <li>Mark C as visited</li>
                      <li>Unvisited set = {"{D}"}</li>
                      <li>Current distances: A=0, B=1, C=1, D=2</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Step 5: Process Node D</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Select D (only node left in unvisited set)</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>No unvisited neighbors</li>
                      <li>Mark D as visited</li>
                      <li>Unvisited set = {"{}"}</li>
                      <li>Final distances: A=0, B=1, C=1, D=2</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Final Result: Shortest Paths from Router A</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Destination</TableHead>
                          <TableHead>Distance</TableHead>
                          <TableHead>Path</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Router A</TableCell>
                          <TableCell>0</TableCell>
                          <TableCell>A</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Router B</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>A → B</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Router C</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>A → C</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Router D</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>A → B → D</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Common Link State Routing Protocols</h2>
              <p>
                Several link state routing protocols are widely used in modern networks. The most prominent ones
                include:
              </p>

              <h3 className="text-xl font-medium mt-6">Open Shortest Path First (OSPF)</h3>
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle>OSPF Characteristics</CardTitle>
                  <CardDescription>
                    The most widely deployed link state routing protocol for IP networks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Key Features</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Open standard defined in RFC 2328 (OSPFv2) and RFC 5340 (OSPFv3)</li>
                      <li>Supports VLSM and CIDR</li>
                      <li>Fast convergence</li>
                      <li>Uses cost as metric (typically based on bandwidth)</li>
                      <li>Supports authentication</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Hierarchical Design</h4>
                    <p>OSPF uses a two-level hierarchy with areas:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Area 0 (Backbone Area):</strong> Central area to which all other areas connect
                      </li>
                      <li>
                        <strong>Non-backbone Areas:</strong> Connected to Area 0, can be configured as:
                        <ul className="list-disc pl-6 mt-1">
                          <li>Standard areas</li>
                          <li>Stub areas</li>
                          <li>Totally stubby areas</li>
                          <li>Not-so-stubby areas (NSSA)</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Router Types</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Internal Router:</strong> All interfaces in the same area
                      </li>
                      <li>
                        <strong>Area Border Router (ABR):</strong> Interfaces in multiple areas
                      </li>
                      <li>
                        <strong>Backbone Router:</strong> At least one interface in Area 0
                      </li>
                      <li>
                        <strong>Autonomous System Boundary Router (ASBR):</strong> Connects to other routing domains
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-xl font-medium mt-6">Intermediate System to Intermediate System (IS-IS)</h3>
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle>IS-IS Characteristics</CardTitle>
                  <CardDescription>
                    Link state routing protocol commonly used in large service provider networks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Key Features</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Defined in ISO/IEC 10589 and RFC 1195</li>
                      <li>Runs directly on the data link layer (not over IP)</li>
                      <li>Highly scalable</li>
                      <li>Supports both IPv4 and IPv6 in a single instance</li>
                      <li>Uses metric values from 1 to 63 (narrow) or 1 to 16777214 (wide)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Hierarchical Design</h4>
                    <p>IS-IS uses a two-level hierarchy:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Level 1:</strong> Routing within an area (similar to OSPF non-backbone areas)
                      </li>
                      <li>
                        <strong>Level 2:</strong> Routing between areas (similar to OSPF backbone)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Router Types</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Level 1 Router:</strong> Maintains detailed information about its own area
                      </li>
                      <li>
                        <strong>Level 2 Router:</strong> Maintains information about inter-area routing
                      </li>
                      <li>
                        <strong>Level 1-2 Router:</strong> Participates in both Level 1 and Level 2 routing
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-xl font-medium mt-6">Enhanced Interior Gateway Routing Protocol (EIGRP)</h3>
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle>EIGRP as a Hybrid Protocol</CardTitle>
                  <CardDescription>
                    While primarily classified as an advanced distance vector protocol, EIGRP incorporates several link
                    state features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Maintains a topology table similar to a link state database</li>
                    <li>Uses Diffusing Update Algorithm (DUAL) instead of Dijkstra's SPF</li>
                    <li>Forms neighbor relationships like link state protocols</li>
                    <li>Sends partial, bounded updates only when changes occur</li>
                    <li>Originally Cisco proprietary, but basic functionality was later opened as RFC 7868</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">OSPF Configuration Example</h2>
              <p>Here's a basic OSPF configuration example for a Cisco router with interfaces in multiple areas:</p>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>
                  {`Router> enable
Router# configure terminal

! Enable OSPF process with process ID 1
Router(config)# router ospf 1

! Define router-id (best practice to set explicitly)
Router(config-router)# router-id 1.1.1.1

! Add networks to OSPF areas
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0
Router(config-router)# network 192.168.2.0 0.0.0.255 area 1
Router(config-router)# network 192.168.3.0 0.0.0.255 area 2

! Configure interface-specific OSPF parameters
Router(config-router)# exit
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip ospf cost 10
Router(config-if)# ip ospf priority 2

! Configure authentication (optional)
Router(config-if)# ip ospf authentication message-digest
Router(config-if)# ip ospf message-digest-key 1 md5 MySecretKey

Router(config-if)# end
Router# write memory`}
                </pre>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Link State vs. Distance Vector Routing</h2>
              <p>
                Understanding the differences between link state and distance vector routing protocols helps in
                selecting the appropriate protocol for specific network requirements:
              </p>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Characteristic</TableHead>
                      <TableHead>Link State Protocols</TableHead>
                      <TableHead>Distance Vector Protocols</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Network Knowledge</TableCell>
                      <TableCell>Complete topology map</TableCell>
                      <TableCell>Only next-hop and distance information</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Update Method</TableCell>
                      <TableCell>Flooding of link state advertisements</TableCell>
                      <TableCell>Exchange of routing tables with neighbors</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Update Frequency</TableCell>
                      <TableCell>Event-driven (when changes occur)</TableCell>
                      <TableCell>Periodic (with triggered updates)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Algorithm</TableCell>
                      <TableCell>Dijkstra's Shortest Path First</TableCell>
                      <TableCell>Bellman-Ford</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Convergence Speed</TableCell>
                      <TableCell>Fast</TableCell>
                      <TableCell>Slower (count-to-infinity problem)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Resource Requirements</TableCell>
                      <TableCell>Higher CPU and memory</TableCell>
                      <TableCell>Lower CPU and memory</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Scalability</TableCell>
                      <TableCell>Better for large networks</TableCell>
                      <TableCell>Better for small networks</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bandwidth Usage</TableCell>
                      <TableCell>High initially, low during steady state</TableCell>
                      <TableCell>Consistent periodic updates</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Examples</TableCell>
                      <TableCell>OSPF, IS-IS</TableCell>
                      <TableCell>RIP, IGRP</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Advantages and Disadvantages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advantages of Link State Routing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Fast Convergence:</strong> Quickly adapts to network changes, minimizing downtime.
                      </li>
                      <li>
                        <strong>Accurate Routing:</strong> Complete topology knowledge enables optimal path selection.
                      </li>
                      <li>
                        <strong>Efficient Bandwidth Usage:</strong> Updates only when changes occur, reducing overhead
                        during steady state.
                      </li>
                      <li>
                        <strong>Loop Prevention:</strong> Less susceptible to routing loops due to complete topology
                        knowledge.
                      </li>
                      <li>
                        <strong>Scalability:</strong> Hierarchical design supports large networks with many routers.
                      </li>
                      <li>
                        <strong>Support for VLSM and CIDR:</strong> Enables efficient IP address utilization.
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Disadvantages of Link State Routing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Complexity:</strong> More complex to understand, implement, and troubleshoot.
                      </li>
                      <li>
                        <strong>Resource Intensive:</strong> Requires more CPU, memory, and initial bandwidth.
                      </li>
                      <li>
                        <strong>Design Considerations:</strong> Requires careful planning, especially for hierarchical
                        designs.
                      </li>
                      <li>
                        <strong>Initial Convergence Time:</strong> Building the initial topology database can take time
                        in large networks.
                      </li>
                      <li>
                        <strong>Potential for Database Inconsistencies:</strong> If LSAs are lost or corrupted, routers
                        may have inconsistent views of the network.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Summary</h2>
              <p>
                Link State Routing is a sophisticated approach to dynamic routing where each router builds a complete
                map of the network topology and independently calculates the best paths to all destinations. Key points
                to remember:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Link state protocols share information about directly connected links through Link State
                  Advertisements (LSAs) that are flooded throughout the network.
                </li>
                <li>
                  Dijkstra's Shortest Path First algorithm is used to calculate optimal paths based on the complete
                  topology database.
                </li>
                <li>
                  OSPF and IS-IS are the most widely deployed link state protocols, with OSPF being the standard for
                  enterprise networks and IS-IS often preferred by service providers.
                </li>
                <li>
                  Link state protocols offer faster convergence, more accurate routing, and better scalability than
                  distance vector protocols, but require more resources and careful design.
                </li>
                <li>
                  Hierarchical design with areas or levels is a key feature of link state protocols that improves
                  scalability by limiting the scope of topology changes and reducing the size of the topology database.
                </li>
              </ul>
              <p>
                Understanding link state routing is essential for network engineers designing and managing modern
                networks, as these protocols form the backbone of most enterprise and service provider routing
                infrastructures.
              </p>
            </section>
          </div>

          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <Button variant="outline" size="sm" asChild>
              <Link href="/topics/dynamic-vector-routing">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Topic
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/topics/ip-protocols">
                Next Topic
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
