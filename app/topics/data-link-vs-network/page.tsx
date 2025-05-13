"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DataLinkVsNetworkPage() {
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

    // OSI model layers animation
    gsap.from(".osi-layer", {
      x: -100,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: diagramRef.current,
        start: "top 80%",
      },
    })

    // Comparison table animation
    gsap.from(".comparison-row", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".comparison-table",
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
              <span className="text-sm font-medium">Data Link vs Network Layer</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/topics/vlsm">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Difference between Data Link Layer and Network Layer
            </h1>
            <p className="text-muted-foreground">Understanding the distinct roles of OSI layers 2 and 3.</p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Introduction to OSI Model Layers</h2>
              <p>
                The Open Systems Interconnection (OSI) model is a conceptual framework that standardizes the functions
                of a telecommunication or computing system into seven abstraction layers. Each layer serves the layer
                above it and is served by the layer below it. The Data Link Layer (Layer 2) and Network Layer (Layer 3)
                are two adjacent layers with distinct but complementary roles in network communication.
              </p>

              <div ref={diagramRef} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md my-6">
                <h3 className="text-lg font-medium mb-4 text-center">OSI Model Layers</h3>
                <div className="space-y-2">
                  <div className="osi-layer flex items-center p-3 rounded-md bg-slate-100 dark:bg-slate-700">
                    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center font-bold mr-4">
                      7
                    </div>
                    <div>
                      <div className="font-medium">Application Layer</div>
                      <div className="text-sm text-muted-foreground">Network process to application</div>
                    </div>
                  </div>
                  <div className="osi-layer flex items-center p-3 rounded-md bg-slate-100 dark:bg-slate-700">
                    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center font-bold mr-4">
                      6
                    </div>
                    <div>
                      <div className="font-medium">Presentation Layer</div>
                      <div className="text-sm text-muted-foreground">Data representation and encryption</div>
                    </div>
                  </div>
                  <div className="osi-layer flex items-center p-3 rounded-md bg-slate-100 dark:bg-slate-700">
                    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center font-bold mr-4">
                      5
                    </div>
                    <div>
                      <div className="font-medium">Session Layer</div>
                      <div className="text-sm text-muted-foreground">Interhost communication</div>
                    </div>
                  </div>
                  <div className="osi-layer flex items-center p-3 rounded-md bg-slate-100 dark:bg-slate-700">
                    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center font-bold mr-4">
                      4
                    </div>
                    <div>
                      <div className="font-medium">Transport Layer</div>
                      <div className="text-sm text-muted-foreground">End-to-end connections and reliability</div>
                    </div>
                  </div>
                  <div className="osi-layer flex items-center p-3 rounded-md bg-green-100 dark:bg-green-900/30">
                    <div className="w-8 h-8 rounded-full bg-green-300 dark:bg-green-700 flex items-center justify-center font-bold mr-4">
                      3
                    </div>
                    <div>
                      <div className="font-medium">Network Layer</div>
                      <div className="text-sm text-muted-foreground">Path determination and logical addressing</div>
                    </div>
                  </div>
                  <div className="osi-layer flex items-center p-3 rounded-md bg-blue-100 dark:bg-blue-900/30">
                    <div className="w-8 h-8 rounded-full bg-blue-300 dark:bg-blue-700 flex items-center justify-center font-bold mr-4">
                      2
                    </div>
                    <div>
                      <div className="font-medium">Data Link Layer</div>
                      <div className="text-sm text-muted-foreground">Physical addressing and media access</div>
                    </div>
                  </div>
                  <div className="osi-layer flex items-center p-3 rounded-md bg-slate-100 dark:bg-slate-700">
                    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center font-bold mr-4">
                      1
                    </div>
                    <div>
                      <div className="font-medium">Physical Layer</div>
                      <div className="text-sm text-muted-foreground">Media, signal and binary transmission</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Data Link Layer (Layer 2)</h2>
              <p>
                The Data Link Layer is responsible for node-to-node data transfer—a link between two directly connected
                nodes. It detects and possibly corrects errors that may occur in the Physical Layer. It defines the
                protocol to establish and terminate a connection between two physically connected devices.
              </p>

              <h3 className="text-xl font-medium mt-6">Key Functions of the Data Link Layer</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Framing:</strong> Encapsulates packets from the Network Layer into frames for transmission and
                  decapsulates frames into packets for delivery to the Network Layer.
                </li>
                <li>
                  <strong>Physical Addressing:</strong> Adds a header containing the MAC (Media Access Control) address
                  of the source and destination devices.
                </li>
                <li>
                  <strong>Error Control:</strong> Detects and retransmits damaged or lost frames, and recognizes
                  duplicate frames.
                </li>
                <li>
                  <strong>Flow Control:</strong> Prevents a fast sender from overwhelming a slow receiver by regulating
                  the data flow.
                </li>
                <li>
                  <strong>Access Control:</strong> Determines which device has control over the channel when multiple
                  devices are connected to a single link.
                </li>
              </ul>

              <h3 className="text-xl font-medium mt-6">Sublayers of the Data Link Layer</h3>
              <p>The Data Link Layer is often divided into two sublayers:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Logical Link Control (LLC) Sublayer:</strong> Responsible for flow control, error control, and
                  identifying network layer protocols.
                </li>
                <li>
                  <strong>Media Access Control (MAC) Sublayer:</strong> Responsible for controlling how devices in a
                  network gain access to a medium and permission to transmit data.
                </li>
              </ol>

              <h3 className="text-xl font-medium mt-6">Common Data Link Layer Protocols</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Ethernet (IEEE 802.3):</strong> Defines CSMA/CD (Carrier Sense Multiple Access with Collision
                  Detection) for wired networks.
                </li>
                <li>
                  <strong>Wi-Fi (IEEE 802.11):</strong> Defines CSMA/CA (Carrier Sense Multiple Access with Collision
                  Avoidance) for wireless networks.
                </li>
                <li>
                  <strong>Point-to-Point Protocol (PPP):</strong> Used for direct connections between two nodes.
                </li>
                <li>
                  <strong>High-Level Data Link Control (HDLC):</strong> A bit-oriented code-transparent protocol.
                </li>
              </ul>

              <h3 className="text-xl font-medium mt-6">Addressing at the Data Link Layer</h3>
              <p>The Data Link Layer uses MAC addresses, which are:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>48-bit (6-byte) physical addresses burned into network interface cards (NICs)</li>
                <li>Globally unique and assigned by manufacturers</li>
                <li>Represented in hexadecimal format (e.g., 00:1A:2B:3C:4D:5E)</li>
                <li>Used for local communication within the same network segment</li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Network Layer (Layer 3)</h2>
              <p>
                The Network Layer provides the functional and procedural means of transferring variable length data
                sequences from a source to a destination via one or more networks while maintaining the quality of
                service requested by the Transport Layer. It performs network routing functions and might also perform
                fragmentation and reassembly.
              </p>

              <h3 className="text-xl font-medium mt-6">Key Functions of the Network Layer</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Logical Addressing:</strong> Adds IP addresses of the sender and receiver to the packet.
                </li>
                <li>
                  <strong>Routing:</strong> Determines the best path for data to travel from source to destination
                  across multiple networks.
                </li>
                <li>
                  <strong>Path Determination:</strong> Selects the most efficient route based on various metrics like
                  distance, cost, or delay.
                </li>
                <li>
                  <strong>Packet Switching:</strong> Forwards packets from one router to another until they reach their
                  final destination.
                </li>
                <li>
                  <strong>Fragmentation and Reassembly:</strong> Breaks packets into smaller units if necessary to
                  accommodate the maximum transmission unit (MTU) of different networks, and reassembles them at the
                  destination.
                </li>
                <li>
                  <strong>Traffic Control:</strong> Manages network congestion and implements quality of service (QoS)
                  mechanisms.
                </li>
              </ul>

              <h3 className="text-xl font-medium mt-6">Common Network Layer Protocols</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Internet Protocol (IP):</strong> The primary protocol for delivering packets based on IP
                  addresses.
                </li>
                <li>
                  <strong>Internet Control Message Protocol (ICMP):</strong> Used for diagnostic functions and error
                  reporting.
                </li>
                <li>
                  <strong>Internet Group Management Protocol (IGMP):</strong> Used for multicasting.
                </li>
                <li>
                  <strong>Routing Protocols:</strong> Such as OSPF (Open Shortest Path First), RIP (Routing Information
                  Protocol), BGP (Border Gateway Protocol), and EIGRP (Enhanced Interior Gateway Routing Protocol).
                </li>
              </ul>

              <h3 className="text-xl font-medium mt-6">Addressing at the Network Layer</h3>
              <p>The Network Layer uses IP addresses, which are:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>32-bit (IPv4) or 128-bit (IPv6) logical addresses</li>
                <li>Hierarchical and assigned by network administrators or DHCP servers</li>
                <li>
                  Represented in dotted-decimal format for IPv4 (e.g., 192.168.1.1) or hexadecimal format for IPv6
                </li>
                <li>Used for routing between different networks</li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                Key Differences Between Data Link and Network Layers
              </h2>

              <div className="comparison-table overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Parameter</TableHead>
                      <TableHead>Data Link Layer (Layer 2)</TableHead>
                      <TableHead>Network Layer (Layer 3)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="comparison-row">
                      <TableCell className="font-medium">Primary Function</TableCell>
                      <TableCell>Node-to-node delivery (between directly connected devices)</TableCell>
                      <TableCell>Source-to-destination delivery (across multiple networks)</TableCell>
                    </TableRow>
                    <TableRow className="comparison-row">
                      <TableCell className="font-medium">Addressing</TableCell>
                      <TableCell>Physical addressing (MAC addresses)</TableCell>
                      <TableCell>Logical addressing (IP addresses)</TableCell>
                    </TableRow>
                    <TableRow className="comparison-row">
                      <TableCell className="font-medium">Scope</TableCell>
                      <TableCell>Local network (same network segment)</TableCell>
                      <TableCell>Global (across different networks)</TableCell>
                    </TableRow>
                    <TableRow className="comparison-row">
                      <TableCell className="font-medium">PDU (Protocol Data Unit)</TableCell>
                      <TableCell>Frame</TableCell>
                      <TableCell>Packet</TableCell>
                    </TableRow>
                    <TableRow className="comparison-row">
                      <TableCell className="font-medium">Devices</TableCell>
                      <TableCell>Switches, Bridges, Network Interface Cards</TableCell>
                      <TableCell>Routers, Layer 3 Switches</TableCell>
                    </TableRow>
                    <TableRow className="comparison-row">
                      <TableCell className="font-medium">Routing</TableCell>
                      <TableCell>No routing capabilities (switching only)</TableCell>
                      <TableCell>Performs routing between different networks</TableCell>
                    </TableRow>
                    <TableRow className="comparison-row">
                      <TableCell className="font-medium">Error Control</TableCell>
                      <TableCell>Detects and corrects errors in transmitted frames</TableCell>
                      <TableCell>Limited error checking (header checksum only)</TableCell>
                    </TableRow>
                    <TableRow className="comparison-row">
                      <TableCell className="font-medium">Flow Control</TableCell>
                      <TableCell>Manages data flow between adjacent nodes</TableCell>
                      <TableCell>No direct flow control (handled by Transport Layer)</TableCell>
                    </TableRow>
                    <TableRow className="comparison-row">
                      <TableCell className="font-medium">Protocols</TableCell>
                      <TableCell>Ethernet, PPP, HDLC, Frame Relay, ATM</TableCell>
                      <TableCell>IP, ICMP, IGMP, RIP, OSPF, BGP</TableCell>
                    </TableRow>
                    <TableRow className="comparison-row">
                      <TableCell className="font-medium">Delivery Decision</TableCell>
                      <TableCell>Based on MAC address</TableCell>
                      <TableCell>Based on IP address and routing tables</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                Interaction Between Data Link and Network Layers
              </h2>
              <p>The Data Link and Network Layers work together to ensure efficient and reliable data transmission:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Encapsulation and Decapsulation:</strong> The Network Layer encapsulates data from the
                  Transport Layer into packets and passes them to the Data Link Layer, which further encapsulates them
                  into frames. The reverse process happens at the receiving end.
                </li>
                <li>
                  <strong>Address Resolution:</strong> The Network Layer uses the Address Resolution Protocol (ARP) to
                  map IP addresses (Network Layer) to MAC addresses (Data Link Layer) for local delivery.
                </li>
                <li>
                  <strong>Hop-by-Hop Delivery:</strong> The Network Layer determines the entire path from source to
                  destination, while the Data Link Layer handles the transmission between each pair of nodes along that
                  path.
                </li>
                <li>
                  <strong>Error Handling:</strong> The Data Link Layer provides error detection and correction for the
                  physical transmission, while the Network Layer focuses on routing and delivery.
                </li>
              </ol>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Practical Examples</h2>

              <h3 className="text-xl font-medium">Example 1: Web Browsing</h3>
              <p>When you browse a website, here's how the Data Link and Network Layers work together:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Network Layer:</strong> Your computer's IP stack determines that the web server is on a
                  different network and identifies your default gateway's IP address as the next hop.
                </li>
                <li>
                  <strong>Data Link Layer:</strong> ARP is used to find the MAC address of your default gateway, and an
                  Ethernet frame is created with this MAC address as the destination.
                </li>
                <li>
                  <strong>Network Layer (at Router):</strong> Your router extracts the IP packet, examines the
                  destination IP address, and determines the next hop in the path to the web server.
                </li>
                <li>
                  <strong>Data Link Layer (at Router):</strong> The router creates a new frame with the MAC address of
                  the next hop and forwards it.
                </li>
                <li>This process continues until the packet reaches the web server.</li>
              </ol>

              <h3 className="text-xl font-medium mt-6">Example 2: Local File Sharing</h3>
              <p>When sharing files between computers on the same local network:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Network Layer:</strong> Determines that the destination is on the same network (based on IP
                  address and subnet mask).
                </li>
                <li>
                  <strong>Data Link Layer:</strong> Uses ARP to find the MAC address of the destination computer
                  directly.
                </li>
                <li>
                  <strong>Data Link Layer:</strong> Creates an Ethernet frame with the destination computer's MAC
                  address and sends it directly (no routing needed).
                </li>
                <li>
                  <strong>Network Layer:</strong> Is minimally involved since no routing is required for local delivery.
                </li>
              </ol>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Summary</h2>
              <p>The Data Link Layer and Network Layer serve complementary roles in the OSI model:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Data Link Layer (Layer 2):</strong> Focuses on local delivery between directly connected
                  devices using MAC addresses. It handles framing, physical addressing, error control, flow control, and
                  access control.
                </li>
                <li>
                  <strong>Network Layer (Layer 3):</strong> Focuses on end-to-end delivery across multiple networks
                  using IP addresses. It handles logical addressing, routing, and packet forwarding.
                </li>
              </ul>
              <p>
                Understanding the distinct functions and interactions between these two layers is essential for network
                design, troubleshooting, and optimization. While the Data Link Layer ensures reliable point-to-point
                communication, the Network Layer provides the intelligence needed for data to traverse complex
                internetworks and reach its final destination.
              </p>
            </section>
          </div>

          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <Button variant="outline" size="sm" asChild>
              <Link href="/topics/transmission-media">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Topic
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/topics/vlsm">
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
