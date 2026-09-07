export const formatNumber = (value) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '—';
  }

  return new Intl.NumberFormat('en-US').format(Number(value));
};

export const capitalize = (value = '') => value.charAt(0).toUpperCase() + value.slice(1);

export const sortSkills = (skills = []) => {
  const normalizedSkills = Array.isArray(skills)
    ? skills
    : Array.isArray(skills?.items)
      ? skills.items
      : Array.isArray(skills?.results)
        ? skills.results
        : [];

  return [...normalizedSkills]
    .filter(Boolean)
    .sort((first, second) => Number(second?.score ?? 0) - Number(first?.score ?? 0));
};

export const calculateSkillLevel = (score = 0) => {
  if (score >= 90) return 'Expert';
  if (score >= 75) return 'Advanced';
  if (score >= 55) return 'Proficient';
  if (score >= 35) return 'Growing';
  return 'Starter';
};

export const getPlatformColor = (platform) =>
  ({
    github: '#3B82F6',
    codechef: '#F59E0B',
    codeforces: '#22C55E',
    leetcode: '#EF4444',
  })[platform] || '#94A3B8';
