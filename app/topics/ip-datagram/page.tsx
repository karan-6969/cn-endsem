"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function IpDatagramPage() {
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

    gsap.fromTo(
      ".datagram-field",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: diagramRef.current,
          start: "top 80%",
        },
      }
    )

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
              <span className="text-sm font-medium">IP Datagram Format</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/multicast-ip-mac">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">IP Datagram Format</h1>
            <p className="text-muted-foreground">
              The structure of an IP datagram defines how information is organized and transmitted over the network.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is an IP Datagram?</h2>
              <p>
                An IP datagram is a basic unit of information passed across IP networks. It contains the necessary headers and data to be routed from source to destination.
              </p>
              <p>
                The header contains control information such as source and destination IP addresses, while the payload contains the actual data.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">IP Datagram Header Format</h2>
              <div ref={diagramRef} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md my-6">
                <h3 className="text-lg font-medium mb-4 text-center">IPv4 Datagram Structure</h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-white">
                  {[
                    "Version (4 bits)",
                    "IHL (4 bits)",
                    "Type of Service (8 bits)",
                    "Total Length (16 bits)",
                    "Identification (16 bits)",
                    "Flags (3 bits)",
                    "Fragment Offset (13 bits)",
                    "Time to Live (8 bits)",
                    "Protocol (8 bits)",
                    "Header Checksum (16 bits)",
                    "Source IP Address (32 bits)",
                    "Destination IP Address (32 bits)",
                    "Options (if any)",
                    "Data (Payload)",
                  ].map((label, index) => (
                    <div key={index} className="datagram-field bg-blue-500/90 p-2 rounded shadow text-center">
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Key Fields Explained</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Version:</strong> Indicates IPv4 or IPv6.</li>
                <li><strong>IHL:</strong> Internet Header Length.</li>
                <li><strong>Total Length:</strong> Length of the entire datagram (header + data).</li>
                <li><strong>TTL:</strong> Time to Live – prevents packets from looping forever.</li>
                <li><strong>Protocol:</strong> Indicates the upper-layer protocol (e.g., TCP, UDP).</li>
                <li><strong>Source/Destination IP:</strong> Specifies sender and receiver addresses.</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
