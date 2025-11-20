import { jsx as _jsx } from 'react/jsx-runtime';
import { TextInput } from '@trussworks/react-uswds';
export default function Text({
  id,
  placeholder,
  required,
  readonly,
  disabled,
  value,
  onChange,
  onBlur,
  onFocus,
  options,
  type,
}) {
  const _onChange = ({ target: { value: v } }) => onChange(v);
  const _onBlur = ({ target: { value: v } }) => onBlur(id, v);
  const _onFocus = ({ target: { value: v } }) => onFocus(id, v);
  return _jsx(TextInput, {
    id: id,
    name: id,
    placeholder: placeholder,
    required: required,
    disabled: disabled || readonly,
    value: value || '',
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    type: type,
  });
}
//# sourceMappingURL=TextWidget.js.map
