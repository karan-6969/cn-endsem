"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import gsap from "gsap"

interface SideNavProps {
  className?: string
}

export function SideNav({ className }: SideNavProps) {
  const pathname = usePathname()
  const navRef = useRef(null)

  useEffect(() => {
    gsap.from(navRef.current?.children || [], {
      x: -50,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "power2.out",
    })
  }, [])

  const topics = [
    { href: "/topics/bus-topology", title: "Bus Topology" },
    { href: "/topics/transmission-media", title: "Transmission Media" },
    { href: "/topics/data-link-vs-network", title: "Data Link vs Network Layer" },
    { href: "/topics/vlsm", title: "VLSM" },
    { href: "/topics/dynamic-vector-routing", title: "Dynamic Vector Routing" },
    { href: "/topics/link-state-routing", title: "Link State Routing" },
    { href: "/topics/ip-protocols", title: "IP Protocols" },
    { href: "/topics/ip-datagram", title: "IP Datagram Format" },
    { href: "/topics/multicast-conversion", title: "Multicast IP to MAC" },
    { href: "/topics/tcp-establishment", title: "TCP Connection Establishment" },
    { href: "/topics/tcp-aimd", title: "TCP AIMD" },
    { href: "/topics/tcp-congestion", title: "TCP Congestion Control" },
    { href: "/topics/traffic-shaping", title: "Traffic Shaping" },
    { href: "/topics/tcp-fragmentation", title: "TCP Fragmentation" },
    { href: "/topics/dns", title: "DNS" },
    { href: "/topics/http-https", title: "HTTP and HTTPS" },
    { href: "/topics/ftp-smtp", title: "FTP and SMTP" },
    { href: "/topics/telnet", title: "Telnet" },
    { href: "/topics/session-layer", title: "Session Layer" },
    { href: "/topics/presentation-layer", title: "Presentation Layer" },
  ]

  return (
    <nav ref={navRef} className={cn("flex flex-col space-y-1", className)}>
      <Link
        href="/"
        className={cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-md",
          pathname === "/"
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        Home
      </Link>
      {topics.map((topic) => (
        <Link
          key={topic.href}
          href={topic.href}
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-md",
            pathname === topic.href
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {topic.title}
        </Link>
      ))}
    </nav>
  )
}
