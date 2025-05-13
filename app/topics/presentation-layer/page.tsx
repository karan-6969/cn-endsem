"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"

export default function PresentationLayerPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".presentation-layer-section", {
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
              <span className="text-sm font-medium">Presentation Layer</span>
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Presentation Layer</h1>
            <p className="text-muted-foreground">
              Understand the role of the Presentation Layer in the OSI model and how it is responsible for data translation, encryption, and compression.
            </p>
          </div>

          <div ref={contentRef} className="space-y-10">
            <section className="presentation-layer-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">What is the Presentation Layer?</h2>
              <p>
                The Presentation Layer is the sixth layer in the OSI (Open Systems Interconnection) model. It serves as the intermediary between the application layer and the transport layer. Its primary role is to ensure that the data sent from the application layer of one system can be understood by the application layer of another system, regardless of the system's architecture or data formats.
              </p>
              <p>
                The Presentation Layer is responsible for translating, encrypting, and compressing data. It handles tasks such as converting between different character encodings, ensuring data is in a format suitable for communication.
              </p>
            </section>

            <section className="presentation-layer-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Functions of the Presentation Layer</h2>
              <p>
                The Presentation Layer performs several critical functions to ensure seamless communication between systems:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Data Translation:</strong> Converts data from one format to another (e.g., EBCDIC to ASCII, JPEG to GIF).</li>
                <li><strong>Data Compression:</strong> Reduces the size of data for efficient transmission. Compression techniques include algorithms like ZIP, JPEG, and MP3.</li>
                <li><strong>Data Encryption:</strong> Encrypts data to secure it during transmission, ensuring that it can only be decrypted by the intended recipient.</li>
                <li><strong>Data Serialization:</strong> Converts complex data structures into a format that can be easily transmitted over the network, often using formats like JSON, XML, or Protocol Buffers.</li>
              </ul>
            </section>

            <section className="presentation-layer-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Examples of Presentation Layer Protocols</h2>
              <p>
                Various protocols operate at the Presentation Layer, handling data translation, encryption, and compression. Some examples include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>SSL/TLS:</strong> Secure Socket Layer (SSL) and Transport Layer Security (TLS) are used to encrypt data, ensuring secure communication over the internet (e.g., HTTPS).</li>
                <li><strong>JPEG, GIF, PNG:</strong> Image formats that define how image data is compressed and encoded for transmission over the network.</li>
                <li><strong>ASCII, EBCDIC:</strong> Character encodings used for representing text data in different formats.</li>
                <li><strong>XML, JSON:</strong> Serialization formats used to structure and transfer data between systems in a readable format.</li>
              </ul>
            </section>

            <section className="presentation-layer-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Importance of the Presentation Layer</h2>
              <p>
                The Presentation Layer is essential because it ensures that data can be correctly understood and processed by the receiving system, regardless of the internal structure or format used by the sending system. Without the Presentation Layer, different systems with different data formats or encoding schemes would struggle to communicate effectively.
              </p>
              <p>
                By standardizing data representation and providing encryption and compression, the Presentation Layer contributes significantly to the overall efficiency and security of data communication across diverse systems.
              </p>
            </section>

            <section className="presentation-layer-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Challenges in the Presentation Layer</h2>
              <p>
                While the Presentation Layer is crucial for enabling interoperability between different systems, it also faces challenges:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Data Format Incompatibility:</strong> Different systems may use incompatible data formats, which can cause difficulties in translation and lead to errors in data interpretation.</li>
                <li><strong>Performance Overhead:</strong> The tasks of data encryption and compression can introduce additional processing overhead, which may impact performance, especially in real-time systems.</li>
                <li><strong>Security Concerns:</strong> Ensuring the security of data during transmission is a significant concern. If the encryption methods used in the Presentation Layer are weak, the data could be vulnerable to interception or tampering.</li>
              </ul>
            </section>

            <section className="presentation-layer-section space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Real-World Applications of the Presentation Layer</h2>
              <p>
                In the real world, the Presentation Layer plays a key role in various technologies and systems, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li><strong>Web Browsing:</strong> In HTTPS, the Presentation Layer encrypts the data exchanged between the client and server using SSL/TLS, ensuring secure communication over the web.</li>
                <li><strong>File Compression:</strong> Tools like ZIP and TAR rely on the Presentation Layer to compress and decompress files before they are sent or received over a network.</li>
                <li><strong>Image and Video Formats:</strong> Image formats like JPEG and PNG and video formats like MP4 use the Presentation Layer to encode and compress media for efficient transmission.</li>
                <li><strong>APIs:</strong> APIs (such as RESTful APIs) often rely on the Presentation Layer to serialize and deserialize data between systems, using formats like JSON or XML.</li>
              </ul>
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}
