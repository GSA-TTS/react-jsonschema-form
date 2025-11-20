# USWDS Widget Development - Quick Reference Guide

**Version**: 2.0  
**Updated**: November 2024  
**Status**: Production Ready

---

## ⚡ Quick Start

### The Golden Rule
**✅ DO**: Style in `_overrides.scss`  
**❌ DON'T**: Style in component files

---

## 📋 Widget Template

```typescript
import { ChangeEvent, FocusEvent } from 'react';
import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { SomeUSWDSComponent } from '@trussworks/react-uswds';

export default function MyWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled,
  readonly,
  required,
  placeholder,
  options = {},
  schema,
  rawErrors = [],
}: WidgetProps<T, S, F>) {
  // 1. Handle value changes
  const handleChange = (newValue: any) => {
    onChange(newValue);
  };

  // 2. Handle blur events
  const handleBlur = () => {
    onBlur(id, value);
  };

  // 3. Handle focus events
  const handleFocus = () => {
    onFocus(id, value);
  };

  // 4. Render USWDS component (no className for styling!)
  return (
    <SomeUSWDSComponent
      id={id}
      name={id}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      disabled={disabled || readonly}
      required={required}
      label={label}
      placeholder={placeholder}
    />
  );
}
```

---

## 🎯 Before & After Examples

### Example 1: Text Input Widget

**❌ WRONG** (inline styling):
```typescript
<TextInput
  id={id}
  name={id}
  value={value}
  onChange={_onChange}
  className="margin-bottom-2"  // ❌ Don't do this!
  style={{ marginTop: '1rem' }} // ❌ Don't do this!
/>
```

**✅ CORRECT** (CSS-driven):
```typescript
<TextInput
  id={id}
  name={id}
  value={value}
  onChange={_onChange}
  // ✅ Spacing handled by CSS
/>
```

**SCSS (_overrides.scss)**:
```scss
.usa-input {
  margin-bottom: $uswds-spacing-md;
}
```

---

### Example 2: Radio Widget Group

**❌ WRONG** (hardcoded spacing):
```typescript
{enumOptions.map((option, i) => (
  <UswdsRadio
    key={i}
    value={option.value}
    checked={option.value === value}
    label={option.label}
    className="margin-bottom-2"  // ❌ Hardcoded spacing
  />
))}
```

**✅ CORRECT** (CSS class on container):
```typescript
<div className="usa-radio-group" id={id}>
  {enumOptions.map((option, i) => (
    <UswdsRadio
      key={i}
      value={option.value}
      checked={option.value === value}
      label={option.label}
      // ✅ No className needed
    />
  ))}
</div>
```

**SCSS (_overrides.scss)**:
```scss
.usa-radio-group .usa-radio {
  margin-bottom: $uswds-spacing-md;
  
  &:last-child {
    margin-bottom: 0;
  }
}
```

---

### Example 3: Checkbox Group with Inline Layout

**❌ WRONG** (inline styles in JSX):
```typescript
<div className={`usa-checkbox-group ${inline ? 'display-flex flex-wrap' : ''}`}>
  <Checkbox className={`margin-bottom-2${inline ? ' margin-right-2' : ''}`} />
</div>
```

**✅ CORRECT** (semantic CSS classes):
```typescript
const containerClass = inline 
  ? 'usa-checkbox-group usa-checkbox-group--inline'
  : 'usa-checkbox-group';

<div className={containerClass}>
  <Checkbox />
</div>
```

**SCSS (_overrides.scss)**:
```scss
.usa-checkbox-group {
  display: block;
}

.usa-checkbox-group--inline {
  display: flex;
  flex-wrap: wrap;
  gap: $uswds-spacing-md;
}

.usa-checkbox-group--inline .usa-checkbox {
  margin-bottom: 0;
}
```

---

## ✅ Widget Checklist

Before submitting a widget, verify:

**Code Quality**
- [ ] No `style={{}}` attributes
- [ ] No hardcoded spacing classNames (margin-*, padding-*)
- [ ] No custom `className` for styling
- [ ] Using React-USWDS components as-is
- [ ] All imports correct and used
- [ ] No console warnings/errors

**Functionality**
- [ ] Value binding works (onChange, onBlur, onFocus)
- [ ] Disabled state works
- [ ] Readonly state works
- [ ] Required indicator shows
- [ ] Error states display
- [ ] Placeholder text works

**Accessibility**
- [ ] ARIA attributes present
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Touch targets >= 44px
- [ ] Color contrast >= 4.5:1

**Styling**
- [ ] Spacing defined in `_overrides.scss`
- [ ] Using design token variables
- [ ] Responsive design included
- [ ] All states styled (hover, focus, error, disabled)
- [ ] No conflicts with existing CSS

**Testing**
- [ ] Unit tests pass
- [ ] Visual tests pass
- [ ] No regressions

---

## 🎨 Design Tokens Reference

Use these in your SCSS:

