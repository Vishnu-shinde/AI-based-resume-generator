import { memo } from 'react';
import SkillCard from '../SkillCard/SkillCard';

const SkillList = memo(function SkillList({ skills = [] }) {
  return (
    <div className="row g-3">
      {skills.map((skill) => (
        <div className="col-12 col-md-6" key={skill.name}>
          <SkillCard skill={skill} />
        </div>
      ))}
    </div>
  );
});

export default SkillList;
