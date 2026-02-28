/**
 * lint-staged configuration for pre-commit hooks
 * Runs linting and formatting on staged files only
 */

export default {
  '*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{js,jsx,mjs}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{css,json,md,mdx}': [
    'prettier --write',
  ],
  'prisma/schema.prisma': [
    'prisma format',
  ],
};
