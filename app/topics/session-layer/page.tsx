"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function SessionLayerPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".session-layer-section", {
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
              <span className="text-sm font-medium">Session Layer</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/telnet">
                Previous Topic
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/presentation-layer">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Session Layer</h1>
            <p className="text-muted-foreground">
              Learn about the session layer in the OSI model, its functions, responsibilities, and protocols that operate at this layer.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="session-layer-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is the Session Layer?</h2>
              <p>
                The session layer is the fifth layer of the OSI model, located between the transport and presentation layers. It is responsible for managing and controlling the dialog between two systems, ensuring that data is properly synchronized, organized, and delivered in an orderly manner.
              </p>
              <p>
                The primary function of the session layer is to establish, maintain, and terminate communication sessions between devices. A session represents an ongoing exchange of information between two systems, which is managed and controlled by the session layer.
              </p>
            </section>

            <section className="session-layer-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Key Functions of the Session Layer</h2>
              <p>The session layer is responsible for the following key tasks:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Session Establishment:</strong> The session layer sets up, initiates, and controls the communication session between two systems.</li>
                <li><strong>Session Management:</strong> It manages and maintains the session by handling the exchange of data and ensuring synchronization during the communication.</li>
                <li><strong>Session Termination:</strong> It ensures that the session is closed properly when the communication is finished, releasing the resources used during the session.</li>
                <li><strong>Dialog Control:</strong> The session layer manages the flow of data between systems, ensuring that data is transmitted in an organized and structured manner (e.g., full-duplex or half-duplex communication).</li>
              </ul>
            </section>

            <section className="session-layer-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Protocols Operating at the Session Layer</h2>
              <p>Several protocols operate at the session layer, providing services such as session establishment, data synchronization, and dialog control:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>NetBIOS (Network Basic Input/Output System):</strong> A protocol that allows applications to communicate over a local network using a set of APIs. It provides services such as session establishment, termination, and data transmission.</li>
                <li><strong>RPC (Remote Procedure Call):</strong> A protocol that enables one program to execute code on a remote machine, facilitating communication between devices in distributed systems.</li>
                <li><strong>SQL (Structured Query Language):</strong> SQL uses session-layer services to manage interactions between a client and a database server, handling the exchange of queries and results.</li>
                <li><strong>LDAP (Lightweight Directory Access Protocol):</strong> LDAP uses session-layer services to manage communication between clients and directory services, facilitating the exchange of information about users and resources in a network.</li>
              </ul>
            </section>

            <section className="session-layer-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Importance of the Session Layer</h2>
              <p>
                The session layer plays a critical role in ensuring that communication between systems is reliable, efficient, and well-organized. Without it, data transmission would be chaotic, and systems would have difficulty establishing, maintaining, or terminating connections properly.
              </p>
              <p>Some key reasons the session layer is important include:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Organization:</strong> It organizes the flow of data, making communication between systems more predictable and structured.</li>
                <li><strong>Synchronization:</strong> It ensures that data is sent in the correct sequence and synchronizes the timing of data transfers.</li>
                <li><strong>Reliability:</strong> The session layer helps in establishing reliable sessions and ensures data consistency during the communication process.</li>
                <li><strong>Security:</strong> In some cases, the session layer helps provide security features, such as authentication, for communication between systems.</li>
              </ul>
            </section>

            <section className="session-layer-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Session Layer in Real-World Applications</h2>
              <p>
                The session layer is often used in applications where a continuous exchange of data or a reliable connection is required. Some real-world applications and use cases where the session layer is crucial include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Online Banking:</strong> Session management is used to maintain secure, persistent connections between users and banking servers during online transactions.</li>
                <li><strong>Video Conferencing:</strong> The session layer manages the continuous data flow and synchronization between participants in a video call.</li>
                <li><strong>File Transfer Protocol (FTP):</strong> The session layer handles the connection between the client and server during file transfer sessions, ensuring that files are transferred properly and in sequence.</li>
                <li><strong>Cloud Services:</strong> Cloud-based applications use session management to maintain active connections between users and servers, ensuring data consistency and integrity.</li>
              </ul>
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}
