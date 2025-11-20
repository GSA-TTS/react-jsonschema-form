import { jsx as _jsx } from 'react/jsx-runtime';
import { Checkbox as UswdsCheckbox } from '@trussworks/react-uswds';
export default function Checkbox({
  id,
  value,
  required,
  disabled,
  readonly,
  label,
  onChange,
  onBlur,
  onFocus,
}) {
  function _onChange(event) {
    onChange(event.target.checked);
  }
  function _onBlur(event) {
    onBlur(id, event.target.checked);
  }
  function _onFocus(event) {
    onFocus(id, event.target.checked);
  }
  return _jsx(UswdsCheckbox, {
    id: id,
    name: id,
    checked: typeof value === 'undefined' ? false : value,
    required: required,
    disabled: disabled || readonly,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    label: label,
  });
}
//# sourceMappingURL=CheckboxWidget.js.map
