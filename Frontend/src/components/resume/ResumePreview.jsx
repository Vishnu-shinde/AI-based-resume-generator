import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import AtsTemplate from "./templates/AtsTemplate";

import "./ResumeTemplates.css";
import Button from "../common/Button/Button";

const TEMPLATE_MAP = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  ats: AtsTemplate,
};

const ResumePreview = () => {
  const navigate = useNavigate();
  const resume = useSelector(
    (state) => state.resume.generatedResume
  );

  const resumeRef = useRef(null);

  if (!resume) {
    return (
      <div className="resume-preview-empty d-flex flex-column align-items-center justify-content-center py-5 my-5">
        <h3>No resume generated</h3>
        <p>
          Generate a resume to see your preview here.
        </p>
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Button className="rounded-5 fw-medium pt-2 pb-2 px-4 " onClick={() => navigate('/form')}>
                Create Resume
            </Button>
        </div>
      </div>
    );
  }

  const templateKey =
    resume.template?.toLowerCase()?.trim() || "modern";

  console.log("Selected template:", templateKey);

  const Template =
    TEMPLATE_MAP[templateKey] || ModernTemplate;

  const downloadPDF = async () => {
    if (!resumeRef.current) {
      return;
    }

    const element = resumeRef.current;

    const options = {
      margin: 0,

      filename: `${resume.userData?.name || "resume"}-resume.pdf`,

      image: {
        type: "jpeg",
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },

      pagebreak: {
        mode: ["css", "legacy"],
      },
    };

    try {
      await html2pdf()
        .set(options)
        .from(element)
        .save();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <div className="resume-preview-wrapper">

      {/* DOWNLOAD BUTTON */}

      <div className="resume-preview-actions">
        <button
          type="button"
          className="resume-download-button"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
      </div>

      {/* RESUME */}

      <div className="resume-preview-container">

        <div ref={resumeRef}>
          <Template resume={resume} />
        </div>

      </div>

    </div>
  );
};

export default ResumePreview;