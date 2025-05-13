"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function FtpSmtpPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".ftpsmtp-section", {
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
              <span className="text-sm font-medium">FTP & SMTP</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/dns">
                Previous Topic
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href="/topics/telnet">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">FTP & SMTP Protocols</h1>
            <p className="text-muted-foreground">
              Learn about the FTP (File Transfer Protocol) and SMTP (Simple Mail Transfer Protocol) – key protocols in the transmission of files and emails over the internet.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="ftpsmtp-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is FTP?</h2>
              <p>
                FTP (File Transfer Protocol) is a standard network protocol used to transfer files from one host to another over a TCP-based network, such as the internet.
              </p>
            </section>

            <section className="ftpsmtp-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How FTP Works</h2>
              <p>
                FTP operates on the client-server model where an FTP client connects to an FTP server to download or upload files. It uses two channels: a command channel (usually port 21) for sending commands and a data channel for transferring the files.
              </p>
              <div className="space-y-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <div className="bg-indigo-600 text-white p-3 rounded shadow">
                  <strong>Active Mode:</strong> The client opens a random port and waits for the server to connect.
                </div>
                <div className="bg-green-600 text-white p-3 rounded shadow">
                  <strong>Passive Mode:</strong> The server opens a random port and the client connects to it.
                </div>
              </div>
            </section>

            <section className="ftpsmtp-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">FTP Commands</h2>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>USER:</strong> Used to authenticate the client.</li>
                <li><strong>PASS:</strong> Used to send the password for authentication.</li>
                <li><strong>STOR:</strong> Upload a file to the server.</li>
                <li><strong>RETR:</strong> Download a file from the server.</li>
              </ul>
            </section>

            <section className="ftpsmtp-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is SMTP?</h2>
              <p>
                SMTP (Simple Mail Transfer Protocol) is a communication protocol used for sending emails across the internet. It works by transferring emails between mail servers.
              </p>
            </section>

            <section className="ftpsmtp-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">How SMTP Works</h2>
              <p>
                SMTP works by sending the email from the client (the sender) to an SMTP server (through port 25) which routes it to the recipient's SMTP server, and finally to the recipient's inbox via IMAP or POP3.
              </p>
              <div className="space-y-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <div className="bg-indigo-600 text-white p-3 rounded shadow">
                  <strong>SMTP Client:</strong> Sends email to the server for delivery.
                </div>
                <div className="bg-green-600 text-white p-3 rounded shadow">
                  <strong>SMTP Server:</strong> Routes the email to the recipient's email server.
                </div>
              </div>
            </section>

            <section className="ftpsmtp-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">SMTP Commands</h2>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>HELO:</strong> Identifies the client to the server.</li>
                <li><strong>MAIL FROM:</strong> Specifies the sender's email address.</li>
                <li><strong>RCPT TO:</strong> Specifies the recipient's email address.</li>
                <li><strong>DATA:</strong> Begins the email content transfer.</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
