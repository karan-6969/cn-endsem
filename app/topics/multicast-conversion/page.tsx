"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function MulticastIpToMacPage() {
  const contentRef = useRef(null)
  const diagramRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".content-section", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
      },
    })

    gsap.fromTo(
      ".conversion-step",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: diagramRef.current,
          start: "top 80%",
        },
      }
    )

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
              <span className="text-sm font-medium">Multicast IP to MAC</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/tcp-connection">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Multicast IP to MAC Conversion</h1>
            <p className="text-muted-foreground">
              Understand how an IP multicast address is converted to a MAC address at the data link layer.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Why the Conversion is Needed</h2>
              <p>
                IP multicast allows data to be sent to multiple recipients using a single address (224.0.0.0 to 239.255.255.255). Ethernet, however, uses MAC addresses for frame delivery.
                Therefore, multicast IP addresses need to be mapped to corresponding MAC addresses so the Ethernet hardware can deliver them appropriately.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Multicast MAC Address Format</h2>
              <p>
                All multicast MAC addresses start with a fixed 25-bit prefix: <code>01:00:5e</code>.
                The remaining 23 bits are derived from the last 23 bits of the multicast IP address.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Step-by-Step Conversion</h2>
              <div ref={diagramRef} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow space-y-4">
                <h3 className="text-center text-lg font-semibold">Example: IP → 224.192.16.1</h3>

                <div className="space-y-3">
                  <div className="conversion-step bg-blue-500/90 text-white p-3 rounded shadow">
                    Step 1: Convert IP to binary → 224.192.16.1 = <code>11100000.11000000.00010000.00000001</code>
                  </div>

                  <div className="conversion-step bg-blue-500/90 text-white p-3 rounded shadow">
                    Step 2: Take the last 23 bits → <code>0000000.11000000.00010000.00000001</code>
                  </div>

                  <div className="conversion-step bg-blue-500/90 text-white p-3 rounded shadow">
                    Step 3: Add prefix → <code>01:00:5e</code> + extracted bits
                  </div>

                  <div className="conversion-step bg-blue-500/90 text-white p-3 rounded shadow">
                    Step 4: Result MAC = <code>01:00:5e:00:10:01</code>
                  </div>
                </div>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Limitations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Only 23 bits of the IP address are used → multiple IPs can map to the same MAC address.</li>
                <li>This causes possible delivery of unwanted packets to some hosts (known as overdelivery).</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
