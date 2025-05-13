"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function VLSMPage() {
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const [ipAddress, setIpAddress] = useState("192.168.10.0")
  const [subnetRequirements, setSubnetRequirements] = useState([120, 60, 30, 10])
  const [vlsmResult, setVlsmResult] = useState<any[]>([])
  const [error, setError] = useState("")

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

    // Calculate VLSM on initial load
    calculateVLSM()
  }, [])

  const calculateVLSM = () => {
    try {
      setError("")
      // Validate IP address format
      const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
      if (!ipRegex.test(ipAddress)) {
        setError("Invalid IP address format")
        return
      }

      // Parse IP address
      const ipParts = ipAddress.split(".").map(Number)
      for (const part of ipParts) {
        if (part < 0 || part > 255) {
          setError("IP address parts must be between 0 and 255")
          return
        }
      }

      // Sort subnet requirements in descending order
      const sortedRequirements = [...subnetRequirements].sort((a, b) => b - a)

      // Calculate VLSM subnets
      const results = []
      const currentIp = [...ipParts]

      for (let i = 0; i < sortedRequirements.length; i++) {
        const hostsNeeded = sortedRequirements[i]

        // Calculate required subnet bits
        const hostBits = Math.ceil(Math.log2(hostsNeeded + 2)) // +2 for network and broadcast addresses
        const subnetBits = 32 - hostBits

        if (subnetBits > 30) {
          setError(`Cannot allocate subnet for ${hostsNeeded} hosts (requires too many bits)`)
          return
        }

        // Calculate subnet mask
        const subnetMask = calculateSubnetMask(subnetBits)

        // Calculate network address, first usable, last usable, and broadcast
        const networkAddress = [...currentIp]
        const firstUsable = [...networkAddress]
        firstUsable[3] += 1

        const numHosts = Math.pow(2, 32 - subnetBits) - 2

        const lastUsable = [...networkAddress]
        const increment = Math.pow(2, 32 - subnetBits)
        let temp = (networkAddress[0] << 24) | (networkAddress[1] << 16) | (networkAddress[2] << 8) | networkAddress[3]
        temp += increment - 1
        lastUsable[0] = (temp >> 24) & 255
        lastUsable[1] = (temp >> 16) & 255
        lastUsable[2] = (temp >> 8) & 255
        lastUsable[3] = temp & 255

        const broadcast = [...lastUsable]

        const lastUsableForCalc = [...lastUsable]
        lastUsableForCalc[3] -= 1

        results.push({
          subnet: i + 1,
          hostsNeeded,
          subnetBits,
          cidr: `/${subnetBits}`,
          subnetMask: subnetMask.join("."),
          networkAddress: networkAddress.join("."),
          firstUsable: firstUsable.join("."),
          lastUsable: lastUsableForCalc.join("."),
          broadcast: broadcast.join("."),
          numHosts,
        })

        // Update current IP for next subnet
        temp = (networkAddress[0] << 24) | (networkAddress[1] << 16) | (networkAddress[2] << 8) | networkAddress[3]
        temp += increment
        currentIp[0] = (temp >> 24) & 255
        currentIp[1] = (temp >> 16) & 255
        currentIp[2] = (temp >> 8) & 255
        currentIp[3] = temp & 255
      }

      setVlsmResult(results)
    } catch (err) {
      setError("Error calculating VLSM: " + (err instanceof Error ? err.message : String(err)))
    }
  }

  const calculateSubnetMask = (bits: number) => {
    const mask = [0, 0, 0, 0]
    for (let i = 0; i < 4; i++) {
      if (bits >= 8) {
        mask[i] = 255
        bits -= 8
      } else if (bits > 0) {
        mask[i] = 256 - Math.pow(2, 8 - bits)
        bits = 0
      }
    }
    return mask
  }

  const handleSubnetChange = (index: number, value: string) => {
    const newRequirements = [...subnetRequirements]
    newRequirements[index] = Number.parseInt(value) || 0
    setSubnetRequirements(newRequirements)
  }

  const addSubnet = () => {
    setSubnetRequirements([...subnetRequirements, 0])
  }

  const removeSubnet = (index: number) => {
    if (subnetRequirements.length > 1) {
      const newRequirements = [...subnetRequirements]
      newRequirements.splice(index, 1)
      setSubnetRequirements(newRequirements)
    }
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
              <span className="text-sm font-medium">VLSM</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/topics/dynamic-vector-routing">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Variable Length Subnet Masking (VLSM)</h1>
            <p className="text-muted-foreground">Efficient IP address allocation through variable-sized subnets.</p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Introduction to VLSM</h2>
              <p>
                Variable Length Subnet Masking (VLSM) is an advanced subnetting technique that allows network
                administrators to use different subnet masks for different subnets within the same network address
                space. This approach enables more efficient use of IP addresses by creating subnets of various sizes
                based on actual needs, rather than using a fixed subnet size for all segments.
              </p>
              <p>
                Before VLSM was widely adopted, classful networking and fixed-length subnet masking (FLSM) were common
                practices. These approaches often led to significant IP address wastage, as all subnets had to be the
                same size regardless of the number of hosts they needed to accommodate.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Why VLSM is Important</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Efficient IP Address Utilization:</strong> VLSM allows for the creation of subnets that match
                  the actual number of hosts needed, minimizing wasted IP addresses.
                </li>
                <li>
                  <strong>Hierarchical Network Design:</strong> Facilitates the implementation of hierarchical network
                  structures with appropriate subnet sizes at each level.
                </li>
                <li>
                  <strong>Conservation of IPv4 Address Space:</strong> Particularly important given the scarcity of IPv4
                  addresses in today's internet.
                </li>
                <li>
                  <strong>Support for Modern Routing Protocols:</strong> Works with classless routing protocols like
                  OSPF, EIGRP, and BGP that carry subnet mask information with route advertisements.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">VLSM Concepts and Terminology</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Subnet Mask:</strong> A 32-bit value that identifies which portion of an IP address refers to
                  the network/subnet and which portion refers to the host.
                </li>
                <li>
                  <strong>CIDR Notation:</strong> Represents a subnet mask as a suffix indicating the number of network
                  bits (e.g., /24 for 255.255.255.0).
                </li>
                <li>
                  <strong>Network Address:</strong> The first address in a subnet, with all host bits set to 0.
                </li>
                <li>
                  <strong>Broadcast Address:</strong> The last address in a subnet, with all host bits set to 1.
                </li>
                <li>
                  <strong>Usable Host Addresses:</strong> All addresses between the network and broadcast addresses.
                </li>
                <li>
                  <strong>Subnet Bits:</strong> The bits used to create subnets from a larger network.
                </li>
                <li>
                  <strong>Host Bits:</strong> The bits available for host addressing within a subnet.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">VLSM Calculation Process</h2>
              <p>The process of implementing VLSM involves the following steps:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>List and Sort Requirements:</strong> Identify the number of hosts needed for each subnet and
                  sort them in descending order (largest first).
                </li>
                <li>
                  <strong>Calculate Subnet Sizes:</strong> For each subnet, determine the minimum number of host bits
                  needed to accommodate the required hosts, including network and broadcast addresses.
                </li>
                <li>
                  <strong>Assign Subnet Masks:</strong> Convert the host bits to subnet masks or CIDR notation.
                </li>
                <li>
                  <strong>Allocate Address Ranges:</strong> Starting with the largest subnet, allocate address ranges
                  ensuring they don't overlap.
                </li>
                <li>
                  <strong>Document the Allocation:</strong> Record network addresses, subnet masks, usable ranges, and
                  broadcast addresses for each subnet.
                </li>
              </ol>
            </section>

            <section className="content-section space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight">VLSM Calculator</h2>
              <p>
                Use this interactive calculator to practice VLSM subnetting. Enter a network address and the host
                requirements for each subnet to see the optimal VLSM allocation.
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>VLSM Calculator</CardTitle>
                  <CardDescription>Enter network details and host requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ip-address">Network Address</Label>
                    <Input
                      id="ip-address"
                      value={ipAddress}
                      onChange={(e) => setIpAddress(e.target.value)}
                      placeholder="e.g., 192.168.1.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Subnet Host Requirements</Label>
                    {subnetRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={req}
                          onChange={(e) => handleSubnetChange(index, e.target.value)}
                          placeholder="Number of hosts"
                          type="number"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeSubnet(index)}
                          disabled={subnetRequirements.length <= 1}
                        >
                          <span className="sr-only">Remove</span>
                          <span>×</span>
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addSubnet} className="w-full">
                      Add Subnet
                    </Button>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={calculateVLSM} className="w-full">
                    Calculate VLSM
                  </Button>
                </CardFooter>
              </Card>

              {vlsmResult.length > 0 && (
                <div className="space-y-4 mt-6">
                  <h3 className="text-xl font-medium">VLSM Results</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-2 text-left">Subnet</th>
                          <th className="border p-2 text-left">Hosts Needed</th>
                          <th className="border p-2 text-left">CIDR</th>
                          <th className="border p-2 text-left">Subnet Mask</th>
                          <th className="border p-2 text-left">Network Address</th>
                          <th className="border p-2 text-left">First Usable</th>
                          <th className="border p-2 text-left">Last Usable</th>
                          <th className="border p-2 text-left">Broadcast</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vlsmResult.map((result) => (
                          <tr key={result.subnet}>
                            <td className="border p-2">{result.subnet}</td>
                            <td className="border p-2">{result.hostsNeeded}</td>
                            <td className="border p-2">{result.cidr}</td>
                            <td className="border p-2">{result.subnetMask}</td>
                            <td className="border p-2">{result.networkAddress}</td>
                            <td className="border p-2">{result.firstUsable}</td>
                            <td className="border p-2">{result.lastUsable}</td>
                            <td className="border p-2">{result.broadcast}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Worked Example: VLSM Calculation</h2>
              <p>
                Let's walk through a detailed example of VLSM calculation for a network with the following requirements:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Available network: 192.168.20.0/24</li>
                <li>Subnet A needs 100 hosts</li>
                <li>Subnet B needs 50 hosts</li>
                <li>Subnet C needs 25 hosts</li>
                <li>Subnet D needs 10 hosts</li>
              </ul>

              <h3 className="text-xl font-medium mt-6">Step 1: Sort Requirements</h3>
              <p>Sort the subnets by size (largest to smallest):</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Subnet A: 100 hosts</li>
                <li>Subnet B: 50 hosts</li>
                <li>Subnet C: 25 hosts</li>
                <li>Subnet D: 10 hosts</li>
              </ul>

              <h3 className="text-xl font-medium mt-6">Step 2: Calculate Required Host Bits</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Subnet A: 100 hosts + 2 (network & broadcast) = 102 addresses
                  <br />
                  Needs 7 host bits (2^7 = 128 &gt; 102)
                  <br />
                  CIDR: /25 (32 - 7 = 25)
                  <br />
                  Subnet mask: 255.255.255.128
                </li>
                <li>
                  Subnet B: 50 hosts + 2 = 52 addresses
                  <br />
                  Needs 6 host bits (2^6 = 64 &gt; 52)
                  <br />
                  CIDR: /26 (32 - 6 = 26)
                  <br />
                  Subnet mask: 255.255.255.192
                </li>
                <li>
                  Subnet C: 25 hosts + 2 = 27 addresses
                  <br />
                  Needs 5 host bits (2^5 = 32 &gt; 27)
                  <br />
                  CIDR: /27 (32 - 5 = 27)
                  <br />
                  Subnet mask: 255.255.255.224
                </li>
                <li>
                  Subnet D: 10 hosts + 2 = 12 addresses
                  <br />
                  Needs 4 host bits (2^4 = 16 &gt; 12)
                  <br />
                  CIDR: /28 (32 - 4 = 28)
                  <br />
                  Subnet mask: 255.255.255.240
                </li>
              </ul>

              <h3 className="text-xl font-medium mt-6">Step 3: Allocate Address Ranges</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Subnet A:</strong>
                  <br />
                  Network: 192.168.20.0/25
                  <br />
                  First usable: 192.168.20.1
                  <br />
                  Last usable: 192.168.20.126
                  <br />
                  Broadcast: 192.168.20.127
                </li>
                <li>
                  <strong>Subnet B:</strong>
                  <br />
                  Network: 192.168.20.128/26
                  <br />
                  First usable: 192.168.20.129
                  <br />
                  Last usable: 192.168.20.190
                  <br />
                  Broadcast: 192.168.20.191
                </li>
                <li>
                  <strong>Subnet C:</strong>
                  <br />
                  Network: 192.168.20.192/27
                  <br />
                  First usable: 192.168.20.193
                  <br />
                  Last usable: 192.168.20.222
                  <br />
                  Broadcast: 192.168.20.223
                </li>
                <li>
                  <strong>Subnet D:</strong>
                  <br />
                  Network: 192.168.20.224/28
                  <br />
                  First usable: 192.168.20.225
                  <br />
                  Last usable: 192.168.20.238
                  <br />
                  Broadcast: 192.168.20.239
                </li>
              </ul>

              <p className="mt-4">
                Note that we still have the range 192.168.20.240/28 through 192.168.20.255 available for future use.
                This demonstrates how VLSM allows for more efficient use of the address space compared to fixed-length
                subnetting.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Practice Problems</h2>
              <p>
                Try these practice problems to test your understanding of VLSM. Use the calculator above to verify your
                answers.
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Problem 1:</h3>
                  <p>
                    You have been assigned the network 172.16.0.0/16 and need to create subnets for the following host
                    requirements:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Subnet A: 4000 hosts</li>
                    <li>Subnet B: 2000 hosts</li>
                    <li>Subnet C: 1000 hosts</li>
                    <li>Subnet D: 500 hosts</li>
                    <li>Subnet E: 250 hosts</li>
                  </ul>
                  <p>Design an efficient VLSM scheme for this network.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Problem 2:</h3>
                  <p>
                    You need to subnet the network 10.0.0.0/24 to accommodate the following point-to-point links and
                    LANs:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>5 point-to-point links (2 hosts each)</li>
                    <li>1 LAN with 60 hosts</li>
                    <li>1 LAN with 30 hosts</li>
                    <li>1 LAN with 10 hosts</li>
                  </ul>
                  <p>Create a VLSM design that minimizes wasted addresses.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Problem 3:</h3>
                  <p>
                    You have the network 192.168.5.0/24 and need to create a hierarchical addressing scheme with the
                    following requirements:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>4 departments (Sales, Marketing, Engineering, Administration)</li>
                    <li>Sales needs 60 addresses</li>
                    <li>Marketing needs 30 addresses</li>
                    <li>Engineering needs 50 addresses</li>
                    <li>Administration needs 25 addresses</li>
                    <li>Each department should have room for 20% growth</li>
                  </ul>
                  <p>Design a VLSM scheme that meets these requirements.</p>
                </div>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">VLSM in Modern Networking</h2>
              <p>
                VLSM is a fundamental concept in modern IP networking and is used extensively in enterprise networks and
                the internet. Its importance is highlighted by several factors:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>IPv4 Address Exhaustion:</strong> With the global IPv4 address space depleted, efficient
                  address utilization through VLSM remains critical.
                </li>
                <li>
                  <strong>Classless Inter-Domain Routing (CIDR):</strong> VLSM is a key component of CIDR, which has
                  replaced classful networking as the standard for IP address allocation.
                </li>
                <li>
                  <strong>Modern Routing Protocols:</strong> All contemporary routing protocols (OSPF, EIGRP, BGP)
                  support VLSM by including subnet mask information with route advertisements.
                </li>
                <li>
                  <strong>Network Segmentation:</strong> VLSM facilitates effective network segmentation for security,
                  performance, and management purposes.
                </li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Summary</h2>
              <p>
                Variable Length Subnet Masking (VLSM) is an essential technique for efficient IP address allocation that
                allows network administrators to create subnets of different sizes based on actual requirements. By
                using different subnet masks within the same network, VLSM minimizes address waste and supports
                hierarchical network design.
              </p>
              <p>
                The VLSM process involves sorting subnet requirements by size, calculating appropriate subnet masks,
                allocating address ranges in descending order of size, and documenting the allocation. This approach is
                fundamental to modern IP networking and is supported by all contemporary routing protocols.
              </p>
              <p>
                Mastering VLSM is crucial for network engineers and administrators, as it enables efficient address
                utilization, supports scalable network designs, and remains relevant even as networks transition to
                IPv6.
              </p>
            </section>
          </div>

          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <Button variant="outline" size="sm" asChild>
              <Link href="/topics/data-link-vs-network">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Topic
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/topics/dynamic-vector-routing">
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
