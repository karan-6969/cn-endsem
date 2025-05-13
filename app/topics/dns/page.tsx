"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function DnsPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".dns-section", {
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
              <span className="text-sm font-medium">DNS</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/tcp-congestion-control">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Domain Name System (DNS)</h1>
            <p className="text-muted-foreground">
              Discover how DNS works to map domain names to IP addresses, enabling us to access websites using human-readable addresses.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="dns-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is DNS?</h2>
              <p>
                The Domain Name System (DNS) is a hierarchical system that translates human-readable domain names (like www.example.com) into IP addresses that computers use to identify each other on the network.
              </p>
            </section>

            <section className="dns-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How DNS Works</h2>
              <p>
                When you type a URL in the browser, DNS queries are sent to a DNS resolver, which then searches for the corresponding IP address and returns it. The browser then connects to the server at that IP address to load the website.
              </p>
              <div className="space-y-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <div className="bg-indigo-600 text-white p-3 rounded shadow">
                  <strong>DNS Resolver:</strong> The component that queries DNS records and caches them for efficiency.
                </div>
                <div className="bg-green-600 text-white p-3 rounded shadow">
                  <strong>Root DNS Servers:</strong> The top-level DNS servers that direct queries to the correct authoritative DNS servers.
                </div>
                <div className="bg-rose-600 text-white p-3 rounded shadow">
                  <strong>Authoritative DNS Servers:</strong> These servers hold the actual DNS records for domains.
                </div>
              </div>
            </section>

            <section className="dns-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">DNS Query Process</h2>
              <p>
                DNS queries follow these steps:
              </p>
              <ol className="list-decimal pl-6">
                <li>The user enters a domain name in the browser.</li>
                <li>The DNS resolver checks its cache for the IP address.</li>
                <li>If the address isn't cached, the resolver queries the root DNS server.</li>
                <li>The resolver is directed to the authoritative DNS server for the domain.</li>
                <li>The authoritative DNS server responds with the IP address for the domain.</li>
                <li>The resolver returns the IP address to the browser, which loads the website.</li>
              </ol>
            </section>

            <section className="dns-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Types of DNS Records</h2>
              <div className="space-y-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <div className="bg-indigo-600 text-white p-3 rounded shadow">
                  <strong>A Record:</strong> Maps a domain name to an IPv4 address.
                </div>
                <div className="bg-green-600 text-white p-3 rounded shadow">
                  <strong>AAAA Record:</strong> Maps a domain name to an IPv6 address.
                </div>
                <div className="bg-rose-600 text-white p-3 rounded shadow">
                  <strong>CNAME Record:</strong> Maps an alias domain name to a canonical domain name.
                </div>
                <div className="bg-blue-600 text-white p-3 rounded shadow">
                  <strong>MX Record:</strong> Defines mail servers for a domain.
                </div>
              </div>
            </section>

            <section className="dns-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Benefits of DNS</h2>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Enables human-readable domain names instead of IP addresses</li>
                <li>Improves scalability of the internet</li>
                <li>Provides load balancing and redundancy for websites</li>
                <li>Enhances security with DNSSEC (Domain Name System Security Extensions)</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
