import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { FormGroup, Label } from '@trussworks/react-uswds';
export default function Field(props) {
  const { id, label, help, required, description, errors, children, hidden } = props;
  if (hidden) {
    return children;
  }
  const hasErrors = Array.isArray(errors) && errors.length > 0;
  return _jsxs(FormGroup, {
    error: hasErrors,
    children: [
      label &&
        _jsxs(Label, {
          htmlFor: id,
          error: hasErrors,
          children: [
            label,
            required && _jsx('span', { className: 'usa-label--required', children: '*' }),
          ],
        }),
      description && _jsx('div', { className: 'usa-hint', children: description }),
      children,
      errors,
      help && _jsx('div', { className: 'usa-hint', children: help }),
    ],
  });
}
//# sourceMappingURL=Field.js.map
