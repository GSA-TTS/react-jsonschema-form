import { ChangeEvent, FocusEvent } from 'react';
import {
  WidgetProps,
  ariaDescribedByIds,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { Textarea } from '@trussworks/react-uswds';

export default function TextareaWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
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
  placeholder,
  autofocus,
}: WidgetProps<T, S, F>) {
  function _onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const eventValue = event.target.value;
    onChange(eventValue === '' ? options.emptyValue : eventValue);
  }
  function _onBlur(event: FocusEvent<HTMLTextAreaElement>) {
    const eventValue = event.target.value;
    onBlur(id, eventValue === '' ? options.emptyValue : eventValue);
  }
  function _onFocus(event: FocusEvent<HTMLTextAreaElement>) {
    const eventValue = event.target.value;
    onFocus(id, eventValue === '' ? options.emptyValue : eventValue);
  }

  const rows = typeof options.rows === 'number' ? options.rows : 5;
  const help = schema.description || options.help;

  return (
    <Textarea
      id={id}
      name={id}
      value={value ? value : ''}
      disabled={disabled || readonly}
      rows={rows}
      onBlur={_onBlur}
      onFocus={_onFocus}
      onChange={_onChange}
      aria-describedby={ariaDescribedByIds<any>(id, !!help)}
      required={required}
      placeholder={placeholder}
      autoFocus={autofocus}
    />
  );
}
