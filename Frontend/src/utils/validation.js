import { z } from 'zod';

const urlSchema = z
  .string()
  .trim()
  .refine((value) => !value || value.startsWith('http://') || value.startsWith('https://'), {
    message: 'Enter a valid URL.',
  })
  .refine((value) => {
    if (!value) return true;

    return /github\.com\//i.test(value)
      || /codechef\.com\/users\//i.test(value)
      || /codeforces\.com\/profile\//i.test(value)
      || /leetcode\.com\/(u\/)?/i.test(value);
  }, {
    message: 'Use a supported platform URL.',
  });

export const profileFormSchema = z
  .object({
    githubUrl: urlSchema.optional(),
    codechefUrl: urlSchema.optional(),
    codeforcesUrl: urlSchema.optional(),
    leetcodeUrl: urlSchema.optional(),
  })
  .refine(
    (values) =>
      Boolean(values.githubUrl?.trim()) ||
      Boolean(values.codechefUrl?.trim()) ||
      Boolean(values.codeforcesUrl?.trim()) ||
      Boolean(values.leetcodeUrl?.trim()),
    {
      message: 'Provide at least one supported profile URL.',
      path: ['githubUrl'],
    },
  );
