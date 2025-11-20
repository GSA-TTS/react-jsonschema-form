import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Alert } from '@trussworks/react-uswds'; // Import Alert
import { TranslatableString } from '@rjsf/utils'; // Import TranslatableString
/** The `ErrorList` component is the template that renders the all the errors associated with the fields in the `Form`
 *
 * @param props - The `ErrorListProps` for this component
 */
export default function ErrorListTemplate({ errors, registry }) {
  // Destructure registry
  const { translateString } = registry; // Get translateString from registry
  if (errors.length === 0) {
    return null;
  }
  // Use the implementation from ErrorList.tsx
  return _jsxs('div', {
    className: 'panel panel-danger errors',
    children: [
      ' ',
      _jsx(Alert, {
        type: 'error',
        heading: translateString(TranslatableString.ErrorsLabel),
        headingLevel: 'h4',
        slim: true,
        children: _jsxs('ul', {
          className: 'error-detail',
          children: [
            ' ',
            errors.map((error, index) => {
              return (
                // Use USWDS recommended class or keep text-danger
                _jsx('li', { className: 'text-danger', children: error.stack }, index)
              );
            }),
          ],
        }),
      }),
    ],
  });
}
//# sourceMappingURL=ErrorListTemplate.js.map
