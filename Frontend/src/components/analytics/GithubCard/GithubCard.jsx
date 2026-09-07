import { memo } from 'react';
import Card from '../../common/Card/Card';
import { formatNumber } from '../../../utils/helper';

const GithubCard = memo(function GithubCard({ analytics = {} }) {
  if (!Object.keys(analytics).length) {
    return (
      <Card>
        <h6 className="mb-0">No GitHub Profile</h6>
      </Card>
    );
  }

  return (
    <Card>
      <h6 className="mb-3">GitHub Analytics</h6>
      <div className="row g-3">
        <div className="col-6 col-md-4"><div className="small text-secondary">Followers</div><div>{formatNumber(analytics.followers)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Following</div><div>{formatNumber(analytics.following)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Repositories</div><div>{formatNumber(analytics.repositories)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Contributions</div><div>{formatNumber(analytics.contributions)}</div></div>
        <div className="col-6 col-md-4"><div className="small text-secondary">Organizations</div><div>{formatNumber(analytics.organizations)}</div></div>
      </div>
    </Card>
  );
});

export default GithubCard;
