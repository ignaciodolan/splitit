# CLAUDE.md

## Project Overview

**Splitit** is a web application for splitting and settling expenses among a group of people. Users enter expenses as text (e.g., "John 18"), and the app calculates who owes whom money using an optimal settlement algorithm that minimizes the number of transactions.

**Author:** Ignacio Dolan

## Tech Stack

- **Framework:** Next.js 15.x (React 19)
- **Styling:** styled-components 6 (CSS-in-JS) with SWC compiler support
- **Parsing:** moo (lexer/tokenizer for expense text input)
- **Display:** ascii-data-table (renders expense summaries)
- **Testing:** Jest 29 with next/jest (SWC transforms)
- **Compiler:** SWC (Next.js built-in, no Babel)

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
│   ├── _app.js          # Custom App component (global CSS import)
│   └── index.js         # Main application page
├── public/              # Static assets
├── styles/              # Global CSS
│   └── main.css         # Basic CSS reset
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

There are 15 unit tests across 3 spec files, all in `helpers/`. Tests use Jest 29 with SWC transforms via `next/jest`.

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
| `jest.config.js` | Jest config using `next/jest` for SWC transforms |
| `next.config.js` | Next.js config with styled-components compiler support |
| `.prettierrc` | Code formatting rules |

## Notes

- No ESLint is configured; formatting is handled by Prettier only
- No CI/CD pipeline is configured
- Uses SWC compiler (no Babel) for both builds and test transforms
- Global CSS is imported via `pages/_app.js` (Next.js convention)
