"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function TrafficShapingPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".traffic-shaping-section", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              <span className="text-sm font-medium">Traffic Shaping</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/tcp-congestion-control">
                Previous Topic
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/dns">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Traffic Shaping</h1>
            <p className="text-muted-foreground">
              Learn about traffic shaping, its purpose, how it works, and the different algorithms used for network traffic management.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="traffic-shaping-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is Traffic Shaping?</h2>
              <p>
                Traffic shaping, also known as packet shaping, is a network management technique used to control the flow of data within a network. The goal of traffic shaping is to ensure that traffic flows in a predictable and efficient manner by enforcing bandwidth limits and delays to prevent network congestion and ensure quality of service (QoS) for important traffic.
              </p>
              <p>
                In essence, traffic shaping works by delaying packets to smooth out bursts of traffic, ensuring that the data rate stays within acceptable limits and does not overwhelm the network infrastructure.
              </p>
            </section>

            <section className="traffic-shaping-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Why is Traffic Shaping Important?</h2>
              <p>
                Traffic shaping is an essential technique for managing network resources effectively. It helps prevent network congestion, optimize available bandwidth, and ensure that critical applications receive the necessary bandwidth to function properly. Some of the key reasons traffic shaping is important include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Preventing Network Congestion:</strong> By smoothing traffic bursts, traffic shaping helps prevent network congestion, which can lead to packet loss and slowdowns.</li>
                <li><strong>Improving Network Efficiency:</strong> Traffic shaping ensures that available bandwidth is used efficiently, reducing idle time and maximizing throughput.</li>
                <li><strong>Ensuring QoS:</strong> Critical applications, such as voice or video conferencing, can be prioritized to ensure they receive sufficient bandwidth for optimal performance.</li>
                <li><strong>Optimizing Bandwidth Utilization:</strong> Traffic shaping ensures that the network is not overwhelmed by excessive data traffic, ensuring fair distribution of bandwidth across users and applications.</li>
              </ul>
            </section>

            <section className="traffic-shaping-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How Does Traffic Shaping Work?</h2>
              <p>
                Traffic shaping works by controlling the rate at which data is transmitted through the network. It uses algorithms to manage traffic flows and smooth out bursts, ensuring that the data rate does not exceed the specified bandwidth limits.
              </p>
              <p>
                The traffic shaping process involves the following key steps:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Buffering:</strong> Traffic is temporarily stored in a buffer before being transmitted. This helps smooth out bursts and ensures that traffic flows at a consistent rate.</li>
                <li><strong>Policing:</strong> Traffic shaping enforces bandwidth limits by policing the data rate. If the traffic exceeds the defined rate, the excess packets are delayed or dropped.</li>
                <li><strong>Scheduling:</strong> Traffic shaping uses scheduling algorithms to prioritize certain types of traffic, ensuring that high-priority applications get the bandwidth they need.</li>
              </ul>
              <p>
                The shaping mechanism typically operates at the network layer (Layer 3) but can also be implemented at the data link layer (Layer 2) for specific protocols such as Ethernet.
              </p>
            </section>

            <section className="traffic-shaping-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Traffic Shaping Algorithms</h2>
              <p>
                Various algorithms are used to implement traffic shaping. These algorithms control how traffic is buffered, delayed, and prioritized. Some of the most common traffic shaping algorithms include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Token Bucket Algorithm:</strong> The token bucket algorithm allows traffic to burst up to a certain limit, but the overall data rate is controlled by the "tokens" in the bucket. If there are no tokens available, packets are delayed or discarded.</li>
                <li><strong>Leaky Bucket Algorithm:</strong> The leaky bucket algorithm enforces a constant output rate by "leaking" data at a fixed rate. Excess traffic is queued, and if the bucket overflows, packets are dropped.</li>
                <li><strong>Weighted Fair Queuing (WFQ):</strong> WFQ is a sophisticated algorithm that allocates bandwidth based on the weight or priority of each traffic flow. It ensures fair distribution of bandwidth while allowing higher-priority flows to be serviced more quickly.</li>
                <li><strong>Class-Based Weighted Fair Queuing (CBWFQ):</strong> CBWFQ is an extension of WFQ that allows traffic to be classified into different classes. Each class is given a weight, and bandwidth is allocated based on the priority of the class.</li>
              </ul>
            </section>

            <section className="traffic-shaping-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Traffic Shaping vs Traffic Policing</h2>
              <p>
                While traffic shaping and traffic policing both aim to manage traffic flows, they differ in their approach:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Traffic Shaping:</strong> Traffic shaping smooths out traffic bursts by delaying packets to ensure that data flows at a consistent rate. Excess traffic is buffered and released gradually, reducing the impact on the network.</li>
                <li><strong>Traffic Policing:</strong> Traffic policing, on the other hand, enforces strict traffic limits by dropping or remarking packets that exceed the defined rate. It does not smooth traffic but rather ensures that the traffic conforms to the specified rate.</li>
              </ul>
            </section>

            <section className="traffic-shaping-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Real-World Applications of Traffic Shaping</h2>
              <p>
                Traffic shaping is widely used in various real-world scenarios to improve network performance and ensure fair bandwidth allocation. Some common use cases include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>ISP Bandwidth Management:</strong> Internet Service Providers (ISPs) use traffic shaping to manage their networks, ensuring that bandwidth is allocated fairly among users and preventing network congestion during peak usage times.</li>
                <li><strong>Enterprise Networks:</strong> In enterprise networks, traffic shaping ensures that critical applications, such as VoIP or video conferencing, receive the necessary bandwidth while preventing less important traffic from overwhelming the network.</li>
                <li><strong>Cloud Service Providers:</strong> Cloud service providers use traffic shaping to manage data transfers between data centers, ensuring that important services receive priority and preventing network congestion.</li>
              </ul>
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}
