import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// Renamed function to TitleFieldTemplate
export default function TitleFieldTemplate({ id, title, required }) {
  // Added required prop
  if (!title) {
    return null;
  }
  // Using h5 based on potential USWDS guidelines for fieldset legends, adjust if needed
  // Added required marker logic
  return _jsxs('h5', {
    id: id,
    className: 'usa-legend',
    children: [
      title,
      required && _jsx('span', { className: 'usa-label--required', children: '*' }),
    ],
  });
}
//# sourceMappingURL=TitleFieldTemplate.js.map
