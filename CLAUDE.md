# CLAUDE.md

## Project Overview

**Splitit** is a web application for splitting and settling expenses among a group of people. Users enter expenses as text (e.g., "John 18"), and the app calculates who owes whom money using an optimal settlement algorithm that minimizes the number of transactions.

**Author:** Ignacio Dolan

## Tech Stack

- **Framework:** Next.js 9.3.x (React 16.11)
- **Styling:** styled-components (CSS-in-JS) with SSR support
- **Parsing:** moo (lexer/tokenizer for expense text input)
- **Display:** ascii-data-table (renders expense summaries)
- **Testing:** Jest 24 + Enzyme 3
- **Transpilation:** Babel 7 with next/babel preset

## Project Structure

```
splitit/
├── components/          # React UI components
│   └── nav.js           # Navigation component
├── helpers/             # Pure business logic functions (with colocated tests)
│   ├── calculateExpensesPerPerson.js      # Aggregates expenses per person
│   ├── calculateExpensesPerPerson.spec.js
│   ├── calculateOweList.js                # Calculates balances/debts
│   ├── calculateSettlement.js             # Optimal payment settlement algorithm
│   ├── calculateSettlement.spec.js
│   ├── getExpenseListFromTextList.js       # Parses text input into expense objects
│   └── getExpenseListFromTextList.spec.js
├── pages/               # Next.js pages (file-based routing)
│   └── index.js         # Main application page
├── public/              # Static assets
├── styles/              # Global CSS
│   └── main.css
```

## Commands

### Development

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm start            # Start production server
```

### Testing

```bash
npm test             # Run all Jest tests
```

There are 14 unit tests across 3 spec files, all in `helpers/`. Tests use Jest + Enzyme with React 16 adapter.

## Architecture & Data Flow

The app follows a functional pipeline:

1. **Input** - User types expenses as text lines (e.g., "John 18\nMary 25")
2. **Parse** - `getExpenseListFromTextList()` uses moo lexer to tokenize input into `{name, amount}` objects
3. **Aggregate** - `calculateExpensesPerPerson()` sums expenses per person
4. **Balance** - `calculateOweList()` computes how much each person owes or is owed
5. **Settle** - `calculateSettlement()` finds optimal payment transactions to settle all debts

All business logic lives in `helpers/` as pure functions. The UI is a single page (`pages/index.js`) using React hooks (`useState`) for local state.

## Code Conventions

- **Formatting:** Prettier with 2-space indent, no tabs, single quotes
- **Test files:** Colocated with source using `.spec.js` suffix
- **Naming:** camelCase for functions/variables, PascalCase for React components
- **Functions:** Arrow functions, functional style (map/reduce/filter over imperative loops)
- **Components:** Functional React components with hooks (no class components)
- **Styling:** styled-components with tagged template literals

## Configuration Files

| File | Purpose |
|---|---|
| `.babelrc` / `babel.config.js` | Babel presets (next/babel + styled-components plugin) |
| `jest.config.js` | Jest config (setup file, ignore patterns) |
| `jest.setup.js` | Enzyme adapter setup for React 16 |
| `next.config.js` | Webpack customization, CSS module support, source maps |
| `.prettierrc` | Code formatting rules |

## Notes

- No ESLint is configured; formatting is handled by Prettier only
- No CI/CD pipeline is configured
- The `styles/main.css` references Tailwind CSS directives but Tailwind is not installed as a dependency
- Both `package-lock.json` and `yarn.lock` exist; prefer `npm` for consistency with the scripts
