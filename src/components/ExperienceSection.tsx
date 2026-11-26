import {
  WORK_EXPERIENCES,
  EDUCATION,
  MILESTONES,
  LEETCODE_DATA,
} from "@/data/experience";
import CTAIcon from "./CTAIcon";
export default function ExperienceSection() {
  return (
    <>
      <section id="experience" className="section-pad shell" tabIndex={-1}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPERIENCE</p>
            <h2>
              Learning by
              <br />
              <span className="outlined-word">building.</span>
            </h2>
          </div>
          <a
            className="text-link"
            href="/Mahmud_Adegboyega_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            The full CV <CTAIcon />
          </a>
        </div>
        <div className="experience-list">
          {[...WORK_EXPERIENCES].reverse().map((work, i) => (
            <details key={work.id} className="experience-row" open={i === 0}>
              <summary>
                <span className="row-number">0{i + 1}</span>
                <span>
                  <strong>{work.company}</strong>
                  <span className="role-name">{work.role}</span>
                </span>
                <span className="experience-date">{work.period}</span>
                <span className="expand-symbol" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="experience-details">
                <p className="eyebrow">{work.location}</p>
                <ul>
                  {work.achievements.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
                <div className="tags">
                  {work.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
      <section id="about" className="about-section section-pad">
        <div className="shell about-grid">
          <div>
            <p className="eyebrow">A LITTLE CONTEXT</p>
            <h2>
              People first.
              <br />
              Software second.
            </h2>
            <p className="about-copy">
              I’m interested in the places where technology meets everyday life
            </p>
            <p className="about-copy">
              That’s the thread through my work. I’m studying Software
              Engineering at FUTA, building with teams, and working toward
              founding a startup that solves meaningful problems in Africa.
            </p>
            <a
              className="text-link"
              href="https://github.com/MahmudChiv"
              target="_blank"
              rel="noopener noreferrer"
            >
              See what I’m building <CTAIcon />
            </a>
          </div>
          <div className="notebook">
            <div className="notebook-header">
              <span>ALWAYS A WORK IN PROGRESS</span>
              <span aria-hidden="true">✳</span>
            </div>
            <div className="note-entry">
              <p className="eyebrow">THE FOUNDATION</p>
              <h3>{EDUCATION.degree}</h3>
              <p>{EDUCATION.institution}</p>
              <small>{EDUCATION.period}</small>
            </div>
            {MILESTONES.map((m) => (
              <div className="note-entry" key={m.id}>
                <p className="eyebrow">{m.badge || "BUILDING TOGETHER"}</p>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
              </div>
            ))}
            <a
              className="note-entry text-link"
              href={LEETCODE_DATA.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Practising the fundamentals on LeetCode <CTAIcon />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
