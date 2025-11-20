import { jsx as _jsx } from 'react/jsx-runtime';
export default function Description({ description, id }) {
  if (!description) {
    return null;
  }
  if (typeof description === 'string') {
    return _jsx('div', { id: id, className: 'usa-hint', children: description });
  }
  return _jsx('div', { id: id, className: 'usa-hint', children: description });
}
//# sourceMappingURL=DescriptionTemplate.js.map
