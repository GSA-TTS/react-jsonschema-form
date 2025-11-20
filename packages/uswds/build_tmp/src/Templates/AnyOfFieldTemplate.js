import { jsx as _jsx } from 'react/jsx-runtime';
import { Select } from '@trussworks/react-uswds';
export default function AnyOfField(props) {
  const { id, options = [], value, onChange } = props;
  return _jsx(Select, {
    id: id,
    name: id,
    value: value,
    onChange: (e) => onChange(e.target.value),
    children: options.map((option, index) =>
      _jsx('option', { value: option.value, children: option.label }, index),
    ),
  });
}
//# sourceMappingURL=AnyOfFieldTemplate.js.map
