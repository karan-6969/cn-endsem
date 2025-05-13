"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, Menu } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function HomePage() {
  const headerRef = useRef(null)
  const heroRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Header animation
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })

    // Hero section animation
    gsap.from(heroRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    })

    // Cards staggered animation
    gsap.from(".topic-card", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%",
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const topics = [
    {
      id: "bus-topology",
      title: "Bus Topology",
      description: "Learn about the fundamental network topology where all devices connect to a single cable.",
    },
    {
      id: "transmission-media",
      title: "Different Types of Transmission Media",
      description: "Explore guided and unguided transmission media used in networking.",
    },
    {
      id: "data-link-vs-network",
      title: "Difference between Data Link Layer and Network Layer",
      description: "Understand the distinct roles of OSI layers 2 and 3.",
    },
    {
      id: "vlsm",
      title: "VLSM",
      description: "Master Variable Length Subnet Masking for efficient IP address allocation.",
    },
    {
      id: "dynamic-vector-routing",
      title: "Dynamic Vector Routing",
      description: "Learn how routers exchange routing information dynamically.",
    },
    {
      id: "link-state-routing",
      title: "Link State Routing",
      description: "Understand how routers build a complete topology map of the network.",
    },
    {
      id: "ip-protocols",
      title: "IP Protocols",
      description: "Explore IP, ICMP, IGMP, ARP, and RARP protocols in detail.",
    },
    {
      id: "ip-datagram",
      title: "IP Datagram Format",
      description: "Analyze the structure and fields of an IP datagram.",
    },
    {
      id: "multicast-conversion",
      title: "Conversion from Multicast IP Address to MAC Address",
      description: "Learn how multicast IP addresses map to MAC addresses.",
    },
    {
      id: "tcp-establishment",
      title: "TCP Connection Establishment",
      description: "Understand the three-way handshake process.",
    },
    {
      id: "tcp-aimd",
      title: "TCP Congestion Control: AIMD",
      description: "Learn about Additive Increase Multiplicative Decrease mechanisms.",
    },
    {
      id: "tcp-congestion",
      title: "TCP Congestion Control",
      description: "Explore Open Loop and Closed Loop Congestion control methods.",
    },
    {
      id: "traffic-shaping",
      title: "Traffic Shaping",
      description: "Understand Token Bucket and Leaky Bucket algorithms.",
    },
    { id: "tcp-fragmentation", title: "TCP Fragmentation", description: "Learn how TCP handles large data packets." },
    { id: "dns", title: "DNS", description: "Explore the Domain Name System in depth." },
    { id: "http-https", title: "HTTP and HTTPS", description: "Understand web protocols and secure communication." },
    {
      id: "ftp-smtp",
      title: "FTP and SMTP",
      description: "Learn about file transfer and email transmission protocols.",
    },
    { id: "telnet", title: "Telnet", description: "Explore the terminal emulation protocol." },
    { id: "session-layer", title: "Session Layer", description: "Understand the fifth layer of the OSI model." },
    {
      id: "presentation-layer",
      title: "Presentation Layer",
      description: "Learn about the sixth layer of the OSI model.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-5 w-5" />
            <span>EndSem</span>
          </div>
          <div className="hidden md:flex gap-6">

           
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SideNav className="mt-8" />
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="container py-8 md:py-12">
        <section ref={heroRef} className="py-12 md:py-16 lg:py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
            Master Computer Networking
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A comprehensive guide covering essential networking concepts from the fundamentals to advanced protocols.
          </p>
          <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80">
            <Link href="#topics">
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>

        <section id="topics" ref={cardsRef} className="py-12">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center text-slate-900 dark:text-white">
            Topics Covered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <Card key={topic.id} className="topic-card shadow-lg rounded-lg transition-transform hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{topic.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{topic.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/topics/${topic.id}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40 py-8 md:py-12">
        <div className="container flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-5 w-5" />
            <span>EndSem</span>
          </div>
          <p>© {new Date().getFullYear()}Jaldi Padho BC.</p>
        </div>
      </footer>
    </div>
  )
}
