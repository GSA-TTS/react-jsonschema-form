import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { ariaDescribedByIds, labelValue } from '@rjsf/utils';
import { Textarea, FormGroup, Label } from '@trussworks/react-uswds';
export default function TextareaWidget({
  id,
  value,
  required,
  disabled,
  readonly,
  onBlur,
  onFocus,
  onChange,
  options = {},
  schema,
  label,
  hideLabel,
  rawErrors = [],
  placeholder,
  autofocus,
}) {
  function _onChange(event) {
    const eventValue = event.target.value;
    onChange(eventValue === '' ? options.emptyValue : eventValue);
  }
  function _onBlur(event) {
    const eventValue = event.target.value;
    onBlur(id, eventValue === '' ? options.emptyValue : eventValue);
  }
  function _onFocus(event) {
    const eventValue = event.target.value;
    onFocus(id, eventValue === '' ? options.emptyValue : eventValue);
  }
  const inputProps = {
    placeholder: placeholder,
    autoFocus: autofocus,
  };
  const rows = typeof options.rows === 'number' ? options.rows : 5;
  const hasErrors = rawErrors.length > 0;
  const help = schema.description || options.help;
  return _jsxs(FormGroup, {
    error: hasErrors,
    children: [
      labelValue(
        _jsxs(Label, {
          htmlFor: id,
          error: hasErrors,
          children: [
            label || schema.title,
            required && _jsx('span', { className: 'usa-label--required', children: '*' }),
          ],
        }),
        hideLabel,
      ),
      help && _jsx('span', { id: `${id}__help`, className: 'usa-hint', children: help }),
      _jsx(Textarea, {
        id: id,
        name: id,
        value: value ? value : '',
        disabled: disabled || readonly,
        rows: rows,
        onBlur: _onBlur,
        onFocus: _onFocus,
        onChange: _onChange,
        'aria-describedby': ariaDescribedByIds(id, !!help),
        required: required,
        ...inputProps,
      }),
    ],
  });
}
//# sourceMappingURL=TextareaWidget.js.map
