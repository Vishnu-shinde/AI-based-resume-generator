import { useDispatch } from "react-redux";
import ResumeSection from "../ResumeSection";

import {
    updateResumeField,
} from "../../../features/resume/resumeSlice";
import EditableText from "@/components/common/Resume/EditableText";

const ModernTemplate = ({ resume }) => {
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

  const dispatch = useDispatch();

  const updateField = (field, value) => {
    dispatch(
      updateResumeField({
        field,
        value,
      })
    );
  };

  return (
    <div className="resume-template modern-template">

      {/* HEADER */}
      <header className="modern-header">

        <div className="modern-header-main">

          {userData?.avatarUrl && (
            <img
              src={userData?.avatarUrl}
              alt={userData?.name || "Profile"}
              className="modern-avatar"
            />
          )}

          <div>
            <h1>
  <EditableText
    value={userData?.name}
    placeholder="Your Name"
    onChange={(value) => {
      dispatch(
        updateResumeField({
          field: "userData",
          value: {
            ...resume.userData,
            name: value,
          },
        })
      );
    }}
  />
</h1>

            {userData?.professionType && (
              <p className="modern-profession">
  <EditableText
    value={userData?.professionType}
    placeholder="Professional Title"
    onChange={(value) => {
      dispatch(
        updateResumeField({
          field: "userData",
          value: {
            ...resume.userData,
            professionType: value,
          },
        })
      );
    }}
  />
</p>
            )}
          </div>

        </div>

        <div className="modern-contact">

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
    <div className="resume-summary">
      <EditableText
        value={summary}
        placeholder="Professional summary"
        multiline
        onChange={(value) =>
          updateField("summary", value)
        }
      />
    </div>
  </ResumeSection>
)}

      {/* SKILLS */}
      {skills?.length > 0 && (
        <ResumeSection title="Skills">

          <div className="modern-skills">

            <div className="modern-skills">

  {skills?.map((skill, index) => (

    <div
      className="modern-skill"
      key={`${skill?.name}-${index}`}
    >

      <EditableText
        value={skill?.name}
        onChange={(value) => {

          const updatedSkills = [...skills];

          updatedSkills[index] = {
            ...updatedSkills[index],
            name: value,
          };

          updateField("skills", updatedSkills);
        }}
      />

      {skill?.proficiency && (
        <EditableText
          value={skill.proficiency}
          className="skill-proficiency"
          onChange={(value) => {

            const updatedSkills = [...skills];

            updatedSkills[index] = {
              ...updatedSkills[index],
              proficiency: value,
            };

            updateField("skills", updatedSkills);
          }}
        />
      )}

    </div>

  ))}

</div>

          </div>

        </ResumeSection>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <ResumeSection title="Experience">

          <div className="experience-list">

            {experience.map((item, index) => (

  <article
    className="experience-item"
    key={index}
  >

    <div className="experience-header">

      <div>

        <h3>
          <EditableText
            value={item.role}
            onChange={(value) => {

              const updated = [...experience];

              updated[index] = {
                ...updated[index],
                role: value,
              };

              updateField("experience", updated);
            }}
          />
        </h3>

        <h4>
          <EditableText
            value={item.company}
            onChange={(value) => {

              const updated = [...experience];

              updated[index] = {
                ...updated[index],
                company: value,
              };

              updateField("experience", updated);
            }}
          />
        </h4>

      </div>

      <span className="experience-date">

        <EditableText
          value={item.startDate}
          onChange={(value) => {

            const updated = [...experience];

            updated[index] = {
              ...updated[index],
              startDate: value,
            };

            updateField("experience", updated);
          }}
        />

        {" - "}

        <EditableText
          value={item.endDate}
          placeholder="Present"
          onChange={(value) => {

            const updated = [...experience];

            updated[index] = {
              ...updated[index],
              endDate: value,
            };

            updateField("experience", updated);
          }}
        />

      </span>

    </div>

  </article>

))}

          </div>

        </ResumeSection>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <ResumeSection title="Projects">

          <div className="project-list">

            {projects.map((project, index) => (
              <article
                className="project-item"
                key={index}
              >

                <div className="project-header">

                  <EditableText
  value={project.name}
  onChange={(value) => {

    const updatedProjects = [...projects];

    updatedProjects[index] = {
      ...updatedProjects[index],
      name: value,
    };

    updateField(
      "projects",
      updatedProjects
    );
  }}
/>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}

                </div>

                <EditableText
  value={project.description}
  multiline
  onChange={(value) => {

    const updatedProjects = [...projects];

    updatedProjects[index] = {
      ...updatedProjects[index],
      description: value,
    };

    updateField(
      "projects",
      updatedProjects
    );
  }}
/>

                {project.technologies?.length > 0 && (
                  <div className="project-technologies">

                    {project.technologies.map(
                      (technology, technologyIndex) => (
                        <span
                          key={technologyIndex}
                        >
                          {technology}
                        </span>
                      )
                    )}

                  </div>
                )}

              </article>
            ))}

          </div>

        </ResumeSection>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <ResumeSection title="Education">

          <div className="education-list">

            {education?.map((item, index) => (
              <article
                className="education-item"
                key={index}
              >

                <div>
                  <EditableText
                    value={item.degree}
                    onChange={(value) => {

                        const updatedEducation = [...education];

                        updatedEducation[index] = {
                        ...updatedEducation[index],
                        degree: value,
                        };

                        updateField(
                        "education",
                        updatedEducation
                        );
                    }}
                    />
                </div>

                <div className="col-12">
                  <EditableText
                    value={item.institute}
                    onChange={(value) => {

                        const updatedEducation = [...education];

                        updatedEducation[index] = {
                        ...updatedEducation[index],
                        institute: value,
                        };

                        updateField(
                        "education",
                        updatedEducation
                        );
                    }}
                    />
                </div>

                {(item.startYear || item.endYear) && (
                  <span>
                    {item.startYear || ""}
                    {" - "}
                    {item.endYear || ""}
                  </span>
                )}

              </article>
            ))}

          </div>

        </ResumeSection>
      )}

      {/* ACHIEVEMENTS */}
      {achievements.length > 0 && (
        <ResumeSection title="Achievements">

          <ul className="resume-list">

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

          <ul className="resume-list">

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

      {/* SOCIAL LINKS */}
      {socialLinks.length > 0 && (
        <ResumeSection title="Links">

          <div className="resume-social-links">

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

export default ModernTemplate;