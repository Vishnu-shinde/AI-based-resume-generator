import React from "react";
import { useSelector } from "react-redux";

import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import AtsTemplate from "./templates/AtsTemplate";

import "./ResumePreview.css";

const TEMPLATE_MAP = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  ats: AtsTemplate,
};

const ResumePreview = () => {
  const resume = useSelector(
    (state) => state.resume.generatedResume
  );

  if (!resume) {
    return (
      <div className="resume-preview-empty">
        <h3>No resume generated</h3>

        <p>
          Generate a resume to see your preview here.
        </p>
      </div>
    );
  }

  const templateKey =
    resume.template?.toLowerCase()?.trim() || "modern";

  const Template =
    TEMPLATE_MAP[templateKey] || ModernTemplate;

  return (
    <div className="resume-preview-container">
      <Template resume={resume} />
    </div>
  );
};

export default ResumePreview;