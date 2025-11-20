# RJSF USWDS Theme - Component Best Practices Guide

**Version**: 1.0  
**Created**: November 2024  
**Status**: Production Ready

---

## Overview

This document outlines best practices for developing and maintaining widgets and templates in the RJSF USWDS theme. The core principle is: **all styling goes in the centralized `_overrides.scss` file, never in component code**.

---

## Core Principles

### 1. Separation of Concerns

**Components Handle**:
- ✅ Value binding and state management
- ✅ Event handling (onChange, onBlur, onFocus)
- ✅ ARIA attributes and accessibility
- ✅ Prop validation and mapping
- ✅ Composition of React-USWDS components

**Styling Handles**:
- ✅ Layout and spacing
- ✅ Colors and typography
- ✅ Responsive design
- ✅ Hover/focus/active states
- ✅ Animations and transitions
- ✅ Theme customization

### 2. No Inline Styles or Hardcoded Classes

**❌ WRONG**:
```typescript
<div className="margin-bottom-2" style={{ display: 'flex', gap: '1rem' }}>
  {/* content */}
</div>
```

**✅ CORRECT**:
```typescript
<div className="array-field-container">
  {/* content */}
</div>
```
Then define `.array-field-container` styling in `_overrides.scss`.

### 3. Use React-USWDS Components as-is

Never modify React-USWDS component styling or className in your widgets.

**❌ WRONG**:
```typescript
<TextInput 
  className="my-custom-input" 
  style={{ marginBottom: '1rem' }}
/>
```

**✅ CORRECT**:
```typescript
<TextInput 
  id={id}
  name={id}
  value={value}
  onChange={_onChange}
/>
```
The TextInput component applies its own USWDS classes. Add wrapper styling in `_overrides.scss` if needed.

### 4. UiSchema for Behavior, Not Styling

Use `uiSchema` in RJSF for behavioral options, not CSS overrides.

**✅ Correct Usage**:
```typescript
const uiSchema = {
  firstName: {
    'ui:title': 'First Name',
    'ui:placeholder': 'Enter your first name',
    'ui:help': 'Your legal first name',
    'ui:options': {
      rows: 5,  // For textarea height
    },
  },
};
```

**❌ Avoid**:
```typescript
const uiSchema = {
  firstName: {
    'ui:className': 'my-custom-class',  // Don't do this
    'ui:style': { color: 'red' },       // Don't do this
  },
};
```

---

## Widget Development Standards

### 1. Basic Widget Template

```typescript
import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { YourUSWDSComponent } from '@trussworks/react-uswds';

export default function YourWidget<
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
  options,
  schema,
  rawErrors = [],
  registry,
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

  // 4. Check for errors
  const hasErrors = rawErrors.length > 0;

  // 5. Render React-USWDS component with proper props
  return (
    <YourUSWDSComponent
      id={id}
      name={id}
      value={value ?? ''}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      disabled={disabled || readonly}
      required={required}
      aria-invalid={hasErrors}
      aria-describedby={hasErrors ? `${id}__errors` : undefined}
      // Don't add className or style here
    />
  );
}
```

### 2. Widget Checklist

- [ ] Import from `@rjsf/utils` (not from external UI libraries)
- [ ] Import React-USWDS component only (no custom components)
- [ ] Implement all required WidgetProps properties
- [ ] Handle onChange with proper value transformation
- [ ] Handle onBlur with proper value transformation
- [ ] Handle onFocus with proper value transformation
- [ ] Set aria-invalid based on rawErrors
- [ ] Set aria-describedby for error messages
- [ ] Never hardcode className (except React-USWDS default)
- [ ] Never add inline styles
- [ ] Handle disabled and readonly states
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Test keyboard navigation
- [ ] Add JSDoc comments for complex logic
- [ ] Export as default
- [ ] Add unit tests

### 3. Value Transformation Patterns

**For String Inputs**:
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  onChange(e.target.value === '' ? options.emptyValue : e.target.value);
};
```

**For Checkboxes**:
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  onChange(e.target.checked);
};
```

**For Select Dropdowns**:
```typescript
const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  onChange(e.target.value === '' ? options.emptyValue : e.target.value);
};
```

