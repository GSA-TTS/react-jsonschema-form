import { ChangeEvent } from 'react';
import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  enumOptionsValueForIndex,
} from '@rjsf/utils';
import { Select } from '@trussworks/react-uswds';

export default function SelectWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ id, options, value, required, disabled, readonly, onChange }: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled } = options;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = enumOptionsValueForIndex(event.target.value, enumOptions);
    onChange(selectedValue);
  };

  return (
    <Select
      id={id}
      name={id}
      value={String(value ?? '')}
      required={required}
      disabled={disabled || readonly}
      onChange={handleChange}
    >
      {enumOptions?.map((option, index) => (
        <option
          key={index}
          value={String(option.value)}
          disabled={enumDisabled?.includes(option.value)}
        >
          {option.label}
        </option>
      ))}
    </Select>
  );
}
