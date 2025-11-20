import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { ariaDescribedByIds } from '@rjsf/utils';
import { TextInput } from '@trussworks/react-uswds';
export default function BaseInputTemplate(props) {
  const {
    id,
    value,
    type,
    placeholder,
    required,
    disabled,
    readonly,
    onChange,
    onBlur,
    onFocus,
    options,
    schema,
    rawErrors = [],
    autofocus,
    registry,
    ...rest
  } = props;
  const _onChange = ({ target }) => {
    onChange(target.value === '' ? options.emptyValue : target.value);
  };
  const _onBlur = ({ target }) => {
    onBlur(id, target.value === '' ? options.emptyValue : target.value);
  };
  const _onFocus = ({ target }) => {
    onFocus(id, target.value === '' ? options.emptyValue : target.value);
  };
  const hasErrors = rawErrors.length > 0;
  const inputProps = {
    id: id,
    name: id,
    type: type === 'string' ? 'text' : type,
    value: value !== null && value !== void 0 ? value : '',
    placeholder: placeholder,
    required: required,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    'aria-invalid': hasErrors ? true : undefined,
    'aria-describedby': ariaDescribedByIds(id, hasErrors),
    step: options.step || rest.step,
    min: options.min || rest.min,
    max: options.max || rest.max,
    list: schema.examples ? `${id}__examples` : undefined,
  };
  const examples = schema.examples;
  const defaultExample = schema.default !== undefined ? String(schema.default) : undefined;
  return _jsxs(_Fragment, {
    children: [
      _jsx(TextInput, { ...inputProps, onChange: _onChange, onBlur: _onBlur, onFocus: _onFocus }),
      examples &&
        _jsx('datalist', {
          id: `${id}__examples`,
          children: examples
            .concat(defaultExample && !examples.includes(defaultExample) ? [defaultExample] : [])
            .map((example) => {
              return _jsx('option', { value: example }, example);
            }),
        }),
    ],
  });
}
//# sourceMappingURL=BaseInputTemplate.js.map