**For Number Inputs**:
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  onChange(val === '' ? options.emptyValue : parseFloat(val));
};
```

### 4. Accessibility Requirements

Every widget MUST include:

```typescript
// 1. aria-invalid for error state
aria-invalid={hasErrors}

// 2. aria-describedby for error/help text
aria-describedby={hasErrors ? `${id}__errors` : undefined}

// 3. aria-label or associated label
// (handled by FieldTemplate, not widget)

// 4. Proper form control attributes
id={id}
name={id}
required={required}
disabled={disabled || readonly}

// 5. Focus management
onBlur={() => onBlur(id, value)}
onFocus={() => onFocus(id, value)}
```

---

## Template Development Standards

### 1. Basic Template Structure

```typescript
import {
  FieldTemplateProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { FormGroup, Label } from '@trussworks/react-uswds';

export default function CustomFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: FieldTemplateProps<T, S, F>) {
  const {
    id,
    label,
    children,
    errors,
    help,
    description,
    hidden,
    required,
    displayLabel,
    classNames,
    style,
    rawErrors = [],
    schema,
  } = props;

  // 1. Handle hidden fields
  if (hidden) {
    return <div style={{ display: 'none' }}>{children}</div>;
  }

  // 2. Check for errors
  const hasErrors = rawErrors.length > 0;

  // 3. Determine if we should show label
  const showLabel = displayLabel && !!label;

  // 4. Return wrapped content
  return (
    <div className={classNames} style={style}>
      <FormGroup error={hasErrors}>
        {showLabel && (
          <Label htmlFor={id} error={hasErrors}>
            {label}
            {required && <span className="usa-label--required">*</span>}
          </Label>
        )}
        {displayLabel && description ? description : null}
        {help}
        {errors}
        {children}
      </FormGroup>
    </div>
  );
}
```

### 2. Template Checklist

- [ ] Handle all FieldTemplateProps properties
- [ ] Respect hidden property
- [ ] Use displayLabel to conditionally show labels
- [ ] Show required indicator when required=true
- [ ] Display errors with aria-invalid
- [ ] Display help text separately from description
- [ ] Preserve classNames and style props
- [ ] Use React-USWDS FormGroup/Label components
- [ ] Never add custom className overrides
- [ ] Never add inline styles
- [ ] Test with multiple schema types (string, object, array)
- [ ] Test with and without errors
- [ ] Test with and without help text

### 3. Common Template Types

**Field Template** (single field wrapper):
- Wraps labels, hints, errors, help text
- Uses `FormGroup` and `Label` from React-USWDS
- Handles error state visually
- Should be reusable across all widget types

**Object Field Template** (grouped fields):
- Uses `fieldset` and `legend` for semantic HTML
- Groups related fields
- Can have nested fields
- Handles required state for the group

**Array Field Template** (repeating sections):
- Provides add/remove/reorder buttons
- Shows item count or indicators
- Handles empty states
- Manages button visibility based on schema

**Error List Template** (form-level errors):
- Shows all validation errors at once
- Uses Alert component for visibility
- Should be placed above form
- Links to field IDs if possible

---

## CSS Organization (in `_overrides.scss`)

### Section Structure

```scss
// ============================================================================
// SECTION N: COMPONENT NAME
// ============================================================================
// Description of what this section styles

.component-class {
  // Base styles
  property: value;

  // Pseudo-classes
  &:hover {
    // hover state
  }

  &:focus {
    // focus state (keyboard accessible)
  }

  &:disabled {
    // disabled state
  }

  &[aria-invalid='true'] {
    // error state
  }

  // Modifiers
  &--modifier {
    // variation
  }

  // Child elements
  .component-child {
    // child styling
  }
}
```

### Design Tokens

Always use design token variables defined at top of `_overrides.scss`:

```scss
// Colors
color: $uswds-primary-color;
color: $uswds-secondary-color;
color: $uswds-base-dark;

// Spacing (8px base unit)
margin-bottom: $uswds-spacing-md;
padding: $uswds-spacing-sm;
gap: $uswds-spacing-lg;

// Typography
font-family: $uswds-font-family;
font-size: $uswds-font-size-base;
font-weight: $uswds-font-weight-bold;

// Focus state
outline: $uswds-focus-outline-width solid $uswds-focus-outline-color;
outline-offset: $uswds-focus-outline-offset;

