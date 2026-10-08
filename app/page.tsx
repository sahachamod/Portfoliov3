import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { CTF } from "@/components/CTF";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { ResponsibleDisclosure } from "@/components/ResponsibleDisclosure";
import { SecurityArsenal } from "@/components/SecurityArsenal";
import { Writing } from "@/components/Writing";
import { jsonLdArticles, jsonLdPerson } from "@/lib/data";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }} />
      {jsonLdArticles.length > 0 ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticles) }} />
      ) : null}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Achievements />
        <Research />
        <ResponsibleDisclosure />
        <Projects />
        <SecurityArsenal />
        <CTF />
        <Education />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
