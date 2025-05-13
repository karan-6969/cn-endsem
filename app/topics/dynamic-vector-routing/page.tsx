"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home, Play, Pause, RotateCcw } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DynamicVectorRoutingPage() {
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const animationRef = useRef<number | null>(null)
  const [selectedRouter, setSelectedRouter] = useState("A")

  // Routing tables for each router
  const routingTables = {
    A: [
      { destination: "Network 1", nextHop: "Direct", metric: 0 },
      { destination: "Network 2", nextHop: "Direct", metric: 0 },
      { destination: "Network 3", nextHop: "B", metric: 1 },
      { destination: "Network 4", nextHop: "B", metric: 2 },
      { destination: "Network 5", nextHop: "C", metric: 1 },
      { destination: "Network 6", nextHop: "C", metric: 2 },
    ],
    B: [
      { destination: "Network 1", nextHop: "A", metric: 1 },
      { destination: "Network 2", nextHop: "Direct", metric: 0 },
      { destination: "Network 3", nextHop: "Direct", metric: 0 },
      { destination: "Network 4", nextHop: "Direct", metric: 0 },
      { destination: "Network 5", nextHop: "A", metric: 2 },
      { destination: "Network 6", nextHop: "D", metric: 1 },
    ],
    C: [
      { destination: "Network 1", nextHop: "A", metric: 1 },
      { destination: "Network 2", nextHop: "A", metric: 2 },
      { destination: "Network 3", nextHop: "D", metric: 1 },
      { destination: "Network 4", nextHop: "D", metric: 1 },
      { destination: "Network 5", nextHop: "Direct", metric: 0 },
      { destination: "Network 6", nextHop: "Direct", metric: 0 },
    ],
    D: [
      { destination: "Network 1", nextHop: "B", metric: 2 },
      { destination: "Network 2", nextHop: "B", metric: 1 },
      { destination: "Network 3", nextHop: "B", metric: 1 },
      { destination: "Network 4", nextHop: "Direct", metric: 0 },
      { destination: "Network 5", nextHop: "C", metric: 1 },
      { destination: "Network 6", nextHop: "Direct", metric: 0 },
    ],
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

    // Set canvas dimensions
    const width = canvas.width
    const height = canvas.height

    // Define router positions
    const routers = {
      A: { x: width * 0.25, y: height * 0.3, networks: ["Network 1", "Network 2"] },
      B: { x: width * 0.75, y: height * 0.3, networks: ["Network 2", "Network 3", "Network 4"] },
      C: { x: width * 0.25, y: height * 0.7, networks: ["Network 5", "Network 6"] },
      D: { x: width * 0.75, y: height * 0.7, networks: ["Network 4", "Network 6"] },
    }

    // Draw connections
    ctx.lineWidth = 2
    ctx.strokeStyle = "#888"

    // A to B
    ctx.beginPath()
    ctx.moveTo(routers.A.x, routers.A.y)
    ctx.lineTo(routers.B.x, routers.B.y)
    ctx.stroke()
    ctx.fillStyle = "#666"
    ctx.fillText("Network 2", (routers.A.x + routers.B.x) / 2 - 30, (routers.A.y + routers.B.y) / 2 - 10)

    // A to C
    ctx.beginPath()
    ctx.moveTo(routers.A.x, routers.A.y)
    ctx.lineTo(routers.C.x, routers.C.y)
    ctx.stroke()
    ctx.fillText("Network 5", (routers.A.x + routers.C.x) / 2 - 30, (routers.A.y + routers.C.y) / 2)

    // B to D
    ctx.beginPath()
    ctx.moveTo(routers.B.x, routers.B.y)
    ctx.lineTo(routers.D.x, routers.D.y)
    ctx.stroke()
    ctx.fillText("Network 4", (routers.B.x + routers.D.x) / 2 + 10, (routers.B.y + routers.D.y) / 2)

    // C to D
    ctx.beginPath()
    ctx.moveTo(routers.C.x, routers.C.y)
    ctx.lineTo(routers.D.x, routers.D.y)
    ctx.stroke()
    ctx.fillText("Network 6", (routers.C.x + routers.D.x) / 2 - 30, (routers.C.y + routers.D.y) / 2)

    // Draw routers
    Object.entries(routers).forEach(([name, router]) => {
      const isSelected = name === selectedRouter
      const isActive = animationStep > 0 && ["A", "B", "C", "D"].indexOf(name) < animationStep

      // Router circle
      ctx.beginPath()
      ctx.arc(router.x, router.y, 25, 0, Math.PI * 2)
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

      // Router label
      ctx.fillStyle = isSelected || isActive ? "#ffffff" : "#1f2937"
      ctx.font = "bold 16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`R${name}`, router.x, router.y)

      // Network labels
      ctx.font = "12px Arial"
      ctx.fillStyle = "#1f2937"
      if (name === "A") {
        ctx.textAlign = "right"
        ctx.fillText("Network 1", router.x - 35, router.y - 15)
      } else if (name === "B") {
        ctx.textAlign = "left"
        ctx.fillText("Network 3", router.x + 35, router.y - 15)
      }
    })

    // Draw animation effects
    if (animationStep > 0) {
      // Simulate routing updates being sent
      const sourceRouter = Object.values(routers)[animationStep - 1]
      const destinations = Object.entries(routers)
        .filter(([name]) => name !== Object.keys(routers)[animationStep - 1])
        .map(([_, router]) => router)

      destinations.forEach((destRouter) => {
        // Draw update packet
        const packetX = sourceRouter.x + (destRouter.x - sourceRouter.x) * (animationStep % 1)
        const packetY = sourceRouter.y + (destRouter.y - sourceRouter.y) * (animationStep % 1)

        ctx.beginPath()
        ctx.arc(packetX, packetY, 8, 0, Math.PI * 2)
        ctx.fillStyle = "#ef4444" // Red for update packets
        ctx.fill()
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
          return 0
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
              <span className="text-sm font-medium">Dynamic Vector Routing</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/topics/link-state-routing">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dynamic Vector Routing</h1>
            <p className="text-muted-foreground">
              Understanding distance vector routing protocols and their operation.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Introduction to Dynamic Routing</h2>
              <p>
                Dynamic routing is a networking technique where routers exchange information about network destinations
                and adapt their routing decisions based on changing network conditions. Unlike static routing, where
                routes are manually configured and fixed, dynamic routing protocols automatically discover network
                topology and determine the best paths for data transmission.
              </p>
              <p>
                Dynamic routing protocols are essential for large networks where manual configuration would be
                impractical, and for networks where redundancy and automatic failover are required. These protocols
                enable networks to scale efficiently and adapt to changes such as link failures, congestion, or the
                addition of new network segments.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Distance Vector Routing Fundamentals</h2>
              <p>
                Distance Vector Routing is one of the two primary approaches to dynamic routing (the other being Link
                State Routing). In distance vector protocols, routers exchange information about their known
                destinations and the "distance" or cost to reach them. Each router maintains a routing table containing
                the best known distance to each network and the next hop router to use to reach that network.
              </p>
              <p>The key characteristics of distance vector routing include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Distributed Computation:</strong> Each router calculates its own routing table based on
                  information received from its neighbors.
                </li>
                <li>
                  <strong>Periodic Updates:</strong> Routers periodically share their entire routing tables with
                  directly connected neighbors.
                </li>
                <li>
                  <strong>Bellman-Ford Algorithm:</strong> Uses the Bellman-Ford algorithm to calculate the shortest
                  paths to destinations.
                </li>
                <li>
                  <strong>Limited Knowledge:</strong> Routers have knowledge only of their neighbors and the distances
                  advertised by those neighbors, not the entire network topology.
                </li>
                <li>
                  <strong>Hop Count or Other Metrics:</strong> Uses metrics like hop count, bandwidth, delay, or
                  reliability to determine the best path.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How Distance Vector Routing Works</h2>
              <p>The basic operation of distance vector routing protocols follows these steps:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Initialization:</strong> Each router initializes its routing table with information about
                  directly connected networks (distance = 0).
                </li>
                <li>
                  <strong>Exchange:</strong> Routers exchange their routing tables with directly connected neighbors.
                </li>
                <li>
                  <strong>Update:</strong> Upon receiving routing information from a neighbor, a router adds the
                  neighbor's advertised distance to the cost of reaching that neighbor.
                </li>
                <li>
                  <strong>Compare:</strong> If the new calculated distance to a destination is less than the current
                  known distance, the router updates its routing table with the new distance and next hop.
                </li>
                <li>
                  <strong>Propagate:</strong> In the next update cycle, the router shares its updated routing table with
                  its neighbors, propagating the new information throughout the network.
                </li>
              </ol>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md my-6">
                <h3 className="text-lg font-medium mb-4 text-center">Distance Vector Routing Simulation</h3>
                <div className="flex justify-center mb-4">
                  <canvas
                    ref={canvasRef}
                    width={600}
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
                  <h4 className="font-medium mb-2">Routing Table for Router {selectedRouter}</h4>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Destination</TableHead>
                          <TableHead>Next Hop</TableHead>
                          <TableHead>Metric</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {routingTables[selectedRouter as keyof typeof routingTables].map((entry, index) => (
                          <TableRow key={index}>
                            <TableCell>{entry.destination}</TableCell>
                            <TableCell>{entry.nextHop}</TableCell>
                            <TableCell>{entry.metric}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Common Distance Vector Routing Protocols</h2>
              <Tabs defaultValue="rip" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="rip">RIP</TabsTrigger>
                  <TabsTrigger value="igrp">IGRP/EIGRP</TabsTrigger>
                  <TabsTrigger value="bgp">BGP</TabsTrigger>
                </TabsList>
                <TabsContent value="rip" className="space-y-4 mt-6">
                  <h3 className="text-xl font-medium">Routing Information Protocol (RIP)</h3>
                  <p>
                    RIP is one of the oldest distance vector routing protocols, first defined in RFC 1058 (1988). It's
                    simple to configure and understand but has limitations that make it less suitable for large
                    networks.
                  </p>
                  <Card>
                    <CardHeader>
                      <CardTitle>RIP Characteristics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Key Features</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Uses hop count as its only metric (maximum 15 hops)</li>
                          <li>Updates sent every 30 seconds (complete routing table)</li>
                          <li>Simple implementation with minimal configuration</li>
                          <li>Supports split horizon, poison reverse, and triggered updates</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Versions</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>
                            <strong>RIPv1:</strong> Classful routing protocol (no subnet mask in updates)
                          </li>
                          <li>
                            <strong>RIPv2:</strong> Classless routing with subnet masks, supports VLSM and
                            authentication
                          </li>
                          <li>
                            <strong>RIPng:</strong> RIP next generation for IPv6 networks
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Limitations</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Slow convergence (can take minutes in large networks)</li>
                          <li>Limited scalability (15 hop maximum)</li>
                          <li>Bandwidth intensive due to periodic full table updates</li>
                          <li>Simplistic metric doesn't account for link quality or bandwidth</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <h4 className="text-lg font-medium mt-6">RIP Configuration Example (Cisco IOS)</h4>
                  <div className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`Router> enable
Router# configure terminal
Router(config)# router rip
Router(config-router)# version 2
Router(config-router)# network 192.168.1.0
Router(config-router)# network 192.168.2.0
Router(config-router)# no auto-summary
Router(config-router)# exit`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="igrp" className="space-y-4 mt-6">
                  <h3 className="text-xl font-medium">IGRP and EIGRP</h3>
                  <p>
                    Interior Gateway Routing Protocol (IGRP) and its successor Enhanced IGRP (EIGRP) are Cisco
                    proprietary distance vector routing protocols designed to overcome the limitations of RIP.
                  </p>
                  <Card>
                    <CardHeader>
                      <CardTitle>EIGRP Characteristics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Key Features</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Hybrid protocol with features of both distance vector and link state protocols</li>
                          <li>Uses Diffusing Update Algorithm (DUAL) for loop-free path selection</li>
                          <li>Supports unequal-cost load balancing</li>
                          <li>Partial updates sent only when changes occur</li>
                          <li>Maintains a topology table in addition to the routing table</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Composite Metric</h4>
                        <p>EIGRP uses a composite metric based on:</p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Bandwidth (minimum bandwidth along the path)</li>
                          <li>Delay (cumulative delay along the path)</li>
                          <li>Reliability (worst reliability along the path) - optional</li>
                          <li>Load (worst load along the path) - optional</li>
                          <li>MTU (smallest MTU along the path) - not used in metric calculation</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Advantages</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Fast convergence</li>
                          <li>Efficient use of bandwidth (partial, triggered updates)</li>
                          <li>Support for VLSM and CIDR</li>
                          <li>No practical hop count limitation</li>
                          <li>Support for multiple network layer protocols (IPv4, IPv6)</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <h4 className="text-lg font-medium mt-6">EIGRP Configuration Example (Cisco IOS)</h4>
                  <div className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`Router> enable
Router# configure terminal
Router(config)# router eigrp 100
Router(config-router)# network 192.168.1.0
Router(config-router)# network 192.168.2.0
Router(config-router)# no auto-summary
Router(config-router)# exit`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="bgp" className="space-y-4 mt-6">
                  <h3 className="text-xl font-medium">Border Gateway Protocol (BGP)</h3>
                  <p>
                    BGP is the routing protocol that powers the internet. While it's often classified as a path vector
                    protocol (an extension of distance vector), it shares many characteristics with distance vector
                    protocols.
                  </p>
                  <Card>
                    <CardHeader>
                      <CardTitle>BGP Characteristics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Key Features</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Designed for routing between autonomous systems (AS)</li>
                          <li>Uses TCP (port 179) for reliable communication</li>
                          <li>Path vector protocol that includes the entire AS path in route advertisements</li>
                          <li>Policy-based routing with extensive filtering capabilities</li>
                          <li>Incremental updates sent only when changes occur</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">BGP Path Selection</h4>
                        <p>BGP uses a complex path selection algorithm with multiple criteria:</p>
                        <ol className="list-decimal pl-6 space-y-1">
                          <li>Highest weight (Cisco-specific)</li>
                          <li>Highest local preference</li>
                          <li>Locally originated routes</li>
                          <li>Shortest AS path</li>
                          <li>Lowest origin type</li>
                          <li>Lowest MED (Multi-Exit Discriminator)</li>
                          <li>eBGP over iBGP</li>
                          <li>Lowest IGP metric to next hop</li>
                          <li>Oldest route for eBGP paths</li>
                          <li>Lowest router ID</li>
                          <li>Lowest neighbor address</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Types of BGP Sessions</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>
                            <strong>iBGP (internal BGP):</strong> Between routers in the same AS
                          </li>
                          <li>
                            <strong>eBGP (external BGP):</strong> Between routers in different ASes
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <h4 className="text-lg font-medium mt-6">BGP Configuration Example (Cisco IOS)</h4>
                  <div className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`Router> enable
Router# configure terminal
Router(config)# router bgp 65000
Router(config-router)# neighbor 192.168.1.2 remote-as 65001
Router(config-router)# network 192.168.100.0 mask 255.255.255.0
Router(config-router)# exit`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Challenges in Distance Vector Routing</h2>
              <p>
                Distance vector routing protocols face several challenges that can affect their performance and
                reliability. Understanding these issues and their solutions is crucial for network administrators.
              </p>

              <h3 className="text-xl font-medium mt-6">Routing Loops</h3>
              <p>
                Routing loops occur when packets circulate continuously between two or more routers due to inconsistent
                routing information. This is one of the most significant challenges in distance vector routing.
              </p>
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle>Count to Infinity Problem</CardTitle>
                  <CardDescription>
                    When a network becomes unreachable, routers may continuously increment the metric for that network
                    based on outdated information from neighbors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Consider this scenario:</p>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Router A has a route to Network X via Router B with a metric of 1.</li>
                    <li>Router B has a route to Network X via Router C with a metric of 1.</li>
                    <li>Router C has a direct connection to Network X with a metric of 0.</li>
                    <li>If Network X goes down, Router C will detect this and remove it from its routing table.</li>
                    <li>
                      However, before Router C can inform Router B, Router B sends an update to Router A indicating it
                      can still reach Network X.
                    </li>
                    <li>
                      Router C receives an update from Router B claiming it can reach Network X (via Router C itself),
                      so Router C adds this route back with an increased metric.
                    </li>
                    <li>
                      This process continues with metrics incrementing until they reach infinity (defined maximum).
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <h3 className="text-xl font-medium mt-6">Solutions to Routing Loops</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Split Horizon:</strong> Prevents a router from advertising a route back to the neighbor from
                  which it learned that route.
                </li>
                <li>
                  <strong>Route Poisoning:</strong> When a router detects a failed route, it advertises that route with
                  an infinite metric.
                </li>
                <li>
                  <strong>Poison Reverse:</strong> A router advertises routes learned from a neighbor back to that
                  neighbor but with an infinite metric.
                </li>
                <li>
                  <strong>Hold-down Timers:</strong> After learning that a route is down, a router ignores any updates
                  for that route for a specified period.
                </li>
                <li>
                  <strong>Triggered Updates:</strong> Routers send updates immediately when a route's status changes,
                  rather than waiting for the next scheduled update.
                </li>
                <li>
                  <strong>Defining Maximum Metrics:</strong> Setting a finite value for "infinity" (e.g., 16 hops in
                  RIP) to prevent endless counting.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                Numerical Example: RIP Routing Table Calculation
              </h2>
              <p>
                Let's work through a numerical example to understand how distance vector routing protocols calculate
                their routing tables. We'll use a simple network with four routers (A, B, C, and D) and six networks.
              </p>

              <div className="space-y-4 mt-4">
                <h3 className="text-xl font-medium">Initial State</h3>
                <p>Each router knows only about its directly connected networks:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Router A Initial Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Network</TableHead>
                            <TableHead>Next Hop</TableHead>
                            <TableHead>Metric</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Network 1</TableCell>
                            <TableCell>Direct</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Network 2</TableCell>
                            <TableCell>Direct</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Network 5</TableCell>
                            <TableCell>Direct</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Router B Initial Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Network</TableHead>
                            <TableHead>Next Hop</TableHead>
                            <TableHead>Metric</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Network 2</TableCell>
                            <TableCell>Direct</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Network 3</TableCell>
                            <TableCell>Direct</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Network 4</TableCell>
                            <TableCell>Direct</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Router C Initial Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Network</TableHead>
                            <TableHead>Next Hop</TableHead>
                            <TableHead>Metric</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Network 5</TableCell>
                            <TableCell>Direct</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Network 6</TableCell>
                            <TableCell>Direct</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Router D Initial Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Network</TableHead>
                            <TableHead>Next Hop</TableHead>
                            <TableHead>Metric</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Network 4</TableCell>
                            <TableCell>Direct</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Network 6</TableCell>
                            <TableCell>Direct</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-xl font-medium mt-6">First Exchange</h3>
                <p>
                  After the first exchange of routing tables, each router learns about networks that are one hop away:
                </p>
                <Card className="mt-2">
                  <CardHeader>
                    <CardTitle>Router A Updated Table</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Network</TableHead>
                          <TableHead>Next Hop</TableHead>
                          <TableHead>Metric</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Network 1</TableCell>
                          <TableCell>Direct</TableCell>
                          <TableCell>0</TableCell>
                          <TableCell>Unchanged</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Network 2</TableCell>
                          <TableCell>Direct</TableCell>
                          <TableCell>0</TableCell>
                          <TableCell>Unchanged</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Network 3</TableCell>
                          <TableCell>Router B</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>Learned from B</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Network 4</TableCell>
                          <TableCell>Router B</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>Learned from B</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Network 5</TableCell>
                          <TableCell>Direct</TableCell>
                          <TableCell>0</TableCell>
                          <TableCell>Unchanged</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Network 6</TableCell>
                          <TableCell>Router C</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>Learned from C</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <h3 className="text-xl font-medium mt-6">Convergence</h3>
                <p>
                  After several exchanges, the routing tables converge to their final state. Let's examine Router A's
                  final routing table:
                </p>
                <Card className="mt-2">
                  <CardHeader>
                    <CardTitle>Router A Final Converged Table</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Network</TableHead>
                          <TableHead>Next Hop</TableHead>
                          <TableHead>Metric</TableHead>
                          <TableHead>Path</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Network 1</TableCell>
                          <TableCell>Direct</TableCell>
                          <TableCell>0</TableCell>
                          <TableCell>A</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Network 2</TableCell>
                          <TableCell>Direct</TableCell>
                          <TableCell>0</TableCell>
                          <TableCell>A</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Network 3</TableCell>
                          <TableCell>Router B</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>A → B</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Network 4</TableCell>
                          <TableCell>Router B</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>A → B</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Network 5</TableCell>
                          <TableCell>Direct</TableCell>
                          <TableCell>0</TableCell>
                          <TableCell>A</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Network 6</TableCell>
                          <TableCell>Router C</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>A → C</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Advantages and Disadvantages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advantages of Distance Vector Routing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Simplicity:</strong> Easy to understand, implement, and configure, especially in small
                        networks.
                      </li>
                      <li>
                        <strong>Low Processing Requirements:</strong> Requires less CPU and memory compared to link
                        state protocols.
                      </li>
                      <li>
                        <strong>Distributed Computation:</strong> No single router needs to have a complete view of the
                        network topology.
                      </li>
                      <li>
                        <strong>Automatic Adaptation:</strong> Automatically adapts to network changes without
                        administrator intervention.
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Disadvantages of Distance Vector Routing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Slow Convergence:</strong> Can take time to converge after network changes, especially
                        in large networks.
                      </li>
                      <li>
                        <strong>Routing Loops:</strong> Susceptible to routing loops without proper countermeasures.
                      </li>
                      <li>
                        <strong>Bandwidth Consumption:</strong> Periodic updates can consume significant bandwidth in
                        large networks.
                      </li>
                      <li>
                        <strong>Limited Scalability:</strong> Not ideal for very large networks due to convergence
                        issues and bandwidth requirements.
                      </li>
                      <li>
                        <strong>Limited View:</strong> Routers have limited knowledge of the network topology, making
                        optimal path selection challenging.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Summary</h2>
              <p>
                Distance Vector Routing is a fundamental approach to dynamic routing where routers exchange information
                about known destinations and the cost to reach them. Key points to remember:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Routers share their routing tables with directly connected neighbors and update their own tables based
                  on received information.
                </li>
                <li>
                  The Bellman-Ford algorithm is used to calculate the shortest paths to destinations based on metrics
                  like hop count or more complex composite metrics.
                </li>
                <li>
                  Common distance vector protocols include RIP, IGRP/EIGRP, and BGP (though BGP is more accurately a
                  path vector protocol).
                </li>
                <li>
                  Challenges like routing loops and slow convergence are addressed through mechanisms like split
                  horizon, route poisoning, and triggered updates.
                </li>
                <li>
                  Distance vector protocols are simpler but generally less scalable than link state protocols for large
                  networks.
                </li>
              </ul>
              <p>
                Understanding distance vector routing is essential for network administrators and engineers, as these
                protocols continue to play important roles in modern networks, from small office networks using RIP to
                the global internet using BGP.
              </p>
            </section>
          </div>

          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <Button variant="outline" size="sm" asChild>
              <Link href="/topics/vlsm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Topic
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/topics/link-state-routing">
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
