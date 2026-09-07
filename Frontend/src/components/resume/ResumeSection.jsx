import React from "react";
import "./ResumeTemplates.css";

const ResumeSection = ({
  title,
  children,
  className = "",
}) => {
  if (!children) {
    return null;
  }

  return (
    <section className={`resume-section ${className}`}>
      {title && (
        <h2 className="resume-section-title">
          {title}
        </h2>
      )}

      <div className="resume-section-content">
        {children}
      </div>
    </section>
  );
};

export default ResumeSection;