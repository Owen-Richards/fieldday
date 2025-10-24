# FieldDay Contributing Guide

Thank you for your interest in contributing to FieldDay! This guide will help you get started.

## Code of Conduct

Please be respectful and constructive in all interactions.

## Development Setup

1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes** following our coding standards
5. **Test your changes**: `npm run test`
6. **Commit**: Use conventional commits (see below)
7. **Push and create a PR**

## Coding Standards

### TypeScript

- Use strict mode
- Prefer interfaces over types for object shapes
- Use functional components with hooks
- Add JSDoc comments for complex functions

### Naming Conventions

- **Components**: PascalCase (`SessionCard.tsx`)
- **Files**: kebab-case (`use-session.ts`)
- **Hooks**: prefix with `use` (`useSession`)
- **Constants**: UPPER_SNAKE_CASE

### Git Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add session discovery endpoint
fix: Fix payment webhook handling
docs: Update API documentation
test: Add tests for reliability scoring
refactor: Simplify condition matching logic
chore: Update dependencies
```

### Pull Requests

- Keep PRs focused on a single feature/fix
- Include tests for new functionality
- Update documentation as needed
- Ensure all tests pass
- Request review from at least one maintainer

## Testing

- Unit tests for all business logic
- Integration tests for API endpoints
- E2E tests for critical user journeys
- Accessibility tests for UI components

```bash
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:a11y
```

## Safety Requirements

**CRITICAL**: When working on youth-related features:

- All adult↔minor DMs must be blocked
- Guardian visibility must be enforced
- Media sharing requires guardian consent
- Background checks must be verified
- All interactions must be logged

## Questions?

Open an issue or reach out to the maintainers.

Thank you for contributing! 🎯
