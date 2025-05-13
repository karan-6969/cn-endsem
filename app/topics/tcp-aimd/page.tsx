"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function TcpCongestionAimdPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".aimd-section", {
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
              <span className="text-sm font-medium">TCP AIMD</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/tcp-open-vs-closed-loop">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">TCP Congestion Control: AIMD</h1>
            <p className="text-muted-foreground">
              Understand how TCP controls congestion using Additive Increase and Multiplicative Decrease.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="aimd-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Why Congestion Control?</h2>
              <p>
                TCP must avoid overwhelming the network. AIMD is used to gradually increase the sending rate and drastically reduce it when congestion is detected.
              </p>
            </section>

            <section className="aimd-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How AIMD Works</h2>
              <div className="space-y-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <div className="bg-indigo-600 text-white p-3 rounded shadow">
                  <strong>Additive Increase:</strong> For every successful round-trip (ACK received), the congestion window (cwnd) is increased by 1 MSS (Maximum Segment Size).
                </div>
                <div className="bg-rose-600 text-white p-3 rounded shadow">
                  <strong>Multiplicative Decrease:</strong> On detecting congestion (e.g., packet loss), cwnd is reduced to half of its value.
                </div>
              </div>
            </section>

            <section className="aimd-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Graphical Representation</h2>
              <pre className="bg-slate-900 text-green-400 p-4 rounded-md overflow-auto text-sm">
{`Congestion Window (cwnd)
|
|       / / / / /     <- Additive Increase
|      /
|     /
|    /
|   /
|  /
| / <- sudden drop (Multiplicative Decrease)
|/
+--------------------> Time`}
              </pre>
            </section>

            <section className="aimd-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Benefits of AIMD</h2>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Fairness among competing TCP flows</li>
                <li>Stability under varying network conditions</li>
                <li>Efficient use of available bandwidth</li>
              </ul>
            </section>

            <section className="aimd-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Where It's Used</h2>
              <p>
                AIMD is implemented in TCP Reno, one of the most common TCP variants. It's the foundation of modern congestion control in networks.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
