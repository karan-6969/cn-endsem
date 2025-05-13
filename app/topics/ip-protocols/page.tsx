"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function IpProtocolPage() {
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const diagramRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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

    if (diagramRef.current) {
      gsap.from(".ip-box", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: diagramRef.current,
          start: "top 80%",
        },
      })

      gsap.from(".arrow-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        delay: 0.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: diagramRef.current,
          start: "top 80%",
        },
      })

      gsap.from(".label", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        delay: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: diagramRef.current,
          start: "top 80%",
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header ref={headerRef} className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              <span className="text-sm font-medium">IP Protocol</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/icmp">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">IP Protocol</h1>
            <p className="text-muted-foreground">
              The Internet Protocol is the fundamental protocol for routing data across networks.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is IP?</h2>
              <p>
                The Internet Protocol (IP) is a set of rules governing how data is sent from one computer to another on the internet. Every device on the network has an IP address, which acts as its unique identifier.
              </p>
              <p>
                IP operates at the network layer of the OSI model and is responsible for addressing, packetizing, and routing data between source and destination.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How IP Works</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Packet-Based:</strong> Data is broken into packets for transmission.</li>
                <li><strong>Best-Effort Delivery:</strong> IP doesn't guarantee delivery, order, or integrity.</li>
                <li><strong>Addressing:</strong> Every device has a unique IP address (IPv4 or IPv6).</li>
                <li><strong>Routing:</strong> Routers use IP headers to forward packets to the next hop.</li>
              </ul>
              <div ref={diagramRef} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md my-6">
                <h3 className="text-lg font-medium mb-4 text-center">IP Packet Flow Diagram</h3>
                <div className="relative h-56 w-full flex items-center justify-between px-8">
                  <div className="ip-box w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded shadow-md">Sender</div>
                  <div className="arrow-line h-1 bg-primary w-full mx-4 scale-x-100"></div>
                  <div className="ip-box w-24 h-24 bg-green-500 text-white flex items-center justify-center rounded shadow-md">Receiver</div>
                </div>
                <div className="flex justify-center mt-4 gap-4 text-sm text-muted-foreground label">
                  <span>IP Addressing</span>
                  <span>Routing</span>
                  <span>Packet Delivery</span>
                </div>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Advantages of IP</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Scalable:</strong> Supports billions of devices via IPv6.</li>
                <li><strong>Standardized:</strong> Universally used for all internet communication.</li>
                <li><strong>Flexible Routing:</strong> Allows dynamic path selection for optimal delivery.</li>
              </ul>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Related Protocols</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>ICMP:</strong> Used for error reporting and diagnostics (e.g., ping).</li>
                <li><strong>IGMP:</strong> Manages multicast group memberships.</li>
                <li><strong>ARP:</strong> Resolves IP to MAC addresses within a LAN.</li>
                <li><strong>RARP:</strong> Opposite of ARP—resolves MAC to IP.</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
