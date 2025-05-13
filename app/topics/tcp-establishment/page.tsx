"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function TcpConnectionPage() {
  const contentRef = useRef(null)
  const stepsRef = useRef(null)

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
      ".handshake-step",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stepsRef.current,
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
              <span className="text-sm font-medium">TCP Connection</span>
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">TCP Connection Establishment</h1>
            <p className="text-muted-foreground">
              Learn how the TCP three-way handshake establishes a reliable connection between two hosts.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Why Handshake?</h2>
              <p>
                TCP is a connection-oriented protocol that requires a connection to be established before any data is transferred. The three-way handshake ensures both sides are ready and synchronized.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">3-Way Handshake Steps</h2>
              <div ref={stepsRef} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <div className="handshake-step bg-emerald-600 text-white p-3 rounded shadow">
                  <strong>Step 1: SYN</strong> — The client sends a SYN (synchronize) packet to the server to start the connection.
                </div>
                <div className="handshake-step bg-emerald-600 text-white p-3 rounded shadow">
                  <strong>Step 2: SYN-ACK</strong> — The server responds with a SYN-ACK (synchronize-acknowledgement) packet to acknowledge the request and initiate its side.
                </div>
                <div className="handshake-step bg-emerald-600 text-white p-3 rounded shadow">
                  <strong>Step 3: ACK</strong> — The client sends an ACK packet to acknowledge the server’s response, and the connection is now established.
                </div>
              </div>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Visual Summary</h2>
              <pre className="bg-slate-900 text-green-400 p-4 rounded-md overflow-auto text-sm">
{`Client                Server
  |   SYN ------------>  |
  |                     |
  |   <---- SYN-ACK     |
  |                     |
  |   ACK ------------> |
  |                     |
Connection Established`}
              </pre>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Initial Sequence Numbers (ISNs)</h2>
              <p>
                During the handshake, each side chooses a random Initial Sequence Number (ISN) for synchronization. The ISN helps maintain correct order and avoid collisions from previous sessions.
              </p>
            </section>

            <section className="content-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What Happens Next?</h2>
              <p>
                After connection setup, TCP ensures reliable data transfer using acknowledgements, timeouts, and retransmissions. When communication ends, a 4-way termination handshake occurs.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
