# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based visualization tool that compares tick generation algorithms between D3.js and Recharts. The application allows users to interactively adjust parameters (min, max, desired tick count) and visually compare how each library generates axis ticks for charts.

## Commands

### Development
```bash
pnpm dev          # Start development server with Vite HMR
pnpm build        # Type-check with TypeScript and build for production
pnpm preview      # Preview production build locally
```

### Code Quality
```bash
pnpm lint         # Run Biome linter on src/ directory
pnpm format       # Format code with Biome
```

Note: This project uses Biome (not ESLint/Prettier) for linting and formatting.

## Architecture

### Core Concept
The application compares two tick generation implementations:
- **D3 approach** ([src/lib/ticks/d3-ticks.ts](src/lib/ticks/d3-ticks.ts)): Uses D3's `scaleLinear().ticks()` method
- **Recharts approach** ([src/lib/ticks/recharts-ticks.ts](src/lib/ticks/recharts-ticks.ts)): Uses Recharts' internal `getNiceTickValues` function

### Key Technical Details

**Recharts Internal Module Access**: The project directly imports Recharts' internal `getNiceTickValues` function from `recharts/es6/util/scale/getNiceTickValues`. This is intentional to access the exact algorithm Recharts uses internally. The `@ts-ignore` directive is necessary as this internal module has no public type definitions.

**State Management**: The main page ([src/page.tsx](src/page.tsx)) uses React hooks with `useMemo` to efficiently regenerate ticks only when input parameters change (min, max, tickCount).

**Visualization Logic**: The `TickVisualization` component ([src/components/tick-visualization.tsx](src/components/tick-visualization.tsx)) handles:
- SVG-based number line rendering using D3 scales for positioning
- Range coverage validation (warns if generated ticks don't cover the min-max range)
- Tick count comparison (warns if actual count differs from desired count)
- Dynamic domain calculation that extends to include all generated ticks

### Project Structure

```
src/
├── lib/
│   ├── ticks/
│   │   ├── d3-ticks.ts        # D3 tick generation wrapper
│   │   └── recharts-ticks.ts  # Recharts tick generation wrapper
│   └── utils.ts               # Utility functions (cn for className merging)
├── components/
│   ├── control-panel.tsx      # Input controls for parameters
│   ├── tick-visualization.tsx # SVG visualization of ticks
│   └── ui/                    # shadcn/ui components
├── page.tsx                   # Main application page
└── main.tsx                   # React app entry point
```

### Tech Stack Specifics

- **React 19.2** with React Compiler enabled (affects dev/build performance)
- **Vite 7** for build tooling
- **TailwindCSS 4** (v4.x has different plugin architecture)
- **Path alias**: `@/` maps to `src/` directory
- **Node version**: Requires Node 24.x (specified in engines)
