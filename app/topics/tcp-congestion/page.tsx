"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function TcpCongestionPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".congestion-section", {
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
              <span className="text-sm font-medium">TCP Congestion Control</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/tcp-congestion-aimd">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">TCP Congestion Control</h1>
            <p className="text-muted-foreground">
              Learn how TCP prevents network congestion and ensures efficient data transfer.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="congestion-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Why Congestion Control?</h2>
              <p>
                TCP is responsible for ensuring reliable data transfer between devices. Without congestion control, the network can become overwhelmed with traffic, leading to packet loss and delays.
              </p>
            </section>

            <section className="congestion-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Types of Congestion Control</h2>
              <div className="space-y-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <div className="bg-indigo-600 text-white p-3 rounded shadow">
                  <strong>Slow Start:</strong> Begins with a small congestion window and increases exponentially to avoid overloading the network.
                </div>
                <div className="bg-green-600 text-white p-3 rounded shadow">
                  <strong>Congestion Avoidance:</strong> After reaching a threshold, the congestion window grows linearly to stabilize the network.
                </div>
                <div className="bg-rose-600 text-white p-3 rounded shadow">
                  <strong>Fast Retransmit:</strong> Detects packet loss quickly and retransmits lost packets without waiting for a timeout.
                </div>
              </div>
            </section>

            <section className="congestion-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">TCP Congestion Window</h2>
              <p>
                The congestion window (cwnd) is a key concept in TCP congestion control. It determines the number of packets that can be sent before receiving an acknowledgment (ACK). The cwnd increases or decreases depending on network conditions.
              </p>
              <pre className="bg-slate-900 text-green-400 p-4 rounded-md overflow-auto text-sm">
{`Congestion Window (cwnd)
|
|      /\  /\  /\  <- Slow Start
|     /  \/  \/  \
|    /             <- Congestion Avoidance
|   /
|  /
| / <- sudden drop (Fast Retransmit)
|/
+--------------------> Time`}
              </pre>
            </section>

            <section className="congestion-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Benefits of TCP Congestion Control</h2>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Prevents network congestion and packet loss</li>
                <li>Ensures reliable and efficient data transfer</li>
                <li>Adjusts to network conditions dynamically</li>
              </ul>
            </section>

            <section className="congestion-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Where It's Used</h2>
              <p>
                TCP congestion control is an essential feature in most modern networks, including the internet, ensuring that large-scale data transfers remain stable and efficient even under varying network loads.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
