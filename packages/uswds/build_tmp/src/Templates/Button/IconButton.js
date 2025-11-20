import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button } from '@trussworks/react-uswds';
// Helper to get a string representation for aria-label if it's an element
const getAriaLabel = (label) => {
  if (typeof label === 'string') {
    return label;
  }
  // Add more sophisticated logic here if needed to extract text from React elements
  return undefined;
};
// Map icon names or classes to button types
const ICON_MAP = {
  'arrow-up': 'arrow_upward',
  'arrow-down': 'arrow_downward',
  remove: 'delete',
  plus: 'add',
};
export default function IconButton(props) {
  const { icon, iconType, className, uiSchema, registry, ...otherProps } = props;
  const translatedIcon = ICON_MAP[icon] || icon; // Translate generic icon name
  return _jsxs(Button, {
    type: 'button',
    // Use unstyled for icon-only buttons in arrays typically
    unstyled: true,
    ...otherProps,
    className: `usa-button--icon-only ${className || ''}`,
    'aria-label': getAriaLabel(otherProps.title),
    children: [
      _jsx('span', { className: `usa-icon usa-icon--${translatedIcon}`, 'aria-hidden': 'true' }),
      _jsx('span', { className: 'usa-sr-only', children: otherProps.title }),
      ' ',
    ],
  });
}
//# sourceMappingURL=IconButton.js.map
