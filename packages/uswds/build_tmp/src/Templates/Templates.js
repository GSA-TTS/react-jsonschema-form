import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { ariaDescribedByIds, examplesId, getInputProps, labelValue } from '@rjsf/utils';
import { Label, TextInput } from '@trussworks/react-uswds';
/** The `BaseInputTemplate` is the template to use to render the basic `<input>` component for the `core` theme.
 * It is used as the template for rendering many of the <input> based widgets that differ by `type` and options only.
 * It can be customized/overridden for other themes or individual implementations as needed.
 *
 * @param props - The `WidgetProps` for this template
 */
export default function BaseInputTemplate(props) {
  const {
    id,
    placeholder,
    required,
    readonly,
    disabled,
    label,
    hideLabel,
    value,
    onChange,
    onChangeOverride,
    onBlur,
    onFocus,
    autofocus = false,
    options,
    schema,
    type,
    rawErrors = [],
  } = props;
  const inputProps = getInputProps(schema, type, options);
  const _onChange = ({ target: { value: eventValue } }) => {
    onChange(eventValue === '' ? options.emptyValue : eventValue);
  };
  const _onBlur = ({ target: { value: eventValue } }) => onBlur(id, eventValue);
  const _onFocus = ({ target: { value: eventValue } }) => onFocus(id, eventValue);
  const InputElement = type === 'number' || type === 'integer' ? TextInput : TextInput;
  const hasError = rawErrors.length > 0;
  return _jsxs(_Fragment, {
    children: [
      labelValue(
        _jsxs(Label, {
          htmlFor: id,
          children: [
            label || schema.title,
            required && _jsx('span', { className: 'usa-label--required', children: '*' }),
          ],
        }),
        hideLabel,
      ),
      schema.description &&
        _jsx('span', {
          id: `${id}__description`,
          className: 'usa-hint',
          children: schema.description,
        }),
      _jsx(InputElement, {
        id: id,
        name: id,
        placeholder: placeholder,
        autoFocus: autofocus,
        required: required,
        disabled: disabled,
        readOnly: readonly,
        className: hasError ? 'usa-input--error' : '',
        list: schema.examples ? examplesId(id) : undefined,
        ...inputProps,
        value: value || value === 0 ? value : '',
        onChange: onChangeOverride || _onChange,
        onBlur: _onBlur,
        onFocus: _onFocus,
        'aria-describedby': ariaDescribedByIds(id, !!schema.examples),
        type: type,
      }),
      Array.isArray(schema.examples) &&
        _jsx('datalist', {
          id: examplesId(id),
          children: schema.examples
            .concat(schema.default ? [schema.default] : [])
            .map((example) => {
              return _jsx('option', { value: example }, example);
            }),
        }),
    ],
  });
}
//# sourceMappingURL=Templates.js.map
