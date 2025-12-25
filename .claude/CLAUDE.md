# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Turborepo monorepo** created with Better-T-Stack, using **Bun** as the package manager. The project uses strict TypeScript configuration with Ultracite (Biome) for linting and formatting.

## Monorepo Structure

```
superapp/
├── apps/
│   └── fumadocs/          # Fumadocs documentation site (TanStack Start + Vite)
├── packages/
│   ├── config/            # Shared TypeScript configuration
│   ├── database/          # Database utilities and schemas
│   ├── services/          # Shared services
│   ├── shared/            # Shared utilities
│   └── ui/                # Shared UI components
```

### Apps

- **fumadocs**: Documentation site built with Fumadocs, TanStack Start, React 19, and Vite
  - Uses Nitro for server-side rendering
  - Supports prerendering
  - MDX content in `apps/fumadocs/content/docs/`
  - Runs on port 3000 (dev server on port 4000)

### Packages

All packages are scoped with `@superapp/` namespace. Currently includes:
- `@superapp/config` - Base TypeScript configuration

## Essential Commands

### Development

```bash
bun install              # Install dependencies
bun run dev              # Start all apps in development mode
bun run dev:web          # Start only the web application
```

### Building & Type Checking

```bash
bun run build            # Build all apps and packages
bun run check-types      # Type check all workspaces
```

### Code Quality

```bash
# Ultracite (Biome) commands
bun x ultracite fix      # Format and auto-fix all issues
bun x ultracite check    # Check for issues without fixing
bun x ultracite doctor   # Diagnose setup issues

# Alternative Biome commands
bun run check            # Run Biome check with auto-fix
```

### Working with Turborepo

```bash
# Run commands in specific workspace
turbo -F fumadocs dev    # Run dev in fumadocs app only
turbo -F fumadocs build  # Build fumadocs app only

# Run tasks across all workspaces
turbo dev                # Run dev in all apps
turbo build              # Build all apps and packages
```

## Key Technologies

- **Package Manager**: Bun 1.3.3
- **Build System**: Turborepo with TUI enabled
- **Linting/Formatting**: Ultracite 6.5.0 (Biome 2.3.10)
- **TypeScript**: v5 with strict configuration
- **Git Hooks**: Husky + lint-staged (auto-formats on commit)
- **Validation**: Zod

### Fumadocs App Stack

- **Framework**: TanStack Start 1.136.18 with React 19
- **Bundler**: Vite 7
- **Documentation**: Fumadocs (MDX-based)
- **Styling**: Tailwind CSS 4
- **Server**: Nitro 3.0 (alpha)
- **Icons**: Lucide React

## TypeScript Configuration

Base configuration is in `packages/config/tsconfig.base.json` with strict settings:
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `verbatimModuleSyntax: true`
- Module resolution: `bundler`

## Turborepo Tasks

Configured tasks in `turbo.json`:
- **build**: Depends on `^build`, outputs to `dist/**`
- **lint**: Depends on `^lint`
- **check-types**: Depends on `^check-types`
- **dev**: No cache, persistent (for development servers)

## Code Standards (Ultracite/Biome)

This project enforces strict code quality through Ultracite, a zero-config Biome preset.

### Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

#### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

#### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

#### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

#### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

#### React 19+ Specific

- Use ref as a prop instead of `React.forwardRef`

#### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

#### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

#### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

#### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components over `<img>` tags

## Git Workflow

- Pre-commit hooks automatically run `bun x ultracite fix` on staged files
- All code must pass Ultracite checks before committing
- Run `bun x ultracite fix` before committing to ensure compliance
