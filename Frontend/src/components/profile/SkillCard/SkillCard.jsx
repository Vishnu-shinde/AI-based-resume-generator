import { memo } from 'react';
import { calculateSkillLevel } from '../../../utils/helper';

const SkillCard = memo(function SkillCard({ skill }) {
  const score = Number(skill?.score || 0);

  return (
    <div className="border rounded p-3 h-100">
      <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
        <h6 className="mb-0">{skill?.name || 'Skill'}</h6>
        <span className="badge rounded-pill border" style={{ background: 'var(--primary)', color: '#fff', borderColor: 'var(--primary)' }}>{calculateSkillLevel(score)}</span>
      </div>

      <div className="small text-secondary mb-1">
        GitHub repos: {skill?.githubRepoCount ?? 0} · CodeChef: {skill?.codechefSubmissions ?? 0}
      </div>
      <div className="small text-secondary mb-3">
        Codeforces: {skill?.codeforcesSolved ?? 0} · LeetCode: {skill?.leetcodeSolved ?? 0}
      </div>

      <div className="progress" role="progressbar" aria-label={`${skill?.name || 'Skill'} score`}>
        <div className="progress-bar" style={{ width: `${Math.min(score, 100)}%`, background: 'var(--primary)' }} />
      </div>

      <div className="small text-secondary mt-2">Final score {score}</div>
    </div>
  );
});

export default SkillCard;
