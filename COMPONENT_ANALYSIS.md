# Component Usage Analysis

## Shared Components (Used Across Multiple Pages)

### 1. **ModelsGrid** 📍 Used in: Home.jsx, Models.jsx
**Current CSS:** `ModelsGrid.css`
**Usage Pattern:** 
- Model preview tiles/cards
- Filters functionality
- Grid layout

**Refactor Strategy:**
- Keep as shared component with `.models-grid__` prefix
- Extract filter styles to separate section
- Model tiles should be reusable pattern

### 2. **Header** 📍 Used in: App.jsx (global)
**Current CSS:** `Header.css`
**Usage Pattern:**
- Navigation
- Logo
- Auth buttons
- Mobile menu

**Refactor Strategy:**
- Keep as global component with `.header__` prefix
- Button styles can reference global `.btn-` classes

### 3. **Footer** 📍 Used in: App.jsx (global)
**Current CSS:** `Footer.css`
**Usage Pattern:**
- Site-wide footer
- Links and information

**Refactor Strategy:**
- Keep as global component with `.footer__` prefix

### 4. **Lightbox** 📍 Used in: ModelProfile.jsx, ModelProfile.backup.jsx
**Current CSS:** `Lightbox.css`
**Usage Pattern:**
- Image/video preview modal
- Close functionality

**Refactor Strategy:**
- Keep as shared component with `.lightbox__` prefix
- Modal backdrop patterns can be shared

### 5. **Profile Tabs** 📍 Used in: Dashboard variants
**Components:** CreatorProfileTabs, ViewerProfileTabs, ProfileTabs
**Current CSS:** Likely in Dashboard.css
**Usage Pattern:**
- Tab navigation
- Content switching

**Refactor Strategy:**
- Extract to separate shared CSS file: `ProfileTabs.css`
- Use `.profile-tabs__` prefix

## Page-Specific Components

### 1. **HeroSlider** 📍 Used in: Home.jsx only
**Current CSS:** `HeroSlider.css`
**Usage Pattern:**
- Homepage hero section
- Image slideshow

**Refactor Strategy:**
- Keep as page-specific with `.hero-slider__` prefix
- Move to Home.css or keep separate if large

### 2. **Banners** 📍 Used in: Home.jsx only
**Current CSS:** `Banners.css`
**Usage Pattern:**
- Homepage promotional banners

**Refactor Strategy:**
- Keep as page-specific with `.banners__` prefix
- Consider merging with Home.css if small

### 3. **ScrollToTop** 📍 Used in: App.jsx (utility)
**Current CSS:** Likely in globals or none
**Usage Pattern:**
- Scroll behavior utility

**Refactor Strategy:**
- Keep as utility component
- Styles should be minimal, possibly in globals

## Shared Patterns (Not Components)

### 1. **Button Styles**
**Current Usage:**
- `.btn-primary`, `.btn-secondary` (globals)
- `.btn-login`, `.btn-register`, `.btn-dashboard` (Header)
- `.btn-creator-large` (BecomeCreator)
- `.mobile-btn-*` variants (Header mobile)

**Refactor Strategy:**
- Consolidate in globals.css with `.btn-` prefix
- Create modifier system: `.btn--primary`, `.btn--large`, `.btn--mobile`

### 2. **Model Cards/Tiles**
**Current Usage:**
- `.model-tile` (ModelsGrid)
- `.model-card` (Subscriptions)

**Refactor Strategy:**
- Create shared pattern in globals.css
- Use `.model-preview` with modifiers like `.model-preview--tile`, `.model-preview--card`

### 3. **Form Elements**
**Current Usage:**
- Various form inputs across auth forms and filters
- Search inputs in Messages

**Refactor Strategy:**
- Create shared form patterns in globals.css
- Use `.form-input`, `.form-select`, `.form-button` patterns

## Conflict Resolution Strategy

### High-Risk Conflicts:
1. **Button Styles:** Multiple button definitions across files
2. **Container Classes:** Generic `.container` usage
3. **Header Elements:** Generic `.header` vs specific headers
4. **Grid Systems:** Multiple grid implementations

### Resolution Plan:
1. **Phase 1:** Consolidate shared patterns in globals.css
2. **Phase 2:** Apply component prefixes to avoid conflicts
3. **Phase 3:** Update HTML/JSX to use new class names
4. **Phase 4:** Remove duplicate/conflicting styles

## Implementation Priority

### High Priority (Most Used/Risky):
1. Button consolidation (used everywhere)
2. ModelsGrid (used in multiple pages)
3. Header (complex mobile menu)

### Medium Priority:
1. Profile Tabs extraction
2. Form element standardization
3. Model card patterns

### Low Priority:
1. Page-specific components (lower conflict risk)
2. Utility components

## Expected Outcomes

### Before Refactor Issues:
- Generic class names causing conflicts
- Duplicate button styles
- Media queries scattered
- No clear component boundaries

### After Refactor Benefits:
- Scoped component styles
- Consistent shared patterns
- Organized media queries
- Clear style ownership
- Reduced CSS size through deduplication