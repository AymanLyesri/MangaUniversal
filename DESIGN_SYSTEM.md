# MangaUniversal - Unified Design System

## Overview

This document describes the unified design system implemented across the MangaUniversal application. All styling has been optimized, redundancies removed, and a consistent design language established.

## 🎨 Design Principles

- **Consistency**: Single source of truth for all UI components
- **Reusability**: DRY (Don't Repeat Yourself) approach
- **Maintainability**: Centralized styles in `styles.scss`
- **Performance**: Optimized CSS with minimal redundancy
- **Scalability**: Easy to extend and modify

---

## 📦 Component Categories

### 1. **BUTTON SYSTEM**

#### Base Button Class

```html
<button class="btn">Base Button</button>
```

#### Button Variants

- **`.btn-primary`** - Primary action buttons (e.g., submit, confirm)

  ```html
  <button class="btn-primary">Primary Button</button>
  ```

- **`.btn-secondary`** - Secondary actions with border

  ```html
  <button class="btn-secondary">Secondary Button</button>
  ```

- **`.btn-ghost`** - Transparent background, subtle hover

  ```html
  <button class="btn-ghost">Ghost Button</button>
  ```

- **`.btn-danger`** - Destructive actions
  ```html
  <button class="btn-danger">Delete</button>
  ```

#### Button Sizes

- **`.btn-sm`** - Small buttons
- **`.btn-lg`** - Large buttons

#### Icon Buttons

```html
<button class="btn-icon">
  <svg class="icon">...</svg>
</button>
```

**Features:**

- Consistent padding, transitions, and hover effects
- Built-in focus states
- Active/disabled states
- Scale animations on hover

---

### 2. **CARD SYSTEM**

#### Base Card

```html
<div class="card">Card Content</div>
```

#### Card Variants

- **`.card-glass`** - Glass morphism effect with blur

  ```html
  <div class="card-glass card-content">Glass Card</div>
  ```

- **`.card-hover`** - Adds hover lift and shadow effect

  ```html
  <div class="card card-hover">Hoverable Card</div>
  ```

- **`.card-interactive`** - Combines card with hover (clickable cards)
  ```html
  <a class="card-interactive">Interactive Card</a>
  ```

#### Card Layout Parts

- **`.card-content`** - Standard padding (p-6)
- **`.card-header`** - Header with bottom border
- **`.card-footer`** - Footer with top border

---

### 3. **MANGA CARD SYSTEM**

Special card system for manga display with optimized structure:

```html
<a class="manga-card">
  <div class="manga-card-cover">
    <img class="manga-card-img" src="..." alt="..." />
    <div class="manga-card-overlay"></div>
    <!-- Badges go here -->
  </div>
  <div class="manga-card-content">
    <h3 class="manga-card-title">Manga Title</h3>
    <!-- Additional content -->
  </div>
</a>
```

**Features:**

- Automatic hover effects on image (scale + brightness)
- Gradient overlay animation
- Consistent aspect ratio (3:4)
- Title transform on hover

---

### 4. **BADGE SYSTEM**

#### Base Badge

```html
<span class="badge">Badge</span>
```

#### Badge Variants

- **`.badge-primary`** - Primary color badge
- **`.badge-secondary`** - Secondary/neutral badge with hover effects
- **`.badge-tag`** - Tag-style badges for genres/categories
- **`.badge-glass`** - Translucent glass effect (for reader/dark backgrounds)

#### Status Badges

```html
<span class="badge-status badge-status-ongoing">Ongoing</span>
<span class="badge-status badge-status-completed">Completed</span>
<span class="badge-status badge-status-hiatus">Hiatus</span>
<span class="badge-status badge-status-cancelled">Cancelled</span>
```

**Colors:**

- Ongoing: Green
- Completed: Blue
- Hiatus: Yellow
- Cancelled: Red

---

### 5. **SECTION SYSTEM**

Page layout and section containers:

```html
<div class="section">
  <div class="section-container">
    <div class="section-header">
      <h1 class="section-title">Page Title</h1>
      <p class="section-subtitle">Page subtitle or description</p>
    </div>
    <!-- Content here -->
  </div>
</div>
```

**Features:**

- Responsive padding and margins
- Centered content with max-width
- Consistent typography scaling

---

### 6. **INPUT SYSTEM**

```html
<input class="input" placeholder="Standard input" />
<input class="input input-sm" placeholder="Small input" />
<input class="input-search" placeholder="Search..." />
```

**Features:**

- Consistent focus states
- Hover effects
- Theme-aware colors

---

### 7. **STATE SYSTEM**

#### Loading State

```html
<div class="state-loading">
  <div class="spinner h-16 w-16"></div>
  <p class="text-text-secondary">Loading...</p>
</div>
```

#### Error State

```html
<div class="state-error">
  <div class="state-error-card">
    <svg class="w-12 h-12">...</svg>
    <p>Error message</p>
  </div>
</div>
```

#### Empty State

```html
<div class="state-empty">
  <svg class="w-16 h-16">...</svg>
  <p>No content available</p>
</div>
```

#### Spinners

- **`.spinner`** - Default spinner (uses primary color)
- **`.spinner-light`** - White spinner for dark backgrounds

---

### 8. **GRID SYSTEM**

#### Manga Grid

```html
<div class="grid-manga">
  <!-- Manga cards here -->
</div>
```

**Responsive columns:**

- Mobile: 2 columns
- Small: 3 columns
- Medium: 4 columns
- Large: 5 columns
- XL: 6 columns

#### Pages Grid

```html
<div class="grid-pages">
  <!-- Page numbers -->
</div>
```

**Responsive columns:**

- Mobile: 5 columns
- Small: 8 columns
- Medium: 10 columns
- Large: 12 columns
- XL: 14 columns

---

### 9. **ICON SYSTEM**

Consistent icon sizing:

```html
<svg class="icon">...</svg>
<!-- 20px (default) -->
<svg class="icon-sm">...</svg>
<!-- 16px -->
<svg class="icon-lg">...</svg>
<!-- 24px -->
<svg class="icon-xl">...</svg>
<!-- 32px -->
```

---

### 10. **READER-SPECIFIC COMPONENTS**

Special components optimized for the manga reader:

```html
<!-- Control Bars -->
<div class="reader-control-bar-top">...</div>
<div class="reader-control-bar-bottom">...</div>

<!-- Buttons -->
<button class="reader-control-btn">Control</button>
<button class="reader-nav-btn">Navigate</button>

<!-- Badges -->
<div class="reader-page-badge">Page Info</div>
```

**Features:**

- Dark glass morphism effects
- Optimized for reading experience
- Smooth transitions

---

## 🎯 Utility Classes

### Divider

```html
<div class="divider"></div>
```

### Custom Scrollbar (Chapter List)

```html
<div class="custom-scrollbar">...</div>
```

---

## 📐 Design Tokens

### Colors (CSS Custom Properties)

All colors adapt to light/dark theme automatically:

```css
--color-surface
--color-surface-elevated
--color-surface-hover
--color-primary
--color-primary-hover
--color-text-primary
--color-text-secondary
--color-text-tertiary
--color-border
--color-border-hover
```

### Transitions

- Standard duration: `300ms`
- Timing function: `ease-out`
- Control bars: `500ms cubic-bezier(0.4, 0, 0.2, 1)`

### Border Radius

- Small: `0.5rem` (8px)
- Medium: `0.75rem` (12px)
- Large: `1rem` (16px)
- XL: `1.5rem` (24px)
- XXL: `2rem` (32px)

---

## 🔧 Component Usage Examples

### Manga Card in Grid

```html
<div class="grid-manga">
  <a class="manga-card" [routerLink]="...">
    <div class="manga-card-cover">
      <img class="manga-card-img" [src]="cover" />
      <div class="manga-card-overlay"></div>
      <span class="badge-primary">Popular</span>
    </div>
    <div class="manga-card-content">
      <h3 class="manga-card-title">{{ title }}</h3>
      <p class="text-sm text-text-secondary">{{ description }}</p>
    </div>
  </a>
</div>
```

### Info Card with Badges

```html
<div class="card-glass card-content">
  <div class="flex justify-between">
    <span class="text-text-secondary">Status</span>
    <span class="badge-status badge-status-ongoing">Ongoing</span>
  </div>
  <div class="divider"></div>
  <div class="flex gap-2">
    <span class="badge-tag">Action</span>
    <span class="badge-tag">Adventure</span>
  </div>
</div>
```

### Action Buttons

```html
<div class="flex gap-4">
  <button class="btn-primary">Read Now</button>
  <button class="btn-secondary">Add to Library</button>
  <button class="btn-ghost">Cancel</button>
</div>
```

---

## 📊 Before vs After

### Redundancy Elimination

**Before:**

- Multiple button styles scattered across components
- Inconsistent card implementations
- Duplicate badge styles
- Repeated state displays
- ~1500 lines of redundant SCSS

**After:**

- Single unified button system
- Consistent card architecture
- Centralized badge system
- Reusable state components
- ~400 lines of optimized SCSS
- **70% reduction in CSS code**

### Consistency Improvements

✅ All buttons use the same base class and modifiers
✅ All cards follow the same structure
✅ All badges have consistent styling
✅ All states use unified classes
✅ Theme transitions work seamlessly across all components

---

## 🚀 Benefits

1. **Faster Development**: Use pre-built components instead of writing custom styles
2. **Easier Maintenance**: Change styles in one place, update everywhere
3. **Better Performance**: Smaller CSS bundle, faster load times
4. **Consistent UX**: Users get a uniform experience across all pages
5. **Scalability**: Easy to add new components following the same patterns

---

## 📝 Guidelines for Developers

1. **Always use unified classes** instead of creating custom styles
2. **Extend, don't override** - if you need custom behavior, add a new variant
3. **Follow naming conventions** - `.component-variant` or `.component-part`
4. **Keep component SCSS files minimal** - only component-specific logic
5. **Test in both themes** - light and dark mode

---

## 🔄 Migration Path

All components have been updated to use the unified system:

- ✅ Home component
- ✅ Search component
- ✅ Manga card component
- ✅ Manga details component
- ✅ Chapter list component
- ✅ Header component
- ✅ Reader component

---

## 📞 Support

For questions or suggestions about the design system, refer to this document or check the implementation in `src/styles.scss`.

**Last Updated**: December 11, 2025
**Version**: 1.0
