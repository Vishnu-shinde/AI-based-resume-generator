import { memo } from 'react';
import Card from '../../common/Card/Card';
import { formatNumber } from '../../../utils/helper';

const CodechefCard = memo(function CodechefCard({ analytics = {} }) {
  if (!Object.keys(analytics).length) {
    return (
      <Card>
        <h6 className="mb-0">No CodeChef Profile</h6>
      </Card>
    );
  }

  return (
    <Card>
      <h6 className="mb-1">CodeChef</h6>
      <div className="small text-secondary">Stars</div>
      <div className="h5 mb-0">{formatNumber(analytics.stars)}</div>
    </Card>
  );
});

export default CodechefCard;