### Colors
```scss
$uswds-primary-color: #005ea2;        // Primary action
$uswds-secondary-color: #e31c3d;      // Error/danger
$uswds-success-color: #07a41e;        // Success
$uswds-base-dark: #222222;            // Text
$uswds-base-medium: #666666;          // Secondary text
$uswds-base-light: #f5f5f5;           // Background
$uswds-border-gray: #d0d0d0;          // Borders
```

### Spacing (8px base unit)
```scss
$uswds-spacing-xs: 0.25rem;   // 4px
$uswds-spacing-sm: 0.5rem;    // 8px
$uswds-spacing-md: 1rem;      // 16px ← Most common
$uswds-spacing-lg: 1.5rem;    // 24px
$uswds-spacing-xl: 2rem;      // 32px
$uswds-spacing-2xl: 3rem;     // 48px
```

### Typography
```scss
$uswds-font-family: 'Source Sans Pro', sans-serif;
$uswds-font-size-base: 1rem;           // 16px
$uswds-font-size-sm: 0.875rem;         // 14px
$uswds-font-size-lg: 1.125rem;         // 18px
$uswds-font-weight-normal: 400;
$uswds-font-weight-bold: 700;
```

### Accessibility
```scss
$uswds-focus-outline-width: 2px;
$uswds-focus-outline-color: #005ea2;
$uswds-focus-outline-offset: 2px;
$uswds-touch-target-min: 44px;        // Mobile minimum
```

---

## 🏗️ Common Patterns

### Pattern 1: Simple Text Input
```typescript
// Widget
<TextInput
  id={id}
  name={id}
  value={value ?? ''}
  onChange={(e) => onChange(e.target.value)}
  disabled={disabled || readonly}
/>

// SCSS
.usa-input {
  min-height: $uswds-touch-target-min;
  padding: $uswds-spacing-sm;
  margin-bottom: $uswds-spacing-md;
}
```

### Pattern 2: Radio/Checkbox Groups
```typescript
// Widget
<div className="usa-radio-group" id={id}>
  {options.map((opt, i) => (
    <UswdsRadio
      key={i}
      value={opt.value}
      label={opt.label}
      checked={opt.value === value}
    />
  ))}
</div>

// SCSS
.usa-radio-group .usa-radio {
  margin-bottom: $uswds-spacing-md;
  
  &:last-child {
    margin-bottom: 0;
  }
}
```

### Pattern 3: Inline Checkboxes
```typescript
// Widget
const isInline = options.inline;
const className = isInline 
  ? 'usa-checkbox-group usa-checkbox-group--inline'
  : 'usa-checkbox-group';

<div className={className} id={id}>
  {/* checkboxes */}
</div>

// SCSS
.usa-checkbox-group--inline {
  display: flex;
  flex-wrap: wrap;
  gap: $uswds-spacing-md;
}

.usa-checkbox-group--inline .usa-checkbox {
  margin-bottom: 0;
}
```

### Pattern 4: Select Dropdown
```typescript
// Widget
<Select
  id={id}
  name={id}
  value={String(value ?? '')}
  onChange={(e) => onChange(e.target.value)}
>
  {options.map((opt) => (
    <option key={opt.value} value={String(opt.value)}>
      {opt.label}
    </option>
  ))}
</Select>

// SCSS
.usa-select {
  min-height: $uswds-touch-target-min;
  padding: $uswds-spacing-sm;
  margin-bottom: $uswds-spacing-md;
}
```

### Pattern 5: Error State
```typescript
// Widget
<TextInput
  validationStatus={hasErrors ? 'error' : undefined}
  aria-invalid={hasErrors}
  aria-describedby={hasErrors ? `${id}__error` : undefined}
/>

// SCSS (already defined)
.usa-input[aria-invalid='true'] {
  border-color: $uswds-secondary-color;
}

.usa-error-message {
  color: $uswds-secondary-color;
  font-weight: $uswds-font-weight-bold;
}
```

---

## 🚫 Common Mistakes to Avoid

### ❌ Mistake 1: Inline Styles
```typescript
// WRONG
<div style={{ marginBottom: '1rem', display: 'flex' }}>
  ...
</div>

// CORRECT
<div className="my-container">
  ...
</div>
// Then style in _overrides.scss
```

### ❌ Mistake 2: Hardcoded Spacing Classes
```typescript
// WRONG
<input className="margin-bottom-2 padding-1" />

// CORRECT
<input />
// Define in _overrides.scss
```

### ❌ Mistake 3: Modifying React-USWDS Components
```typescript
// WRONG
<TextInput 
  style={{ backgroundColor: 'white' }}
  className="my-custom-class"
/>

// CORRECT
<TextInput />
// Override in _overrides.scss if needed
```

### ❌ Mistake 4: Using uiSchema for Styling
```typescript
// WRONG
uiSchema: {
  field: {
    'ui:style': { color: 'red' },
    'ui:className': 'my-class'
  }
}

// CORRECT
uiSchema: {
  field: {
    'ui:title': 'My Field',
    'ui:placeholder': 'Enter value',
    'ui:options': { rows: 5 }  // For behavior only
  }
}
```

