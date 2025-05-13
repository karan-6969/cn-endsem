"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function HttpHttpsPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".httphttps-section", {
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
              <span className="text-sm font-medium">HTTP & HTTPS</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/ftp-smtp">
                Previous Topic
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/ftp-smtp">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">HTTP & HTTPS Protocols</h1>
            <p className="text-muted-foreground">
              Learn about the HTTP (Hypertext Transfer Protocol) and HTTPS (Hypertext Transfer Protocol Secure) – the foundation protocols for communication over the internet.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="httphttps-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is HTTP?</h2>
              <p>
                HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the web. It defines how messages are formatted and transmitted between clients (like web browsers) and servers.
              </p>
            </section>

            <section className="httphttps-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How HTTP Works</h2>
              <p>
                HTTP is a request-response protocol. The client sends an HTTP request to the server for resources (like HTML pages, images, or videos), and the server responds with the requested data.
              </p>
              <p>
                An HTTP request consists of a request line, headers, and an optional body. The server responds with a status line, headers, and the requested data.
              </p>
              <div className="space-y-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <div className="bg-indigo-600 text-white p-3 rounded shadow">
                  <strong>HTTP Request:</strong> A request made by the client to the server for a resource.
                </div>
                <div className="bg-green-600 text-white p-3 rounded shadow">
                  <strong>HTTP Response:</strong> A response from the server with the requested resource or an error message.
                </div>
              </div>
            </section>

            <section className="httphttps-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">HTTP Methods</h2>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>GET:</strong> Retrieve data from the server (e.g., a webpage).</li>
                <li><strong>POST:</strong> Submit data to the server (e.g., form submissions).</li>
                <li><strong>PUT:</strong> Update data on the server.</li>
                <li><strong>DELETE:</strong> Remove data from the server.</li>
                <li><strong>PATCH:</strong> Partially update data on the server.</li>
              </ul>
            </section>

            <section className="httphttps-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is HTTPS?</h2>
              <p>
                HTTPS (Hypertext Transfer Protocol Secure) is an extension of HTTP that adds a layer of security by encrypting the communication using SSL/TLS (Secure Sockets Layer/Transport Layer Security).
              </p>
            </section>

            <section className="httphttps-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How HTTPS Works</h2>
              <p>
                HTTPS works by using SSL/TLS to establish an encrypted connection between the client and server. This ensures that the data transmitted is secure and cannot be intercepted by attackers.
              </p>
              <div className="space-y-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <div className="bg-indigo-600 text-white p-3 rounded shadow">
                  <strong>SSL/TLS Handshake:</strong> The process that establishes a secure connection between the client and server.
                </div>
                <div className="bg-green-600 text-white p-3 rounded shadow">
                  <strong>Encryption:</strong> Data is encrypted to prevent eavesdropping and tampering during transmission.
                </div>
              </div>
            </section>

            <section className="httphttps-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">HTTP vs HTTPS</h2>
              <p>
                The main difference between HTTP and HTTPS is security. HTTP is not encrypted, meaning data transmitted can be intercepted, whereas HTTPS uses SSL/TLS encryption to secure data.
              </p>
              <div className="space-y-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <div className="bg-indigo-600 text-white p-3 rounded shadow">
                  <strong>HTTP:</strong> Unsecured communication; data can be intercepted.
                </div>
                <div className="bg-green-600 text-white p-3 rounded shadow">
                  <strong>HTTPS:</strong> Secured communication; data is encrypted and protected.
                </div>
              </div>
            </section>

            <section className="httphttps-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">TLS Certificates in HTTPS</h2>
              <p>
                TLS certificates are used in HTTPS to ensure the server's authenticity. They are issued by Certificate Authorities (CAs) and are used to encrypt data between the server and client.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Public Key:</strong> Used to encrypt data, ensuring that only the server can decrypt it.</li>
                <li><strong>Private Key:</strong> Kept secret by the server to decrypt incoming data.</li>
                <li><strong>CA Certificate:</strong> Verifies the identity of the server to ensure it's trusted.</li>
              </ul>
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}
