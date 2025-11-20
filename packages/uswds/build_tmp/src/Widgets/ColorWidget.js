import { jsx as _jsx } from 'react/jsx-runtime';
// USWDS doesn't have a specific color picker, use styled native input
export default function ColorWidget({
  id,
  value,
  disabled,
  readonly,
  onChange,
  onBlur,
  onFocus,
  required,
}) {
  function _onChange(event) {
    onChange(event.target.value);
  }
  function _onBlur(event) {
    onBlur(id, event.target.value);
  }
  function _onFocus(event) {
    onFocus(id, event.target.value);
  }
  return _jsx('input', {
    type: 'color',
    id: id,
    name: id,
    className: 'usa-input', // Apply basic styling, might need width adjustment
    style: { height: '2.5rem', padding: '0.25rem' },
    value: value || '',
    required: required,
    disabled: disabled || readonly,
    onChange: !readonly ? _onChange : undefined,
    onBlur: !readonly ? _onBlur : undefined,
    onFocus: !readonly ? _onFocus : undefined,
  });
}
//# sourceMappingURL=ColorWidget.js.map
