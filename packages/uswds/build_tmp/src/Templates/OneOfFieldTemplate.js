import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Select as UswdsSelect } from '@trussworks/react-uswds';
// Assuming this template acts as a widget to select the 'oneOf' option index
export default function OneOfFieldTemplate(props) {
  const {
    id,
    options, // Contains enumOptions for the oneOf selection
    value, // Current selected index (or undefined)
    required,
    disabled,
    readonly,
    autofocus = false,
    onChange,
    onBlur,
    onFocus,
    // schema, // Schema might be complex here
    // placeholder,
    // rawErrors = [],
  } = props;
  const { enumOptions, emptyValue } = options; // enumOptions here represent the oneOf choices
  const _onChange = ({ target: { value: targetValue } }) => {
    // onChange likely expects the index or a value representing the chosen schema
    onChange(targetValue === '' ? emptyValue || '' : targetValue);
  };
  const _onBlur = ({ target: { value: targetValue } }) =>
    onBlur(id, targetValue === '' ? emptyValue || '' : targetValue);
  const _onFocus = ({ target: { value: targetValue } }) =>
    onFocus(id, targetValue === '' ? emptyValue || '' : targetValue);
  return _jsxs(UswdsSelect, {
    id: id,
    name: id,
    value: value !== null && value !== void 0 ? value : '',
    required: required,
    multiple: false,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    onBlur: !readonly ? _onBlur : undefined,
    onFocus: !readonly ? _onFocus : undefined,
    onChange: !readonly ? _onChange : undefined,
    children: [
      _jsx('option', { value: '', children: options.placeholder || 'Select option' }),
      enumOptions.map(({ value: optionValue, label: optionLabel }, i) => {
        // Assuming optionValue might be the index or a specific identifier
        return _jsx('option', { value: optionValue, children: optionLabel }, i);
      }),
    ],
  });
}
//# sourceMappingURL=OneOfFieldTemplate.js.map
