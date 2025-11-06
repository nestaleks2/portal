# CSS Style Guide and Naming Conventions

## Naming Convention Strategy

### 1. Component-Based BEM Methodology

We'll use a modified BEM (Block, Element, Modifier) approach with component prefixes:

```
.[component]__[element]--[modifier]
```

**Examples:**
- `.header__logo`
- `.header__nav-link--active`
- `.dashboard__profile-avatar`
- `.models-grid__item--featured`

### 2. Component Prefixes

Each CSS file should have a unique component prefix to prevent conflicts:

#### Component Files:
- **Header.css**: `.header__`
- **Footer.css**: `.footer__`
- **ModelsGrid.css**: `.models-grid__`
- **HeroSlider.css**: `.hero-slider__`
- **Lightbox.css**: `.lightbox__`
- **Banners.css**: `.banners__`
- **AuthForms.css**: `.auth-forms__`

#### Page Files:
- **Dashboard.css**: `.dashboard__`
- **Messages.css**: `.messages__`
- **Models.css**: `.models-page__`
- **Home.css**: `.home-page__`
- **ModelProfile.css**: `.model-profile__`
- **Premium.css**: `.premium-page__`
- **BecomeCreator.css**: `.become-creator__`
- **Subscriptions.css**: `.subscriptions__`

### 3. Shared Styles Strategy

#### Global Utilities (globals.css):
- CSS Custom Properties (variables)
- Reset styles
- Typography base
- Utility classes with `.u-` prefix
- Button base classes with `.btn-` prefix

#### Shared Component Patterns:
Only these components can have shared styles across pages:
- Model preview cards (used in multiple contexts)
- Form elements
- Button variations
- Modal/lightbox components

## File Structure Organization

### 1. CSS File Internal Structure
Each CSS file should follow this order:

```css
/* 1. Component Root Styles */
.component-name { }

/* 2. Component Elements */
.component-name__element { }

/* 3. Component Modifiers */
.component-name--modifier { }
.component-name__element--modifier { }

/* 4. Component States */
.component-name:hover { }
.component-name__element:focus { }

/* 5. Utility Overrides (if needed) */
.component-name .u-utility { }

/* 6. Media Queries (ALL AT BOTTOM) */
@media (max-width: 768px) {
  .component-name { }
  .component-name__element { }
}

@media (max-width: 480px) {
  .component-name { }
}
```

### 2. Media Query Breakpoints

Standardized breakpoints:
```css
/* Mobile First Approach */
/* Base styles: 320px+ */

/* Small phones */
@media (min-width: 480px) { }

/* Tablets */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1200px) { }

/* Extra Large */
@media (min-width: 1440px) { }
```

## Isolation Strategy

### 1. Component Isolation Rules

1. **No Global Selectors**: Components should not use generic selectors like `.container`, `.header`, `.button`
2. **Scoped Naming**: All selectors must start with component prefix
3. **No Cross-Component Dependencies**: Components should not style other components
4. **Self-Contained**: Each component CSS should work independently

### 2. Page-Specific Rules

1. **Page containers**: Use page-specific wrapper classes
2. **Component overrides**: Only within page scope using descendant selectors
3. **Layout-specific styles**: Page files handle layout, components handle appearance

### 3. Shared Utilities

Global utilities in `globals.css` with `.u-` prefix:
- `.u-text-center`
- `.u-margin-0`
- `.u-padding-small`
- `.u-hidden`
- `.u-visually-hidden`

## Implementation Examples

### Before (Problematic):
```css
/* Multiple files using generic names */
.header { } /* conflicts possible */
.btn { }    /* too generic */
.container { } /* overused */
```

### After (Isolated):
```css
/* Header.css */
.header__root { }
.header__logo { }
.header__nav { }
.header__nav-link { }
.header__nav-link--active { }

/* Dashboard.css */
.dashboard__wrapper { }
.dashboard__header { }
.dashboard__content { }
```

## Transition Strategy

1. **Gradual refactor**: One component at a time
2. **Maintain functionality**: Visual regression testing after each change
3. **Update HTML classes**: Coordinate with React component updates
4. **Consolidate media queries**: Move all to bottom during refactor

## Benefits

1. **Conflict Prevention**: Scoped naming prevents style conflicts
2. **Maintainability**: Clear component boundaries
3. **Scalability**: Easy to add new components without fear of conflicts
4. **Performance**: Better CSS tree shaking potential
5. **Developer Experience**: Clear intent and ownership of styles