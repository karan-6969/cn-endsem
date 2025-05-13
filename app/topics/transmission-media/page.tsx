"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TransmissionMediaPage() {
  const headerRef = useRef(null)
  const contentRef = useRef(null)

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

    // Media cards animation
    gsap.from(".media-card", {
      scale: 0.9,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".media-cards",
        start: "top 80%",
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

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
              <span className="text-sm font-medium">Transmission Media</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/topics/data-link-vs-network">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Different Types of Transmission Media</h1>
            <p className="text-muted-foreground">
              Exploring guided and unguided transmission media used in networking.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Introduction to Transmission Media</h2>
              <p>
                Transmission media are the physical or wireless pathways that carry data between devices in a network.
                They form the backbone of all communication networks, from local area networks (LANs) to the global
                internet infrastructure. The choice of transmission medium significantly impacts a network's
                performance, reliability, cost, and scalability.
              </p>
              <p>Transmission media are broadly classified into two main categories:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Guided Media (Wired):</strong> Physical media where signals are confined to and guided along a
                  solid medium.
                </li>
                <li>
                  <strong>Unguided Media (Wireless):</strong> Media that transmit signals through air or space without
                  using a physical conductor.
                </li>
              </ol>
            </section>

            <section className="content-section">
              <Tabs defaultValue="guided" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="guided">Guided Media</TabsTrigger>
                  <TabsTrigger value="unguided">Unguided Media</TabsTrigger>
                </TabsList>
                <TabsContent value="guided" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Guided (Wired) Transmission Media</h2>
                    <p>
                      Guided media consist of physical cables that guide the data signals along a specific path. These
                      media offer more control over transmission characteristics and are generally more secure than
                      unguided media.
                    </p>
                  </div>

                  <div className="media-cards grid gap-6 sm:grid-cols-2">
                    <Card className="media-card">
                      <CardHeader>
                        <CardTitle>Twisted Pair Cable</CardTitle>
                        <CardDescription>Most common type of network cabling</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>
                          Consists of pairs of insulated copper wires twisted together to reduce electromagnetic
                          interference.
                        </p>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Types:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>
                              <strong>UTP (Unshielded Twisted Pair):</strong> No additional shielding
                            </li>
                            <li>
                              <strong>STP (Shielded Twisted Pair):</strong> Additional metal shielding
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Categories:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>
                              <strong>Cat 5e:</strong> Up to 1 Gbps, 100 MHz bandwidth
                            </li>
                            <li>
                              <strong>Cat 6:</strong> Up to 10 Gbps, 250 MHz bandwidth
                            </li>
                            <li>
                              <strong>Cat 6a:</strong> Up to 10 Gbps, 500 MHz bandwidth
                            </li>
                            <li>
                              <strong>Cat 8:</strong> Up to 40 Gbps, 2000 MHz bandwidth
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="media-card">
                      <CardHeader>
                        <CardTitle>Coaxial Cable</CardTitle>
                        <CardDescription>High-frequency transmission medium</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>
                          Consists of a central copper conductor surrounded by insulating material, a metallic shield,
                          and an outer jacket.
                        </p>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Types:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>
                              <strong>Baseband:</strong> Used for digital transmission (e.g., Ethernet)
                            </li>
                            <li>
                              <strong>Broadband:</strong> Used for analog transmission (e.g., cable TV)
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Advantages:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Higher bandwidth than twisted pair</li>
                            <li>Better immunity to electromagnetic interference</li>
                            <li>Longer maximum segment lengths</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="media-card">
                      <CardHeader>
                        <CardTitle>Fiber Optic Cable</CardTitle>
                        <CardDescription>Highest performance transmission medium</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>Transmits data as pulses of light through thin strands of glass or plastic fiber.</p>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Types:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>
                              <strong>Single-mode:</strong> Narrow core, long distance, higher bandwidth
                            </li>
                            <li>
                              <strong>Multi-mode:</strong> Wider core, shorter distance, lower cost
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Advantages:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Extremely high bandwidth (terabits per second)</li>
                            <li>Immune to electromagnetic interference</li>
                            <li>Very low signal attenuation (can span many kilometers)</li>
                            <li>Enhanced security (difficult to tap)</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="media-card">
                      <CardHeader>
                        <CardTitle>Power Line Communication</CardTitle>
                        <CardDescription>Data transmission over electrical power lines</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>Uses existing electrical power lines to transmit data signals.</p>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Applications:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Home networking (HomePlug standard)</li>
                            <li>Smart grid communications</li>
                            <li>Broadband over power lines (BPL)</li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Limitations:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Susceptible to noise and interference</li>
                            <li>Variable performance based on power line conditions</li>
                            <li>Limited bandwidth compared to dedicated media</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4 mt-8">
                    <h3 className="text-xl font-medium">Comparison of Guided Media</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border p-2 text-left">Parameter</th>
                            <th className="border p-2 text-left">Twisted Pair</th>
                            <th className="border p-2 text-left">Coaxial Cable</th>
                            <th className="border p-2 text-left">Fiber Optic</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-2 font-medium">Bandwidth</td>
                            <td className="border p-2">Up to 10 Gbps</td>
                            <td className="border p-2">Up to 10 Gbps</td>
                            <td className="border p-2">Up to several Tbps</td>
                          </tr>
                          <tr>
                            <td className="border p-2 font-medium">Distance</td>
                            <td className="border p-2">Up to 100m</td>
                            <td className="border p-2">Up to 500m</td>
                            <td className="border p-2">Up to 100km+</td>
                          </tr>
                          <tr>
                            <td className="border p-2 font-medium">Cost</td>
                            <td className="border p-2">Low</td>
                            <td className="border p-2">Medium</td>
                            <td className="border p-2">High</td>
                          </tr>
                          <tr>
                            <td className="border p-2 font-medium">EMI Immunity</td>
                            <td className="border p-2">Low</td>
                            <td className="border p-2">Medium</td>
                            <td className="border p-2">Complete</td>
                          </tr>
                          <tr>
                            <td className="border p-2 font-medium">Security</td>
                            <td className="border p-2">Low</td>
                            <td className="border p-2">Medium</td>
                            <td className="border p-2">High</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="unguided" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Unguided (Wireless) Transmission Media</h2>
                    <p>
                      Unguided media transmit signals through air or space without using a physical conductor. These
                      media offer mobility and flexibility but are more susceptible to interference and security
                      concerns.
                    </p>
                  </div>

                  <div className="media-cards grid gap-6 sm:grid-cols-2">
                    <Card className="media-card">
                      <CardHeader>
                        <CardTitle>Radio Waves</CardTitle>
                        <CardDescription>Omnidirectional wireless transmission</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>Electromagnetic waves with frequencies ranging from 3 kHz to 1 GHz.</p>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Applications:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>AM/FM radio broadcasting</li>
                            <li>Mobile cellular networks</li>
                            <li>Wireless LANs (Wi-Fi)</li>
                            <li>Bluetooth devices</li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Characteristics:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Can penetrate walls and buildings</li>
                            <li>Susceptible to interference from other radio sources</li>
                            <li>Omnidirectional propagation</li>
                            <li>Range varies based on frequency and power</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="media-card">
                      <CardHeader>
                        <CardTitle>Microwave</CardTitle>
                        <CardDescription>Directional high-frequency transmission</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>High-frequency radio waves (1 GHz to 300 GHz) that travel in straight lines.</p>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Types:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>
                              <strong>Terrestrial Microwave:</strong> Point-to-point communication using antennas
                            </li>
                            <li>
                              <strong>Satellite Microwave:</strong> Communication via satellites in orbit
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Characteristics:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Line-of-sight transmission</li>
                            <li>High bandwidth capacity</li>
                            <li>Affected by weather conditions (rain fade)</li>
                            <li>Used for long-distance communication</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="media-card">
                      <CardHeader>
                        <CardTitle>Infrared</CardTitle>
                        <CardDescription>Short-range line-of-sight transmission</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>Electromagnetic waves with frequencies just below visible light (300 GHz to 400 THz).</p>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Applications:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Remote controls</li>
                            <li>Short-range data communication</li>
                            <li>IrDA (Infrared Data Association) devices</li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Characteristics:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Cannot penetrate walls or solid objects</li>
                            <li>Immune to radio frequency interference</li>
                            <li>Secure due to confinement within a room</li>
                            <li>Limited range (typically 1-10 meters)</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="media-card">
                      <CardHeader>
                        <CardTitle>Light Waves</CardTitle>
                        <CardDescription>Free-space optical communication</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>Uses visible or near-visible light to transmit data through free space.</p>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Applications:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Free-space optical communication (FSO)</li>
                            <li>Building-to-building network links</li>
                            <li>Last-mile connectivity</li>
                            <li>Li-Fi (Light Fidelity) technology</li>
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Characteristics:</h4>
                          <ul className="list-disc pl-5 text-sm">
                            <li>Very high bandwidth potential</li>
                            <li>Line-of-sight transmission</li>
                            <li>Affected by atmospheric conditions (fog, rain)</li>
                            <li>Secure due to narrow beam width</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4 mt-8">
                    <h3 className="text-xl font-medium">Comparison of Unguided Media</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border p-2 text-left">Parameter</th>
                            <th className="border p-2 text-left">Radio Waves</th>
                            <th className="border p-2 text-left">Microwave</th>
                            <th className="border p-2 text-left">Infrared</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-2 font-medium">Frequency Range</td>
                            <td className="border p-2">3 kHz - 1 GHz</td>
                            <td className="border p-2">1 GHz - 300 GHz</td>
                            <td className="border p-2">300 GHz - 400 THz</td>
                          </tr>
                          <tr>
                            <td className="border p-2 font-medium">Directionality</td>
                            <td className="border p-2">Omnidirectional</td>
                            <td className="border p-2">Directional</td>
                            <td className="border p-2">Highly directional</td>
                          </tr>
                          <tr>
                            <td className="border p-2 font-medium">Penetration</td>
                            <td className="border p-2">Can penetrate walls</td>
                            <td className="border p-2">Limited penetration</td>
                            <td className="border p-2">Cannot penetrate objects</td>
                          </tr>
                          <tr>
                            <td className="border p-2 font-medium">Weather Effects</td>
                            <td className="border p-2">Minimal</td>
                            <td className="border p-2">Significant</td>
                            <td className="border p-2">Significant</td>
                          </tr>
                          <tr>
                            <td className="border p-2 font-medium">Security</td>
                            <td className="border p-2">Low</td>
                            <td className="border p-2">Medium</td>
                            <td className="border p-2">High</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Factors Affecting Transmission Media Selection</h2>
              <p>Choosing the appropriate transmission medium for a network involves considering several factors:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Bandwidth Requirements:</strong> The amount of data that needs to be transmitted per unit
                  time.
                </li>
                <li>
                  <strong>Distance:</strong> The maximum length between network devices.
                </li>
                <li>
                  <strong>Environment:</strong> Physical constraints, electromagnetic interference, and security
                  concerns.
                </li>
                <li>
                  <strong>Cost:</strong> Budget constraints for installation and maintenance.
                </li>
                <li>
                  <strong>Scalability:</strong> Future growth potential of the network.
                </li>
                <li>
                  <strong>Reliability:</strong> Required uptime and fault tolerance.
                </li>
                <li>
                  <strong>Security:</strong> Protection against unauthorized access and eavesdropping.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Emerging Transmission Technologies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>5G and Beyond:</strong> Ultra-high-speed wireless communication with reduced latency.
                </li>
                <li>
                  <strong>Li-Fi (Light Fidelity):</strong> Data transmission using visible light communication.
                </li>
                <li>
                  <strong>Quantum Communication:</strong> Leveraging quantum properties for secure data transmission.
                </li>
                <li>
                  <strong>Hollow-Core Fiber:</strong> Fiber optic cables with air-filled cores for faster light
                  propagation.
                </li>
                <li>
                  <strong>Terahertz Communication:</strong> Using frequencies between microwave and infrared for
                  high-bandwidth wireless.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Summary</h2>
              <p>
                Transmission media form the physical foundation of all communication networks. The choice between guided
                (wired) and unguided (wireless) media depends on specific requirements including bandwidth, distance,
                environment, cost, and security considerations.
              </p>
              <p>
                While traditional media like twisted pair cables continue to dominate local area networks, fiber optic
                technology has become the backbone of long-distance and high-bandwidth communication. Wireless
                technologies continue to evolve rapidly, offering increasing mobility and flexibility for modern network
                applications.
              </p>
              <p>
                Understanding the characteristics, advantages, and limitations of different transmission media is
                essential for designing efficient, reliable, and cost-effective network infrastructures.
              </p>
            </section>
          </div>

          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <Button variant="outline" size="sm" asChild>
              <Link href="/topics/bus-topology">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Topic
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/topics/data-link-vs-network">
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
