import { memo } from 'react';
import { formatNumber } from '../../../utils/helper';

const UserCard = memo(function UserCard({ user }) {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center gap-3">
      <img
        src={user?.avatarUrl}
        alt={user?.name || 'Developer avatar'}
        className="rounded-circle border"
        style={{ width: 96, height: 96, objectFit: 'cover' }}
      />
      <div>
        <h4 className="mb-2">{user?.name || 'Unnamed developer'}</h4>
        <p className="text-secondary mb-2">{user?.bio || 'No bio provided'}</p>
        <div className="d-flex flex-wrap gap-2 mb-2">
          {user?.company ? <span className="badge text-bg-light border">Company: {user.company}</span> : null}
          {user?.country ? <span className="badge text-bg-light border">Country: {user.country}</span> : null}
          {user?.profession ? <span className="badge text-bg-light border">Profession: {user.profession}</span> : null}
        </div>
        <div className="small text-secondary">
          Followers: {formatNumber(user?.followers)} · Following: {formatNumber(user?.following)}
        </div>
      </div>
    </div>
  );
});

export default UserCard;
