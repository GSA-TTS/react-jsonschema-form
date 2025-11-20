import { jsx as _jsx } from 'react/jsx-runtime';
export default function HiddenWidget({ id, value }) {
  return _jsx('input', {
    type: 'hidden',
    id: id,
    name: id,
    value: typeof value === 'undefined' ? '' : value,
  });
}
//# sourceMappingURL=HiddenWidget.js.map
