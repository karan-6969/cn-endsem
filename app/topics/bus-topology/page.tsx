"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function BusTopologyPage() {
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const diagramRef = useRef(null)

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

    // Diagram animation
    const diagram = diagramRef.current
    if (diagram) {
      // Animate the bus line
      gsap.from(".bus-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: diagram,
          start: "top 70%",
        },
      })

      // Animate the devices
      gsap.from(".device", {
        y: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "bounce",
        scrollTrigger: {
          trigger: diagram,
          start: "top 70%",
        },
      })

      // Animate the terminators
      gsap.from(".terminator", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 1.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: diagram,
          start: "top 70%",
        },
      })
    }

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
              <span className="text-sm font-medium">Bus Topology</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/transmission-media">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Bus Topology</h1>
            <p className="text-muted-foreground">
              A fundamental network topology where all devices connect to a single cable.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Introduction to Bus Topology</h2>
              <p>
                Bus topology is one of the simplest and most fundamental network topologies in computer networking. In
                this arrangement, all devices (computers, servers, printers, etc.) are connected to a single
                communication line called a bus or backbone. This central cable serves as the shared medium for data
                transmission between all connected devices.
              </p>
              <p>
                The bus topology was widely used in early Ethernet networks, particularly in the 10BASE2 (ThinNet) and
                10BASE5 (ThickNet) implementations. While less common in modern networks, understanding bus topology
                provides essential foundational knowledge for networking concepts.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How Bus Topology Works</h2>
              <p>In a bus topology, data transmission follows these key principles:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Broadcast Communication:</strong> When a device sends data, the signal travels along the
                  entire length of the bus in both directions.
                </li>
                <li>
                  <strong>Signal Reception:</strong> All devices on the network receive the signal, but only the
                  intended recipient (identified by its address) processes the data.
                </li>
                <li>
                  <strong>Terminators:</strong> Both ends of the bus cable must have terminators to absorb signals when
                  they reach the end, preventing signal reflection and interference.
                </li>
                <li>
                  <strong>Taps:</strong> Devices connect to the bus using T-connectors or vampire taps, creating a
                  physical connection to the shared medium.
                </li>
              </ul>

              <div ref={diagramRef} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md my-6">
                <h3 className="text-lg font-medium mb-4 text-center">Bus Topology Diagram</h3>
                <div className="relative h-64 w-full">
                  {/* Main bus line */}
                  <div className="bus-line absolute top-1/2 left-0 right-0 h-2 bg-primary transform -translate-y-1/2"></div>

                  {/* Terminators */}
                  <div className="terminator absolute top-1/2 left-0 w-4 h-8 bg-red-500 rounded transform -translate-y-1/2"></div>
                  <div className="terminator absolute top-1/2 right-0 w-4 h-8 bg-red-500 rounded transform -translate-y-1/2"></div>

                  {/* Devices */}
                  <div className="device absolute top-0 left-1/6 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-md flex items-center justify-center mb-2">
                      <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="w-1 h-12 bg-slate-400"></div>
                  </div>

                  <div className="device absolute top-0 left-2/6 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-md flex items-center justify-center mb-2">
                      <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="w-1 h-12 bg-slate-400"></div>
                  </div>

                  <div className="device absolute top-0 left-3/6 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-md flex items-center justify-center mb-2">
                      <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="w-1 h-12 bg-slate-400"></div>
                  </div>

                  <div className="device absolute top-0 left-4/6 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-md flex items-center justify-center mb-2">
                      <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="w-1 h-12 bg-slate-400"></div>
                  </div>

                  <div className="device absolute top-0 left-5/6 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-md flex items-center justify-center mb-2">
                      <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="w-1 h-12 bg-slate-400"></div>
                  </div>
                </div>
                <div className="text-sm text-center text-muted-foreground mt-4">
                  A simple bus topology with five devices connected to a single backbone cable with terminators at both
                  ends.
                </div>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Advantages of Bus Topology</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Simplicity:</strong> Easy to understand, implement, and extend for small networks.
                </li>
                <li>
                  <strong>Cost-Effective:</strong> Requires less cabling than other topologies like star or mesh.
                </li>
                <li>
                  <strong>Easy Installation:</strong> New devices can be added by simply tapping into the main cable.
                </li>
                <li>
                  <strong>Well-Suited for Small Networks:</strong> Works efficiently for limited-scale implementations.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Disadvantages of Bus Topology</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Limited Scalability:</strong> Performance degrades significantly as more devices are added.
                </li>
                <li>
                  <strong>Single Point of Failure:</strong> A break in the main cable can bring down the entire network.
                </li>
                <li>
                  <strong>Collision Domain:</strong> All devices share the same collision domain, leading to potential
                  data collisions and reduced efficiency.
                </li>
                <li>
                  <strong>Difficult Troubleshooting:</strong> Identifying the exact location of a cable fault can be
                  challenging.
                </li>
                <li>
                  <strong>Limited Distance:</strong> Signal attenuation restricts the maximum length of the bus cable.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Practical Applications</h2>
              <p>
                While bus topology has largely been replaced by star and hybrid topologies in modern networks, it still
                finds applications in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Small, temporary networks:</strong> Quick setup for temporary needs.
                </li>
                <li>
                  <strong>Industrial control systems:</strong> Some specialized industrial networks still use bus-based
                  designs.
                </li>
                <li>
                  <strong>Automotive networks:</strong> Controller Area Network (CAN) bus in vehicles.
                </li>
                <li>
                  <strong>Educational environments:</strong> Teaching fundamental networking concepts.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Technical Considerations</h2>
              <h3 className="text-xl font-medium">Collision Detection and CSMA/CD</h3>
              <p>
                Bus topologies typically employ Carrier Sense Multiple Access with Collision Detection (CSMA/CD) to
                manage data transmission. This protocol works as follows:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Before transmitting, a device listens to the bus to check if it's idle (Carrier Sense).</li>
                <li>If the bus is idle, the device begins transmitting data.</li>
                <li>If two devices transmit simultaneously, a collision occurs.</li>
                <li>Devices detect the collision (Collision Detection) and stop transmitting.</li>
                <li>Each device waits for a random backoff time before attempting to retransmit.</li>
              </ol>

              <h3 className="text-xl font-medium mt-4">Cable Types and Specifications</h3>
              <p>Common cable types used in bus topologies include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>10BASE5 (ThickNet):</strong> Used RG-8 coaxial cable with a maximum segment length of 500
                  meters.
                </li>
                <li>
                  <strong>10BASE2 (ThinNet):</strong> Used RG-58 coaxial cable with a maximum segment length of 185
                  meters.
                </li>
                <li>
                  <strong>Termination:</strong> 50-ohm terminators are required at both ends of the bus to prevent
                  signal reflection.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Historical Context</h2>
              <p>
                Bus topology was prominent in the early days of Ethernet networking (1980s and early 1990s). The
                development of more reliable and scalable topologies, particularly switched star topologies, led to the
                decline of pure bus networks in enterprise environments.
              </p>
              <p>
                However, the principles of bus topology continue to influence modern networking technologies, especially
                in specialized applications like industrial control systems and automotive networks.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Summary</h2>
              <p>
                Bus topology represents one of the fundamental network architectures where all devices connect to a
                single communication line. While simple and cost-effective for small networks, its limitations in
                scalability, fault tolerance, and performance have led to its replacement by more robust topologies in
                modern networking environments.
              </p>
              <p>
                Understanding bus topology provides essential foundational knowledge for networking professionals,
                offering insights into the evolution of network design principles and the trade-offs involved in
                different architectural approaches.
              </p>
            </section>
          </div>

          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/topics/transmission-media">
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
