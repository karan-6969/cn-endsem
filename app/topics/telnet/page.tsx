"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function TelnetPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".telnet-section", {
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
              <span className="text-sm font-medium">Telnet</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/http-https">
                Previous Topic
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/http-https">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Telnet</h1>
            <p className="text-muted-foreground">
              Learn about Telnet, its history, use cases, security concerns, and modern alternatives.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="telnet-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is Telnet?</h2>
              <p>
                Telnet is a network protocol used to provide a command-line interface for communication with remote devices. It allows a user to connect to a remote system over a TCP/IP network, such as the internet or a local area network (LAN), and interact with that system as though they were physically present.
              </p>
              <p>
                Telnet was one of the earliest protocols developed for remote access and was originally developed in the 1960s. It operates over port 23 by default and uses a simple text-based interface to communicate with the remote system.
              </p>
            </section>

            <section className="telnet-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How Telnet Works</h2>
              <p>
                Telnet works on a client-server model. The Telnet client is a software that allows users to send commands to the Telnet server, which is running on the remote system.
              </p>
              <p>
                The Telnet client establishes a connection to the remote server over TCP port 23. Once connected, users can log into the remote system and execute commands on it as if they were interacting directly with the system.
              </p>
              <p>
                Communication in Telnet is typically unencrypted, meaning the data, including login credentials, is transmitted in plaintext. This is one of the primary security concerns associated with Telnet.
              </p>
            </section>

            <section className="telnet-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Telnet Use Cases</h2>
              <p>
                While Telnet has been largely replaced by more secure protocols like SSH, it still has some use cases, especially in legacy systems or for specific tasks:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Remote Administration:</strong> Telnet was historically used by system administrators to manage remote servers and network devices.</li>
                <li><strong>Network Testing:</strong> Telnet can be used to test the connectivity to remote devices or services by connecting to specific ports.</li>
                <li><strong>Legacy Systems:</strong> Some older devices or systems may still rely on Telnet for remote management, especially if they lack support for more modern protocols like SSH.</li>
                <li><strong>Learning and Education:</strong> Telnet is often used in educational settings to teach the basics of networking and remote connections.</li>
              </ul>
            </section>

            <section className="telnet-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Security Concerns with Telnet</h2>
              <p>
                Telnet's most significant drawback is its lack of security. Since Telnet transmits data, including sensitive information like usernames and passwords, in plaintext, it is highly vulnerable to interception and attacks.
              </p>
              <p>
                Some of the key security risks associated with Telnet include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Data Interception:</strong> Since the communication is unencrypted, attackers can easily capture and read data transmitted over the network.</li>
                <li><strong>Man-in-the-Middle Attacks:</strong> An attacker can intercept the communication between the client and server, potentially injecting malicious commands or stealing sensitive data.</li>
                <li><strong>Password Exposure:</strong> Login credentials sent over Telnet can be easily compromised by attackers monitoring network traffic.</li>
              </ul>
              <p>
                Due to these risks, Telnet is generally not recommended for modern use unless on a trusted, isolated network.
              </p>
            </section>

            <section className="telnet-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Alternatives to Telnet</h2>
              <p>
                Telnet's security vulnerabilities have led to the development of more secure alternatives. The most notable of these is SSH (Secure Shell), which provides encrypted communication between the client and server.
              </p>
              <p>
                Some of the most commonly used alternatives to Telnet include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>SSH (Secure Shell):</strong> SSH encrypts all communication, including login credentials and commands, ensuring secure remote access to systems.</li>
                <li><strong>RDP (Remote Desktop Protocol):</strong> RDP provides a graphical interface for remote desktop access, typically used with Windows servers and workstations.</li>
                <li><strong>VNC (Virtual Network Computing):</strong> VNC is another remote access protocol that provides graphical interface access to remote systems.</li>
              </ul>
            </section>

            <section className="telnet-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How to Use Telnet</h2>
              <p>
                To use Telnet, you can use a Telnet client such as the built-in `telnet` command in many operating systems, or third-party Telnet clients like PuTTY.
              </p>
              <p>
                Example of using Telnet in a terminal or command prompt:
              </p>
              <pre className="bg-gray-800 text-white p-4 rounded-md">
                <code className="language-bash">
                  telnet example.com 23
                </code>
              </pre>
              <p>
                After connecting, you can enter your login credentials (if required) and interact with the remote system via a command-line interface.
              </p>
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}
