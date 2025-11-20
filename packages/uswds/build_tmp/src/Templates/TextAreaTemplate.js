import { jsx as _jsx } from 'react/jsx-runtime';
import { Textarea } from '@trussworks/react-uswds';
export default function TextArea({
  id,
  value,
  required,
  disabled,
  readonly,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  options,
}) {
  const _onChange = ({ target: { value: v } }) => onChange(v);
  const _onBlur = ({ target: { value: v } }) => onBlur(id, v);
  const _onFocus = ({ target: { value: v } }) => onFocus(id, v);
  return _jsx(Textarea, {
    id: id,
    name: id,
    value: value || '',
    required: required,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    rows: options.rows || 5,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
  });
}
//# sourceMappingURL=TextAreaTemplate.js.map