### ❌ Mistake 5: Complex Logic in Render
```typescript
// WRONG
{options.map((opt) => (
  <Checkbox
    className={`checkbox ${opt.disabled ? 'disabled-style' : 'enabled-style'}`}
  />
))}

// CORRECT
{options.map((opt) => (
  <Checkbox
    disabled={opt.disabled}
  />
))}
// Style .usa-checkbox:disabled in _overrides.scss
```

---

## 📝 Template Development

### Template Principles
- ✅ Handle layout only
- ✅ Compose other components
- ✅ Pass props correctly
- ✅ No styling logic
- ✅ Accessibility attributes

### Template Checklist
- [ ] No inline styles
- [ ] Proper component composition
- [ ] All props passed through
- [ ] ARIA attributes included
- [ ] Responsive layout
- [ ] Accessible markup
- [ ] Tests pass

### Template Example
```typescript
import { FieldTemplateProps } from '@rjsf/utils';
import { FormGroup, Label } from '@trussworks/react-uswds';

export default function FieldTemplate<T, S, F>({
  id,
  label,
  children,
  errors,
  help,
  hidden,
  required,
  displayLabel,
}: FieldTemplateProps<T, S, F>) {
  if (hidden) {
    return <div className="rjsf-field-hidden">{children}</div>;
  }

  return (
    <FormGroup error={errors?.length > 0}>
      {displayLabel && label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="usa-label--required">*</span>}
        </Label>
      )}
      {help}
      {errors}
      {children}
    </FormGroup>
  );
}
```

---

## 🔧 Where to Add CSS

### File: `packages/uswds/src/styles/_overrides.scss`

**Sections**:
1. Design Tokens - Variable customization
2. Form Group & Layout
3. Text Inputs
4. Select & Combobox
5. Checkboxes & Radio Buttons
6. Fieldsets & Legends
7. Buttons
8. Alerts & Errors
9. Array Fields
10. Responsive Design
11. Accessibility Enhancements
12. Utility Classes
13. **Custom Component Styling** ← Add your styles here

### Example Addition
```scss
// At the end of _overrides.scss

// My Custom Widget
.my-custom-widget {
  margin-bottom: $uswds-spacing-lg;
  padding: $uswds-spacing-md;
  border: $uswds-border-width solid $uswds-border-gray;
  border-radius: $uswds-border-radius;
  background-color: $uswds-base-light;

  &:focus-within {
    outline: $uswds-focus-outline-width solid $uswds-focus-outline-color;
    outline-offset: $uswds-focus-outline-offset;
  }

  @media (max-width: 600px) {
    padding: $uswds-spacing-sm;
  }
}
```

---

## 📚 Resources

### Documentation
- `COMPONENT_BEST_PRACTICES.md` - Full development guide
- `IMPLEMENTATION_GUIDE.md` - Implementation workflow
- `CSS_CENTRALIZATION_SUMMARY.md` - Architecture overview
- `REACT_USWDS_STORYBOOK_CROSSWALK.md` - Component mapping

### External Links
- React-USWDS Docs: https://trussworks.github.io/react-uswds/
- USWDS Design System: https://designsystem.digital.gov/
- RJSF Documentation: https://rjsf-team.github.io/react-jsonschema-form/

---

## ❓ FAQ

**Q: Where do I put styling?**  
A: In `packages/uswds/src/styles/_overrides.scss` - never in component files.

**Q: Can I use inline styles?**  
A: No. Always use CSS classes and SCSS in the centralized file.

**Q: How do I customize the theme?**  
A: Override design token variables before importing _overrides.scss.

**Q: Should I modify React-USWDS components?**  
A: No. Use them as-is. Override styling in _overrides.scss if needed.

**Q: How do I handle responsive design?**  
A: Use media queries in _overrides.scss, not in components.

**Q: What about component-specific styling?**  
A: Use semantic class names like `.usa-input`, `.usa-radio-group`, etc.

**Q: Can I use uiSchema for styling?**  
A: No. Use uiSchema for behavior only (title, placeholder, options).

**Q: How do I ensure accessibility?**  
A: Include ARIA attributes, focus states, and test keyboard navigation.

**Q: Where do I add focus styles?**  
A: In _overrides.scss using `:focus` pseudo-class.

**Q: How do I test my widget?**  
A: Run unit tests, visual tests, and accessibility tests.

---

## 🎓 Learning Path

1. **Start Here**: This quick reference
2. **Deepen Knowledge**: COMPONENT_BEST_PRACTICES.md
3. **Implement**: Follow template examples above
4. **Test**: Use accessibility and visual testing
5. **Reference**: Consult REACT_USWDS_STORYBOOK_CROSSWALK.md for components
6. **Deploy**: Run full test suite before merging

---

**Last Updated**: November 2024  
**Version**: 2.0  
**Status**: Production Ready

For detailed information, see `COMPONENT_BEST_PRACTICES.md`.