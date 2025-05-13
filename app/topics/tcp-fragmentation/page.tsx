"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function TCPFragmentationPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".tcp-fragmentation-section", {
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
              <span className="text-sm font-medium">TCP Fragmentation</span>
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">TCP Fragmentation</h1>
            <p className="text-muted-foreground">
              Learn about TCP fragmentation, how it works, why it's important, and solve example problems to understand the process better.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="tcp-fragmentation-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is TCP Fragmentation?</h2>
              <p>
                TCP fragmentation refers to the process of breaking large data packets into smaller, manageable pieces before sending them across the network. It happens when the size of a TCP segment exceeds the Maximum Transmission Unit (MTU) of the network link.
              </p>
              <p>
                Fragmentation ensures that the data can be transmitted efficiently over various types of networks with different MTUs. Once these smaller fragments reach their destination, they are reassembled into the original data packet.
              </p>
            </section>

            <section className="tcp-fragmentation-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Why is TCP Fragmentation Important?</h2>
              <p>
                TCP fragmentation is crucial for the efficient transmission of large amounts of data across a network. Without fragmentation:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Large packets might be dropped if they exceed the MTU of the link.</li>
                <li>The network can become inefficient as smaller, manageable chunks of data are not transmitted effectively.</li>
                <li>It ensures that all devices in the network, even those with different MTU sizes, can communicate properly without data loss.</li>
              </ul>
            </section>

            <section className="tcp-fragmentation-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How Does TCP Fragmentation Work?</h2>
              <p>
                When a large TCP packet is to be sent, it is first checked against the MTU of the path between the sender and receiver. If the packet size exceeds the MTU, the data is broken down into smaller fragments that can fit within the MTU.
              </p>
              <p>
                Each fragment will have its own header, with necessary information to help reassemble the fragments correctly once they reach the destination. Important fields include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Identification Field:</strong> This field is used to identify all fragments that belong to the same packet.</li>
                <li><strong>Flags:</strong> The "More Fragments" flag indicates whether a fragment is the last one or if more fragments are coming.</li>
                <li><strong>Fragment Offset:</strong> Indicates where the fragment fits into the original data stream, helping in reassembly.</li>
                <li><strong>Checksum:</strong> A checksum is used to verify the integrity of each fragment.</li>
              </ul>
            </section>

            <section className="tcp-fragmentation-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Example Problem: Fragmentation Process</h2>
              <p>
                Let's assume we have a 1500-byte data packet, and the MTU of the network path is 500 bytes. Here's how fragmentation would occur:
              </p>

              <h3 className="text-xl font-semibold">Given:</h3>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Original Packet Size: 1500 bytes</li>
                <li>MTU: 500 bytes</li>
                <li>Header Size: 20 bytes (per fragment)</li>
              </ul>

              <h3 className="text-xl font-semibold">Step-by-step Fragmentation:</h3>
              <ul className="list-decimal pl-6 text-muted-foreground">
                <li>
                  The first fragment will carry 480 bytes of data (500 bytes - 20 bytes header).
                </li>
                <li>
                  The second fragment will carry the next 480 bytes of data.
                </li>
                <li>
                  The third fragment will carry the remaining 480 bytes of data.
                </li>
                <li>
                  The fourth fragment will carry the last 60 bytes of data.
                </li>
              </ul>
              <p>
                As the fragments travel through the network, they are reassembled at the destination based on the information in their headers.
              </p>
            </section>

            <section className="tcp-fragmentation-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Example Problem: Reassembly Process</h2>
              <p>
                Let's now consider the reassembly process at the receiver's end for the previously fragmented data.
              </p>
              <h3 className="text-xl font-semibold">Given:</h3>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Four fragments received: 480 bytes, 480 bytes, 480 bytes, and 60 bytes.</li>
                <li>Each fragment has the same Identification Field.</li>
                <li>The "More Fragments" flag is set for the first three fragments, and it is cleared for the last one.</li>
              </ul>

              <h3 className="text-xl font-semibold">Reassembly Process:</h3>
              <ul className="list-decimal pl-6 text-muted-foreground">
                <li>
                  The receiver uses the Identification Field to group fragments into the same packet.
                </li>
                <li>
                  The Fragment Offset and the "More Fragments" flag tell the receiver where each fragment fits in the original data stream.
                </li>
                <li>
                  Finally, the fragments are reassembled in the correct order to recreate the original 1500-byte data packet.
                </li>
              </ul>
            </section>

            <section className="tcp-fragmentation-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">TCP Fragmentation Issues</h2>
              <p>
                While fragmentation is necessary, it can introduce some problems, such as:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Increased Overhead:</strong> Each fragment has its own header, increasing the total size of the data being transmitted.</li>
                <li><strong>Reassembly Delays:</strong> The reassembly process introduces delays, especially if fragments are lost or out of order.</li>
                <li><strong>Packet Loss:</strong> If any fragment is lost, the entire packet must be retransmitted, which impacts performance.</li>
              </ul>
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}
