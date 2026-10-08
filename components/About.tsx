import { Reveal } from "./MotionPrimitives";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="section-shell py-24">
      <SectionHeading eyebrow="ABOUT" title="Who is Sahan Chamod?" />
      <div className="mt-10">
        <Reveal>
          <div className="glass-panel h-full rounded-lg p-7">
            <div className="max-w-4xl space-y-6 text-lg leading-9 text-slate-300">
              <p>
                Sahan Chamod is a DevSecOps Engineer and Cybersecurity Researcher with a Computer Science background and full-stack software
                engineering experience. His
                work focuses on secure software delivery, application and infrastructure security, cloud security, security automation,
                penetration testing, vulnerability research, and security engineering.
              </p>
              <p>
                He has hands-on experience across CI/CD security, AWS and Azure, Docker, Kubernetes, source-code review, web application
                security, Linux, reverse engineering, and offensive security. His approach combines practical security testing with continuous
                technical research, exploring how modern applications, systems, and infrastructure behave, where they fail, and how those
                weaknesses can be responsibly identified and mitigated.
              </p>
              <p>
                He is active in bug bounty programs and international Capture The Flag competitions across web security, penetration testing,
                reverse engineering, digital forensics, cloud security, blockchain security, and binary exploitation, and publishes technical
                research and educational content on security topics. His work is centered on understanding systems at a deeper technical level,
                discovering vulnerabilities through structured research, and using responsible disclosure to help make software and
                infrastructure more secure.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
