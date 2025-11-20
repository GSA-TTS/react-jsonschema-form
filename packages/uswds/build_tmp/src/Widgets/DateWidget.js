import { jsx as _jsx } from 'react/jsx-runtime';
import { DatePicker } from '@trussworks/react-uswds';
export default function DateWidget({ id, value, disabled, readonly, onChange, onBlur, onFocus }) {
  function _onChange(val) {
    onChange(val || undefined);
  }
  function _onBlur(event) {
    const target = event.target;
    onBlur(id, target.value);
  }
  function _onFocus(event) {
    onFocus(id, event.target.value);
  }
  return _jsx(DatePicker, {
    id: id,
    name: id,
    defaultValue: value,
    disabled: disabled || readonly,
    onChange: !readonly ? _onChange : undefined,
    onBlur: !readonly ? _onBlur : undefined,
    onInput: !readonly ? _onFocus : undefined,
  });
}
//# sourceMappingURL=DateWidget.js.map
