import { memo } from 'react';
import Card from '../../common/Card/Card';
import { formatNumber } from '../../../utils/helper';

const LeetcodeCard = memo(function LeetcodeCard({ analytics = {} }) {
  if (!Object.keys(analytics).length) {
    return (
      <Card>
        <h6 className="mb-0">No LeetCode Profile</h6>
      </Card>
    );
  }

  return (
    <Card>
      <h6 className="mb-3">LeetCode</h6>
      <div className="row g-3">
        <div className="col-6 col-md-4"><div className="small text-secondary">Ranking</div><div>{formatNumber(analytics.ranking)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Contest Rating</div><div>{formatNumber(analytics.contestRating)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Total Solved</div><div>{formatNumber(analytics.totalSolved)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Easy</div><div>{formatNumber(analytics.easy)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Medium</div><div>{formatNumber(analytics.medium)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Hard</div><div>{formatNumber(analytics.hard)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Reputation</div><div>{formatNumber(analytics.reputation)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Global Rank</div><div>{formatNumber(analytics.globalRank)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Contest Count</div><div>{formatNumber(analytics.contestCount)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Top Percentage</div><div>{formatNumber(analytics.topPercentage)}</div></div>
      </div>
    </Card>
  );
});

export default LeetcodeCard;
