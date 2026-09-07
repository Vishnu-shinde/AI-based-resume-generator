import { memo } from 'react';

const EducationCard = memo(function EducationCard({ education = [] }) {
  return (
    <div className="d-flex flex-column gap-2">
      <h6 className="mb-1">Education</h6>
      {education.length ? (
        education.map((item, index) => (
          <div key={`${item}-${index}`} className="small text-secondary">
            {item}
          </div>
        ))
      ) : (
        <div className="small text-secondary">No education details available.</div>
      )}
    </div>
  );
});

export default EducationCard;
