import { jsx as _jsx, Fragment as _Fragment } from 'react/jsx-runtime';
// USWDS doesn't have a specific DateTime picker, use styled native input
export default function DateTimeWidget({
  id,
  value,
  disabled,
  readonly,
  onChange,
  onBlur,
  onFocus,
  required,
  label,
}) {
  function _onChange(event) {
    onChange(event.target.value || undefined);
  }
  function _onBlur(event) {
    onBlur(id, event.target.value);
  }
  function _onFocus(event) {
    onFocus(id, event.target.value);
  }
  // Format value for datetime-local input (YYYY-MM-DDTHH:mm)
  const formatValue = (val) => {
    if (!val) {
      return '';
    }
    try {
      const date = new Date(val);
      // Basic formatting, might need more robust handling
      return date.toISOString().slice(0, 16);
    } catch (e) {
      return '';
    }
  };
  return _jsx(_Fragment, {
    children: _jsx('input', {
      type: 'datetime-local',
      id: id,
      name: id,
      className: 'usa-input', // Apply USWDS input styling
      value: formatValue(value),
      required: required,
      disabled: disabled || readonly,
      onChange: !readonly ? _onChange : undefined,
      onBlur: !readonly ? _onBlur : undefined,
      onFocus: !readonly ? _onFocus : undefined,
    }),
  });
}
//# sourceMappingURL=DateTimeWidget.js.map
