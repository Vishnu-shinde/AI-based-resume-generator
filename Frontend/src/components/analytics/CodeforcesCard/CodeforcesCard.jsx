import { memo } from 'react';
import Card from '../../common/Card/Card';
import { formatNumber } from '../../../utils/helper';

const CodeforcesCard = memo(function CodeforcesCard({ analytics = {} }) {
  if (!Object.keys(analytics).length) {
    return (
      <Card>
        <h6 className="mb-0">No Codeforces Profile</h6>
      </Card>
    );
  }

  return (
    <Card>
      <h6 className="mb-3">Codeforces</h6>
      <div className="row g-3">
        <div className="col-6 col-md-4"><div className="small text-secondary">Rating</div><div>{formatNumber(analytics.rating)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Max Rating</div><div>{formatNumber(analytics.maxRating)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Problems Solved</div><div>{formatNumber(analytics.problemsSolved)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Contest Count</div><div>{formatNumber(analytics.contestCount)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Best Rank</div><div>{formatNumber(analytics.bestRank)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Rating Growth</div><div>{formatNumber(analytics.ratingGrowth)}</div></div>
      </div>
    </Card>
  );
});

export default CodeforcesCard;
