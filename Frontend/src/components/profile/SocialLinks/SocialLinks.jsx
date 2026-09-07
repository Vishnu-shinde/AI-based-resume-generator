import { memo } from 'react';

const SocialLinks = memo(function SocialLinks({ links = [] }) {
  const normalizedLinks = Array.isArray(links)
    ? links.map((link) => {
        if (typeof link === 'string') {
          return {
            label: link.includes('github.com') ? 'GitHub' : link.includes('codeforces.com') ? 'Codeforces' : link.includes('leetcode.com') ? 'LeetCode' : link.includes('codechef.com') ? 'CodeChef' : 'Profile',
            url: link,
          };
        }

        return {
          label: link?.label || link?.name || link?.platform || 'Profile',
          url: link?.url || link?.href || '#',
        };
      })
    : [];

  return (
    <div className="d-flex flex-wrap gap-2">
      {normalizedLinks.length ? (
        normalizedLinks.map((link) => (
          <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
            {link.label}
          </a>
        ))
      ) : (
        <div className="small text-secondary">No external links shared.</div>
      )}
    </div>
  );
});

export default SocialLinks;
