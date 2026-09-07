import React from "react";
import ResumeSection from "../ResumeSection";

const AtsTemplate = ({ resume }) => {
  const {
    userData,
    summary,
    skills = [],
    experience = [],
    projects = [],
    education = [],
    achievements = [],
    certifications = [],
    socialLinks = [],
  } = resume;

  return (
    <div className="resume-template ats-template">

      {/* HEADER */}
      <header className="ats-header">

        <h1>
          {userData?.name || "Your Name"}
        </h1>

        {userData?.professionType && (
          <div className="ats-title">
            {userData.professionType}
          </div>
        )}

        <div className="ats-contact">

          {userData?.email && (
            <span>{userData.email}</span>
          )}

          {userData?.location && (
            <span>{userData.location}</span>
          )}

          {userData?.country && (
            <span>{userData.country}</span>
          )}

        </div>

      </header>

      {/* SUMMARY */}
      {summary && (
        <ResumeSection title="Professional Summary">
          <p>{summary}</p>
        </ResumeSection>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <ResumeSection title="Technical Skills">

          <div className="ats-skills">

            {skills.map((skill, index) => (
              <span key={index}>
                {skill.name}
                {skill.proficiency &&
                  ` (${skill.proficiency})`}
                {index < skills.length - 1 && ", "}
              </span>
            ))}

          </div>

        </ResumeSection>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <ResumeSection title="Professional Experience">

          {experience.map((item, index) => (
            <article
              className="ats-experience"
              key={index}
            >

              <div className="ats-item-header">

                <div>

                  <h3>
                    {item.role}
                  </h3>

                  <strong>
                    {item.company}
                  </strong>

                </div>

                <span>
                  {item.startDate}
                  {" - "}
                  {item.endDate || "Present"}
                </span>

              </div>

              {item.responsibilities?.length > 0 && (
                <ul>

                  {item.responsibilities.map(
                    (responsibility, responsibilityIndex) => (
                      <li key={responsibilityIndex}>
                        {responsibility}
                      </li>
                    )
                  )}

                </ul>
              )}

            </article>
          ))}

        </ResumeSection>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <ResumeSection title="Projects">

          {projects.map((project, index) => (
            <article
              className="ats-project"
              key={index}
            >

              <h3>
                {project.name}
              </h3>

              {project.description && (
                <p>
                  {project.description}
                </p>
              )}

              {project.technologies?.length > 0 && (
                <p>
                  <strong>
                    Technologies:
                  </strong>{" "}
                  {project.technologies.join(", ")}
                </p>
              )}

              {project.url && (
                <p>
                  <strong>
                    URL:
                  </strong>{" "}
                  {project.url}
                </p>
              )}

            </article>
          ))}

        </ResumeSection>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <ResumeSection title="Education">

          {education.map((item, index) => (
            <article
              className="ats-education"
              key={index}
            >

              <div>

                <h3>
                  {item.degree}
                </h3>

                <p>
                  {item.institute}
                </p>

              </div>

              <span>
                {item.startYear}
                {" - "}
                {item.endYear}
              </span>

            </article>
          ))}

        </ResumeSection>
      )}

      {/* ACHIEVEMENTS */}
      {achievements.length > 0 && (
        <ResumeSection title="Achievements">

          <ul>
            {achievements.map(
              (achievement, index) => (
                <li key={index}>
                  {achievement}
                </li>
              )
            )}
          </ul>

        </ResumeSection>
      )}

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <ResumeSection title="Certifications">

          <ul>
            {certifications.map(
              (certification, index) => (
                <li key={index}>
                  {certification}
                </li>
              )
            )}
          </ul>

        </ResumeSection>
      )}

      {/* LINKS */}
      {socialLinks.length > 0 && (
        <ResumeSection title="Links">

          <div className="ats-links">

            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            ))}

          </div>

        </ResumeSection>
      )}

    </div>
  );
};

export default AtsTemplate;