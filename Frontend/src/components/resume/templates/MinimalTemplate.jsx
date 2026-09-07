import React from "react";
import ResumeSection from "../ResumeSection";

const MinimalTemplate = ({ resume }) => {
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
    <div className="resume-template minimal-template">

      {/* HEADER */}
      <header className="minimal-header">

        <h1>
          {userData?.name || "Your Name"}
        </h1>

        {userData?.professionType && (
          <p>
            {userData.professionType}
          </p>
        )}

        <div className="minimal-contact">

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

      {summary && (
        <ResumeSection title="Summary">
          <p>{summary}</p>
        </ResumeSection>
      )}

      {skills.length > 0 && (
        <ResumeSection title="Skills">

          <p className="minimal-skills">

            {skills.map((skill, index) => (
              <React.Fragment key={index}>

                <span>
                  {skill.name}
                </span>

                {index < skills.length - 1 && (
                  <span> • </span>
                )}

              </React.Fragment>
            ))}

          </p>

        </ResumeSection>
      )}

      {experience.length > 0 && (
        <ResumeSection title="Experience">

          {experience.map((item, index) => (
            <article
              className="minimal-experience"
              key={index}
            >

              <div className="minimal-item-header">

                <div>
                  <strong>
                    {item.role}
                  </strong>

                  <span>
                    {item.company}
                  </span>
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

      {projects.length > 0 && (
        <ResumeSection title="Projects">

          {projects.map((project, index) => (
            <article
              className="minimal-project"
              key={index}
            >

              <div className="minimal-item-header">

                <strong>
                  {project.name}
                </strong>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                )}

              </div>

              {project.description && (
                <p>
                  {project.description}
                </p>
              )}

              {project.technologies?.length > 0 && (
                <p className="minimal-technologies">
                  {project.technologies.join(" • ")}
                </p>
              )}

            </article>
          ))}

        </ResumeSection>
      )}

      {education.length > 0 && (
        <ResumeSection title="Education">

          {education.map((item, index) => (
            <article
              className="minimal-education"
              key={index}
            >

              <div>

                <strong>
                  {item.degree}
                </strong>

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

      {socialLinks.length > 0 && (
        <ResumeSection title="Links">

          <div className="minimal-links">

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

export default MinimalTemplate;