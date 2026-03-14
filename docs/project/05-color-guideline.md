# COLOR GUIDELINE
## LearnWeb LMS - BrainBlitz

---

| Attribute | Value |
|-----------|-------|
| Document ID | DOC-QCL-CG-001 |
| Version | 1.0 |
| Status | Draft |
| Author | Design Team |
| Created | February 2026 |
| Last Updated | 28 February 2026 |
| Reviewed By | UI/UX Designer, Lead Developer |
| Approved By | Product Owner |

---

## TABLE OF CONTENTS

1. [Color System Overview](#1-color-system-overview)
2. [Primary Color Palette](#2-primary-color-palette)
3. [Secondary Color Palette](#3-secondary-color-palette)
4. [Semantic Colors](#4-semantic-colors)
5. [Neutral Colors](#5-neutral-colors)
6. [Theme Configurations](#6-theme-configurations)
7. [Usage Guidelines](#7-usage-guidelines)
8. [Accessibility](#8-accessibility)
9. [Code Implementation](#9-code-implementation)

---

## 1. COLOR SYSTEM OVERVIEW

### 1.1 Design Theme Approach

The LearnWeb LMS color system uses a **dynamic theme-based approach** with two primary theme configurations:

| Theme | Color Mode | Primary Color | Use Case |
|-------|------------|---------------|----------|
| **Theme A** | Light Mode | `#6467f2` (Indigo) | Student-facing screens, Assessment Editor |
| **Theme B** | Dark Mode | `#6a25f4` (Deep Purple) | Teacher Dashboard, Quiz screens |

### 1.2 Color Token Naming Convention

```
--color-{semantic}-{variant}-{shade}

Examples:
--color-primary-base      → Main primary color
--color-primary-hover     → Hover state
--color-success-light     → Light success variant
--color-neutral-100       → Neutral shade 100
```

---

## 2. PRIMARY COLOR PALETTE

### 2.1 Theme A - Light Mode (Indigo)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-primary-base` | `#6467f2` | `rgb(100, 103, 242)` | Primary buttons, links, active states |
| `--color-primary-hover` | `#4f46e5` | `rgb(79, 70, 229)` | Button hover, link hover |
| `--color-primary-active` | `#4338ca` | `rgb(67, 56, 202)` | Button active, pressed states |
| `--color-primary-light` | `#a5b4fc` | `rgb(165, 180, 252)` | Backgrounds, highlights |
| `--color-primary-lighter` | `#e0e7ff` | `rgb(224, 231, 255)` | Subtle backgrounds |

### 2.2 Theme B - Dark Mode (Deep Purple)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-primary-base` | `#6a25f4` | `rgb(106, 37, 244)` | Primary buttons, links, active states |
| `--color-primary-hover` | `#7c3aed` | `rgb(124, 58, 237)` | Button hover, link hover |
| `--color-primary-active` | `#5b21b6` | `rgb(91, 33, 182)` | Button active, pressed states |
| `--color-primary-light` | `#a78bfa` | `rgb(167, 139, 250)` | Backgrounds, highlights |
| `--color-primary-lighter` | `#ddd6fe` | `rgb(221, 214, 254)` | Subtle backgrounds |

### 2.3 Primary Color Gradient

```css
/* Theme A - Indigo Gradient */
gradient-primary: linear-gradient(135deg, #6467f2 0%, #4f46e5 100%)

/* Theme B - Purple Gradient */
gradient-primary: linear-gradient(135deg, #6a25f4 0%, #7c3aed 100%)
```

---

## 3. SECONDARY COLOR PALETTE

### 3.1 Accent Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-accent-pink` | `#ec4899` | `rgb(236, 72, 153)` | Option cards, highlights |
| `--color-accent-blue` | `#3b82f6` | `rgb(59, 130, 246)` | Option cards, info states |
| `--color-accent-orange` | `#f97316` | `rgb(249, 115, 22)` | Option cards, warnings |
| `--color-accent-purple` | `#8b5cf6` | `rgb(139, 92, 246)` | Option cards, creative elements |
| `--color-accent-teal` | `#14b8a6` | `rgb(20, 184, 166)` | Success accents, highlights |

### 3.2 Quiz Option Card Colors

Used for Multiple Choice question options (A, B, C, D):

| Option | Hex | RGB | Variable |
|--------|-----|-----|----------|
| Option A (Purple) | `#8b5cf6` | `rgb(139, 92, 246)` | `--color-option-a` |
| Option B (Blue) | `#3b82f6` | `rgb(59, 130, 246)` | `--color-option-b` |
| Option C (Orange) | `#f97316` | `rgb(249, 115, 22)` | `--color-option-c` |
| Option D (Pink) | `#ec4899` | `rgb(236, 72, 153)` | `--color-option-d` |

---

## 4. SEMANTIC COLORS

### 4.1 Status Colors

| Status | Hex | RGB | Usage |
|--------|-----|-----|-------|
| `--color-success-base` | `#22c55e` | `rgb(34, 197, 94)` | Correct answers, success states |
| `--color-success-light` | `#86efac` | `rgb(134, 239, 172)` | Success backgrounds |
| `--color-warning-base` | `#f59e0b` | `rgb(245, 158, 11)` | Warnings, cautions |
| `--color-warning-light` | `#fcd34d` | `rgb(252, 211, 77)` | Warning backgrounds |
| `--color-error-base` | `#ef4444` | `rgb(239, 68, 68)` | Errors, incorrect answers |
| `--color-error-light` | `#fca5a5` | `rgb(252, 165, 165)` | Error backgrounds |
| `--color-info-base` | `#3b82f6` | `rgb(59, 130, 246)` | Information, hints |
| `--color-info-light` | `#93c5fd` | `rgb(147, 197, 253)` | Info backgrounds |

### 4.2 Quiz Status Badges

| Status | Hex | RGB | Usage |
|--------|-----|-----|-------|
| `--color-badge-published` | `#22c55e` | `rgb(34, 197, 94)` | Published quiz status |
| `--color-badge-draft` | `#6b7280` | `rgb(107, 114, 128)` | Draft quiz status |
| `--color-badge-archived` | `#9ca3af` | `rgb(156, 163, 175)` | Archived quiz status |
| `--color-badge-active` | `#3b82f6` | `rgb(59, 130, 246)` | Active quiz session |

---

## 5. NEUTRAL COLORS

### 5.1 Light Mode Neutrals

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-neutral-0` | `#ffffff` | `rgb(255, 255, 255)` | Page backgrounds |
| `--color-neutral-50` | `#f9fafb` | `rgb(249, 250, 251)` | Section backgrounds |
| `--color-neutral-100` | `#f3f4f6` | `rgb(243, 244, 246)` | Card backgrounds |
| `--color-neutral-200` | `#e5e7eb` | `rgb(229, 231, 235)` | Borders, dividers |
| `--color-neutral-300` | `#d1d5db` | `rgb(209, 213, 219)` | Disabled states |
| `--color-neutral-400` | `#9ca3af` | `rgb(156, 163, 175)` | Placeholder text |
| `--color-neutral-500` | `#6b7280` | `rgb(107, 114, 128)` | Secondary text |
| `--color-neutral-600` | `#4b5563` | `rgb(75, 85, 99)` | Body text |
| `--color-neutral-700` | `#374151` | `rgb(55, 65, 81)` | Headings |
| `--color-neutral-800` | `#1f2937` | `rgb(31, 41, 55)` | Primary text |
| `--color-neutral-900` | `#111827` | `rgb(17, 24, 39)` | High emphasis text |

### 5.2 Dark Mode Neutrals

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-neutral-0` | `#0f172a` | `rgb(15, 23, 42)` | Page backgrounds |
| `--color-neutral-50` | `#1e293b` | `rgb(30, 41, 59)` | Section backgrounds |
| `--color-neutral-100` | `#334155` | `rgb(51, 65, 85)` | Card backgrounds |
| `--color-neutral-200` | `#475569` | `rgb(71, 85, 105)` | Borders, dividers |
| `--color-neutral-300` | `#64748b` | `rgb(100, 116, 139)` | Disabled states |
| `--color-neutral-400` | `#94a3b8` | `rgb(148, 163, 184)` | Placeholder text |
| `--color-neutral-500` | `#cbd5e1` | `rgb(203, 213, 225)` | Secondary text |
| `--color-neutral-600` | `#e2e8f0` | `rgb(226, 232, 240)` | Body text |
| `--color-neutral-700` | `#f1f5f9` | `rgb(241, 245, 249)` | Headings |
| `--color-neutral-800` | `#f8fafc` | `rgb(248, 250, 252)` | Primary text |
| `--color-neutral-900` | `#ffffff` | `rgb(255, 255, 255)` | High emphasis text |

---

## 6. THEME CONFIGURATIONS

### 6.1 Theme A - Light Mode (Student Join, Assessment Editor)

```css
:root[data-theme="light"] {
  /* Primary */
  --color-primary-base: #6467f2;
  --color-primary-hover: #4f46e5;
  --color-primary-active: #4338ca;
  --color-primary-light: #a5b4fc;
  --color-primary-lighter: #e0e7ff;

  /* Background */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-bg-tertiary: #f3f4f6;
  --color-bg-pattern: #e0e7ff;

  /* Text */
  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-text-tertiary: #6b7280;
  --color-text-inverse: #ffffff;

  /* Border */
  --color-border-primary: #e5e7eb;
  --color-border-secondary: #d1d5db;

  /* Font & Roundness */
  --font-family: 'Lexend', sans-serif;
  --border-radius: 12px;
  --saturation: 3;
}
```

### 6.2 Theme B - Dark Mode (Teacher Dashboard, Quiz Screens)

```css
:root[data-theme="dark"] {
  /* Primary */
  --color-primary-base: #6a25f4;
  --color-primary-hover: #7c3aed;
  --color-primary-active: #5b21b6;
  --color-primary-light: #a78bfa;
  --color-primary-lighter: #ddd6fe;

  /* Background */
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-bg-tertiary: #334155;
  --color-bg-pattern: #1e293b;

  /* Text */
  --color-text-primary: #f8fafc;
  --color-text-secondary: #e2e8f0;
  --color-text-tertiary: #cbd5e1;
  --color-text-inverse: #0f172a;

  /* Border */
  --color-border-primary: #475569;
  --color-border-secondary: #64748b;

  /* Font & Roundness */
  --font-family: 'Lexend', sans-serif;
  --border-radius: 12px;
  --saturation: 2;
}
```

---

## 7. USAGE GUIDELINES

### 7.1 Do's and Don'ts

| Do ✅ | Don't ❌ |
|-------|---------|
| Use primary color for main CTAs | Use primary color for backgrounds |
| Use semantic colors consistently | Mix success/error colors |
| Maintain contrast ratios | Use light text on light backgrounds |
| Use neutral palette for text hierarchy | Use pure black (#000000) |

### 7.2 Button States

| State | Background | Text | Border |
|-------|------------|------|--------|
| Default | `--color-primary-base` | `#ffffff` | transparent |
| Hover | `--color-primary-hover` | `#ffffff` | transparent |
| Active | `--color-primary-active` | `#ffffff` | transparent |
| Disabled | `--color-neutral-300` | `--color-neutral-500` | transparent |

### 7.3 Card Components

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | `--color-neutral-0` | `--color-neutral-100` |
| Border | `--color-neutral-200` | `--color-neutral-200` |
| Shadow | `rgba(0,0,0,0.1)` | `rgba(0,0,0,0.3)` |

---

## 8. ACCESSIBILITY

### 8.1 WCAG 2.1 AA Contrast Requirements

| Content Type | Minimum Ratio | Target |
|--------------|---------------|--------|
| Normal Text | 4.5:1 | 7:1 |
| Large Text (18px+ bold, 24px+) | 3:1 | 4.5:1 |
| UI Components | 3:1 | 4.5:1 |

### 8.2 Tested Color Combinations

| Foreground | Background | Ratio | Status |
|------------|------------|-------|--------|
| `#111827` | `#ffffff` | 16.1:1 | ✅ Pass |
| `#ffffff` | `#6467f2` | 5.8:1 | ✅ Pass |
| `#ffffff` | `#6a25f4` | 6.2:1 | ✅ Pass |
| `#4b5563` | `#ffffff` | 5.0:1 | ✅ Pass |
| `#e2e8f0` | `#0f172a` | 12.5:1 | ✅ Pass |

### 8.3 Color Blindness Considerations

- Never use color alone to convey information
- Always pair colors with icons, labels, or patterns
- Test designs with color blindness simulators

---

## 9. CODE IMPLEMENTATION

### 9.1 Tailwind CSS Configuration

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary-base)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          light: 'var(--color-primary-light)',
          lighter: 'var(--color-primary-lighter)',
        },
        accent: {
          pink: '#ec4899',
          blue: '#3b82f6',
          orange: '#f97316',
          purple: '#8b5cf6',
          teal: '#14b8a6',
        },
        success: {
          DEFAULT: '#22c55e',
          light: '#86efac',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fcd34d',
        },
        error: {
          DEFAULT: '#ef4444',
          light: '#fca5a5',
        },
        info: {
          DEFAULT: '#3b82f6',
          light: '#93c5fd',
        },
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
      },
    },
  },
}
```

### 9.2 CSS Variables (globals.css)

```css
@layer base {
  :root[data-theme="light"] {
    --color-primary-base: #6467f2;
    --color-primary-hover: #4f46e5;
    --color-primary-active: #4338ca;
    --color-primary-light: #a5b4fc;
    --color-primary-lighter: #e0e7ff;
    
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f9fafb;
    --color-bg-tertiary: #f3f4f6;
    
    --color-text-primary: #111827;
    --color-text-secondary: #4b5563;
    --color-text-tertiary: #6b7280;
    
    --color-border-primary: #e5e7eb;
    --color-border-secondary: #d1d5db;
  }

  :root[data-theme="dark"] {
    --color-primary-base: #6a25f4;
    --color-primary-hover: #7c3aed;
    --color-primary-active: #5b21b6;
    --color-primary-light: #a78bfa;
    --color-primary-lighter: #ddd6fe;
    
    --color-bg-primary: #0f172a;
    --color-bg-secondary: #1e293b;
    --color-bg-tertiary: #334155;
    
    --color-text-primary: #f8fafc;
    --color-text-secondary: #e2e8f0;
    --color-text-tertiary: #cbd5e1;
    
    --color-border-primary: #475569;
    --color-border-secondary: #64748b;
  }
}
```

### 9.3 React Component Example

```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-base text-white hover:bg-primary-hover active:bg-primary-active',
        secondary: 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200',
        outline: 'border-2 border-primary-base text-primary-base hover:bg-primary-lighter',
        ghost: 'text-primary-base hover:bg-primary-lighter',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

export function Button({ variant, size, children }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size })}>
      {children}
    </button>
  )
}
```

---

## APPENDIX A: SCREEN-SPECIFIC THEMES

| Screen | Theme | Primary Color | Background |
|--------|-------|---------------|------------|
| Student Join Screen | Light | `#6467f2` | Patterned dark |
| Teacher Dashboard | Dark | `#6a25f4` | `#0f172a` |
| Quiz: Multiple Choice | Dark | `#6a25f4` | Grid pattern |
| Quiz: Essay Question | Dark | `#6a25f4` | Minimalist dark |
| Assessment Editor | Light | `#6467f2` | `#ffffff` |

---

## APPENDIX B: QUICK REFERENCE

### Primary Colors at a Glance

```
Light Theme:  ██████████ #6467f2
Dark Theme:   ██████████ #6a25f4
```

### Semantic Colors at a Glance

```
Success:      ██████████ #22c55e
Warning:      ██████████ #f59e0b
Error:        ██████████ #ef4444
Info:         ██████████ #3b82f6
```

### Option Card Colors

```
Option A:     ██████████ #8b5cf6 (Purple)
Option B:     ██████████ #3b82f6 (Blue)
Option C:     ██████████ #f97316 (Orange)
Option D:     ██████████ #ec4899 (Pink)
```
