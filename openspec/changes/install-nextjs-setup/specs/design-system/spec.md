## ADDED Requirements

### Requirement: Tailwind CSS Configuration with Design Tokens
The system SHALL have Tailwind CSS v4 configured with custom design tokens from the Color Guideline (DOC-QCL-CG-001), including primary colors, semantic colors, typography, and border radius scales.

#### Scenario: Primary color tokens available
- **WHEN** developer uses `bg-primary` or `text-primary` in a component
- **THEN** Tailwind applies CSS variable `var(--color-primary-base)` which resolves to #6467f2 (light theme) or #6a25f4 (dark theme)

#### Scenario: Semantic color tokens configured
- **WHEN** developer uses `bg-success`, `bg-warning`, `bg-error`, or `bg-info`
- **THEN** Tailwind applies correct semantic colors (#22c55e, #f59e0b, #ef4444, #3b82f6 respectively)

#### Scenario: Option card colors available
- **WHEN** developer uses accent colors for multiple choice options
- **THEN** Tailwind provides `#8b5cf6` (purple/A), `#3b82f6` (blue/B), `#f97316` (orange/C), `#ec4899` (pink/D)

#### Scenario: Border radius scale configured
- **WHEN** developer uses `rounded`, `rounded-lg`, `rounded-xl`, or `rounded-full`
- **THEN** Tailwind applies 12px, 16px, 24px, and 9999px respectively

### Requirement: CSS Variables for Dual-Theme Support
The system SHALL implement CSS custom properties in globals.css supporting both Theme A (Light - Indigo) and Theme B (Dark - Purple) as defined in Color Guideline Section 6.

#### Scenario: Light theme CSS variables defined
- **WHEN** `data-theme="light"` is set on root element
- **THEN** CSS variables resolve to light theme colors: primary #6467f2, background #ffffff, text #111827, borders #e5e7eb

#### Scenario: Dark theme CSS variables defined
- **WHEN** `data-theme="dark"` is set on root element
- **THEN** CSS variables resolve to dark theme colors: primary #6a25f4, background #0f172a, text #f8fafc, borders #475569

#### Scenario: Theme switching mechanism
- **WHEN** application needs to switch between light and dark themes
- **THEN** changing `data-theme` attribute on root element updates all color tokens dynamically

### Requirement: Typography Configuration
The system SHALL use Lexend font family from Google Fonts for all UI text as specified in Color Guideline Section 9.

#### Scenario: Lexend font loaded
- **WHEN** application loads in browser
- **THEN** Lexend font (weights 300, 400, 500, 600, 700) is available via Google Fonts CDN

#### Scenario: Font family applied globally
- **WHEN** developer inspects computed styles
- **THEN** all text elements use `font-family: 'Lexend', sans-serif`

### Requirement: Icon System Configuration
The system SHALL use Material Symbols Outlined from Google Fonts for all icons as specified in Color Guideline Section 9.

#### Scenario: Material Symbols font loaded
- **WHEN** application loads in browser
- **THEN** Material Symbols Outlined font is available via Google Fonts CDN

#### Scenario: Icon usage pattern
- **WHEN** developer uses `<span class="material-symbols-outlined">icon_name</span>`
- **THEN** correct icon renders with proper ligature substitution

### Requirement: Shadcn/ui Integration
The system SHALL have Shadcn/ui component library configured with Radix UI primitives, using the design system tokens for styling.

#### Scenario: Shadcn/ui initialized
- **WHEN** developer runs `npx shadcn-ui init`
- **THEN** components.json is created with correct path aliases and theme token references

#### Scenario: Base components available
- **WHEN** developer imports from `@/components/ui/button` or `@/components/ui/input`
- **THEN** Shadcn/ui components render with design system tokens (colors, border radius, typography)

#### Scenario: Component variants use theme colors
- **WHEN** developer uses `<Button variant="primary">`
- **THEN** button uses `--color-primary-base` for background and white for text
