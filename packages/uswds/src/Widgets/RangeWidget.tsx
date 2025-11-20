import { ChangeEvent, FocusEvent } from 'react';
import { FormContextType, RJSFSchema, StrictRJSFSchema, WidgetProps, rangeSpec } from '@rjsf/utils';
import { RangeInput } from '@trussworks/react-uswds';

export default function RangeWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    value,
    disabled,
    readonly,
    onChange,
    onBlur,
    onFocus,
    options,
    schema,
    label, // Get label for potential aria-labelledby
    hideLabel, // Check if label is hidden
  } = props;

  // Use rangeSpec to parse step, min, max from schema and options
  const sliderProps = { ...rangeSpec<S>(schema), ...options };

  const _onChange = ({ target: { value: eventValue } }: ChangeEvent<HTMLInputElement>) => {
    // Always emit a number or emptyValue, never NaN
    if (eventValue === '') {
      onChange(options.emptyValue);
    } else {
      const num = Number(eventValue);
      onChange(Number.isNaN(num) ? options.emptyValue : num);
    }
  };
  const _onBlur = ({ target: { value: eventValue } }: FocusEvent<HTMLInputElement>) => {
    if (eventValue === '') {
      onBlur(id, options.emptyValue);
    } else {
      const num = Number(eventValue);
      onBlur(id, Number.isNaN(num) ? options.emptyValue : num);
    }
  };
  const _onFocus = ({ target: { value: eventValue } }: FocusEvent<HTMLInputElement>) => {
    if (eventValue === '') {
      onFocus(id, options.emptyValue);
    } else {
      const num = Number(eventValue);
      onFocus(id, Number.isNaN(num) ? options.emptyValue : num);
    }
  };

  // Determine aria-label or aria-labelledby for accessibility
  const ariaLabel = hideLabel && label ? label : undefined;
  const ariaLabelledBy = !hideLabel && label ? `${id}__title` : undefined; // Assuming FieldTemplate renders label with id `${id}__title`

  // Always pass a string value to RangeInput, fallback to min or '0' if value is undefined/null
  let rangeValue: string;
  if (typeof value === 'number') {
    rangeValue = String(value);
  } else if (value === '' || value == null) {
    rangeValue = sliderProps.min !== undefined ? String(sliderProps.min) : '0';
  } else {
    rangeValue = String(value);
  }

  return (
    <div className="field-range-wrapper">
      <RangeInput
        id={id}
        name={id}
        value={rangeValue}
        disabled={disabled || readonly}
        onChange={!readonly ? _onChange : undefined}
        onBlur={!readonly ? _onBlur : undefined}
        onFocus={!readonly ? _onFocus : undefined}
        min={sliderProps.min}
        max={sliderProps.max}
        step={sliderProps.step}
        aria-label={ariaLabel} // Add aria-label if label is hidden
        aria-labelledby={ariaLabelledBy} // Add aria-labelledby if label is visible
      />
      <span className="range-view-value">{rangeValue}</span> {/* Display current value */}
    </div>
  );
}
