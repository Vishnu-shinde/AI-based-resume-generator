export const extractUsername = (url = '', platform) => {
  if (!url) return '';

  const trimmed = url.trim();

  if (platform === 'github') {
    const matched = trimmed.match(/github\.com\/([^/]+)/i);
    return matched?.[1] || '';
  }

  if (platform === 'codechef') {
    const matched = trimmed.match(/codechef\.com\/users\/([^/]+)/i);
    return matched?.[1] || '';
  }

  if (platform === 'codeforces') {
    const matched = trimmed.match(/codeforces\.com\/profile\/([^/]+)/i);
    return matched?.[1] || '';
  }

  if (platform === 'leetcode') {
    const matched = trimmed.match(/leetcode\.com\/(?:u\/)?([^/]+)/i);
    return matched?.[1] || '';
  }

  return '';
};