// Touch target minimum
min-height: $uswds-touch-target-min;
```

### Customization

To customize colors/spacing globally, override variables at top of `_overrides.scss`:

```scss
// Override defaults
$uswds-primary-color: #003366;        // Your primary color
$uswds-spacing-md: 1.25rem;           // Your spacing
$uswds-font-size-base: 1.0625rem;     // Your font size
```

---

## Common Patterns

### Pattern 1: Text Input with Validation

**Widget**:
```typescript
export default function EmailWidget({ 
  id, value, onChange, onBlur, disabled, required, rawErrors 
}: WidgetProps) {
  const hasErrors = rawErrors.length > 0;

  return (
    <TextInput
      id={id}
      name={id}
      type="email"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => onBlur(id, value)}
      disabled={disabled}
      required={required}
      aria-invalid={hasErrors}
      aria-describedby={hasErrors ? `${id}__errors` : undefined}
    />
  );
}
```

**Styling** (in `_overrides.scss`):
```scss
.usa-input[type="email"] {
  // Inherits all base input styles
  // No additional styling needed unless customizing
}
```

### Pattern 2: Checkbox Group

**Widget**:
```typescript
export default function CheckboxesWidget({ 
  id, value = [], onChange, options, required, rawErrors 
}: WidgetProps) {
  const { enumOptions = [] } = options;
  const hasErrors = rawErrors.length > 0;

  return (
    <fieldset>
      <legend className="usa-legend">{label}</legend>
      {enumOptions.map((option, idx) => (
        <Checkbox
          key={idx}
          id={`${id}-${idx}`}
          label={option.label}
          checked={value.includes(option.value)}
          onChange={(e) => {
            const newValue = e.target.checked
              ? [...value, option.value]
              : value.filter(v => v !== option.value);
            onChange(newValue);
          }}
          aria-invalid={hasErrors}
        />
      ))}
    </fieldset>
  );
}
```

**Styling** (in `_overrides.scss`):
```scss
.usa-checkbox {
  margin-bottom: $uswds-spacing-md;
  
  &:last-child {
    margin-bottom: 0;
  }
}
```

### Pattern 3: Array Field

**Template**:
```typescript
export default function ArrayFieldTemplate({ 
  canAdd, items, onAddClick, title 
}: ArrayFieldTemplateProps) {
  return (
    <fieldset className="usa-fieldset">
      <legend className="usa-legend">{title}</legend>
      {items.map((item) => (
        <div key={item.key} className="array-field-item">
          <ArrayFieldItemTemplate {...item} />
        </div>
      ))}
      {canAdd && (
        <Button 
          type="button" 
          secondary 
          onClick={onAddClick}
        >
          Add Item
        </Button>
      )}
    </fieldset>
  );
}
```

**Styling** (in `_overrides.scss`):
```scss
.array-field-item {
  padding: $uswds-spacing-md;
  margin-bottom: $uswds-spacing-md;
  border: 1px solid $uswds-border-gray;
  background-color: $uswds-base-light;
}
```

---

## Testing Standards

### Unit Tests

Every widget/template should have tests for:

```typescript
describe('YourWidget', () => {
  it('renders with label and value', () => {
    render(
      <YourWidget
        id="test"
        label="Test Label"
        value="test value"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Test Label')).toHaveValue('test value');
  });

  it('calls onChange on value change', async () => {
    const onChange = jest.fn();
    render(
      <YourWidget
        id="test"
        label="Test"
        value=""
        onChange={onChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'new value');
    expect(onChange).toHaveBeenCalledWith('new value');
  });

  it('calls onBlur on blur', async () => {
    const onBlur = jest.fn();
    render(
      <YourWidget
        id="test"
        label="Test"
        value=""
        onChange={jest.fn()}
        onBlur={onBlur}
      />
    );
    
    const input = screen.getByRole('textbox');
    input.focus();
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  it('shows error state when errors present', () => {
    render(
      <YourWidget
        id="test"
        label="Test"
        value=""
        onChange={jest.fn()}
        rawErrors={['Required field']}
      />
    );
    
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('respects disabled state', () => {
    render(
      <YourWidget
        id="test"
        label="Test"
        value=""
        disabled={true}
        onChange={jest.fn()}
      />
    );
    
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
```

### Accessibility Tests

```typescript
it('has proper ARIA attributes', () => {
  render(
    <YourWidget
      id="test"
      label="Test Field"
      value=""
      required={true}
      onChange={jest.fn()}
    />
  );
  
  const control = screen.getByRole('textbox');
  expect(control).toHaveAttribute('required');
  expect(control).toHaveAttribute('aria-label', expect.anything());
});

it('is keyboard navigable', async () => {
  render(
    <YourWidget
      id="test"
      label="Test"
      value=""
      onChange={jest.fn()}
    />
  );
  
  const input = screen.getByRole('textbox');
  expect(input).toHaveFocus() // After tabbing to it
});
```

### Manual Testing Checklist

- [ ] Tab through form - all controls are reachable
- [ ] Keyboard navigation works (Enter, Space, Arrow keys)
- [ ] Tab order is logical
- [ ] Focus indicator is visible (2px outline)
- [ ] Error messages are announced by screen reader
- [ ] Labels are properly associated with inputs
- [ ] Required fields marked with asterisk
- [ ] Disabled fields cannot be activated
- [ ] Touch targets are 44px minimum (mobile)
- [ ] Color is not the only indicator (has icons/text)
- [ ] Form works with browser zoom (up to 200%)
- [ ] Form works with dark mode (if supported)

---

## Documentation Requirements

### Widget Doc Template

```typescript
/**
 * TextInputWidget renders a text input field.
 * 
 * This widget uses the React-USWDS TextInput component with RJSF 
 * value binding, validation, and accessibility features.
 *
 * Accessibility:
 * - Properly labeled via FieldTemplate
 * - ARIA attributes for error states
 * - Full keyboard navigation support
 * - Screen reader compatible
 *
 * @param props - WidgetProps from RJSF
 * @returns React component
 * 
 * @example
 * const schema = {
 *   type: 'object',
 *   properties: {
 *     name: { type: 'string', title: 'Name' }
 *   }
 * };
 * 
 * const uiSchema = {
 *   name: { 'ui:widget': 'TextInputWidget' }
 * };
 */
export default function TextInputWidget(props: WidgetProps) {
  // Implementation...
}
```

### Configuration Doc

```typescript
/**
 * Configuration options for TextInputWidget via uiSchema
 * 
 * @param ui:placeholder - Placeholder text for the input
 * @param ui:help - Help text shown below the input
 * @param ui:disabled - Disable the input
 * @param ui:readonly - Make the input read-only
 * 
 * @example
 * {
 *   name: {
 *     'ui:widget': 'TextInputWidget',
 *     'ui:placeholder': 'Enter your name',
 *     'ui:help': 'Your full legal name'
 *   }
 * }
 */
```

---

## Code Review Checklist

When reviewing widget/template PRs:

### Component Code
- [ ] No inline styles (style={...})
- [ ] No hardcoded className except React-USWDS defaults
- [ ] All WidgetProps/FieldTemplateProps used properly
- [ ] Proper event handlers (onChange, onBlur, onFocus)
- [ ] Error states handled with aria-invalid
- [ ] Accessibility attributes present
- [ ] React-USWDS components used directly
- [ ] Proper TypeScript types
- [ ] No console.log or debug code
- [ ] Proper error handling

### Styling
- [ ] No CSS in component files
- [ ] Only USWDS classes used (no custom)
- [ ] Design tokens used for values
- [ ] Responsive design implemented
- [ ] Focus states defined
- [ ] Color contrast checked (4.5:1)
- [ ] Touch targets minimum 44px

### Testing
- [ ] Unit tests included
- [ ] 80%+ coverage
- [ ] Accessibility tests included
- [ ] Edge cases tested
- [ ] Error states tested
- [ ] Disabled/readonly states tested

### Documentation
- [ ] JSDoc comments present
- [ ] Usage example provided
- [ ] Configuration options documented
- [ ] Accessibility notes included
- [ ] CHANGELOG updated

---

## Migration Guide: Fixing Existing Components

### Step 1: Identify Inline Styles

```bash
grep -r "style={{" packages/uswds/src/Widgets/
grep -r "style={{" packages/uswds/src/Templates/
```

### Step 2: Move to `_overrides.scss`

**Before**:
```typescript
<div style={{ marginBottom: '1rem', padding: '1rem' }}>
```

**After**:
```typescript
<div className="custom-container">
```

```scss
// In _overrides.scss
.custom-container {
  margin-bottom: $uswds-spacing-md;
  padding: $uswds-spacing-md;
}
```

### Step 3: Remove Hardcoded Classes

**Before**:
```typescript
<CheckboxWidget className="margin-bottom-2" />
```

**After**:
```typescript
<CheckboxWidget />
```

```scss
// In _overrides.scss
.usa-checkbox {
  margin-bottom: $uswds-spacing-sm;
}
```

### Step 4: Verify Accessibility

- [ ] Test with WAVE
- [ ] Test with keyboard navigation
- [ ] Test with screen reader
- [ ] Run accessibility tests

### Step 5: Update Tests

Update any tests that checked for specific classes/styles.

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Inline Styles for Spacing

```typescript
// WRONG
<Button style={{ marginTop: '1rem', marginBottom: '2rem' }}>
```

**Fix**: Use SCSS in `_overrides.scss`

### ❌ Mistake 2: Custom CSS Classes

```typescript
// WRONG
<TextInput className="my-input-style" />
```

**Fix**: Use React-USWDS component as-is, add styling in `_overrides.scss` for wrapper

### ❌ Mistake 3: Missing ARIA Attributes

```typescript
// WRONG
<input value={value} onChange={handleChange} />
```

**Fix**:
```typescript
<input 
  value={value} 
  onChange={handleChange}
  aria-invalid={hasErrors}
  aria-describedby={hasErrors ? `${id}__errors` : undefined}
/>
```

### ❌ Mistake 4: Not Using React-USWDS Components

```typescript
// WRONG
<button className="usa-button">Submit</button>
```

**Fix**:
```typescript
<Button type="submit">Submit</Button>
```

### ❌ Mistake 5: Complex Logic in Template

```typescript
// WRONG - Too much logic in template
export default function MyTemplate(props) {
  const hasComplexValidation = props.rawErrors.some(e => 
    e.includes('complex') && e.includes('validation')
  );
  // ...
}
```

**Fix**: Keep templates simple, handle logic in utility functions

---

## Best Practice Summary

### ✅ DO:

1. **Use React-USWDS components directly**
   - TextInput, Checkbox, Radio, Select, Button, etc.
   - Use them as provided without modification

2. **Use FieldTemplate to wrap form controls**
   - Handles labels, errors, help text
   - Provides consistent styling
   - One place to update form layout

3. **Handle all accessibility attributes**
   - aria-invalid for errors
   - aria-describedby for error/help text
   - id and name attributes
   - proper label association

4. **Use uiSchema for configuration**
   - titles, descriptions, placeholders
   - help text and hints
   - widget and field options

5. **Centralize all styling in `_overrides.scss`**
   - Use design token variables
   - Follow section structure
   - Support responsive design

6. **Test thoroughly**
   - Unit tests for functionality
   - Accessibility tests
   - Manual keyboard/screen reader tests

### ❌ DON'T:

1. **Don't add CSS to component files**
   - No inline styles
   - No className overrides
   - No custom CSS modules

2. **Don't customize React-USWDS components**
   - Use them as provided
   - Create wrapper components if needed
   - Style wrappers, not components

3. **Don't skip accessibility**
   - Always include ARIA attributes
   - Always include labels
   - Always test with keyboard
   - Always test with screen reader

4. **Don't put logic in styling**
   - Styling should never affect functionality
   - Logic should never depend on CSS

5. **Don't hardcode values**
   - Use design tokens
   - Use configuration options
   - Make everything customizable

---

## Getting Help

### Resources

- [RJSF Documentation](https://rjsf-team.github.io/react-jsonschema-form/)
- [React-USWDS Storybook](https://trussworks.github.io/react-uswds/)
- [USWDS Design System](https://designsystem.digital.gov/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Quick Reference

- **RJSF_USWDS_STORYBOOK_CROSSWALK.md** - Component mapping guide
- **USWDS_INLINE_CODE_EXAMPLES.md** - Code examples
- **_overrides.scss** - Styling template

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 2024 | Initial best practices guide |

---

**Last Updated**: November 2024  
**Status**: Production Ready  
**Maintainer**: RJSF USWDS Theme Team