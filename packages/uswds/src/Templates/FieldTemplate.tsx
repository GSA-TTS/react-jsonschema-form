import { FieldTemplateProps, FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
import { FormGroup, Label } from '@trussworks/react-uswds';

export default function FieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: FieldTemplateProps<T, S, F>) {
  const {
    id,
    label,
    children,
    errors,
    help,
    description,
    hidden,
    required,
    displayLabel,
    classNames,
    style,
    rawErrors = [],
    schema,
  } = props;

  if (hidden) {
    return <div className="rjsf-field-hidden">{children}</div>;
  }

  const hasErrors = rawErrors.length > 0;
  const showLabel = displayLabel && !!label;

  // Render the root title as an H1, nested object titles as H2, otherwise use Label
  const isRootTitle = schema && schema.type === 'object' && id === 'root' && showLabel;
  const isNestedObjectTitle = schema && schema.type === 'object' && id !== 'root' && showLabel;

  return (
    <div className={classNames} style={style}>
      <FormGroup error={hasErrors}>
        {showLabel &&
          (isRootTitle ? (
            <h1 id={id + '__title'} className="usa-label margin-top-0">
              {label}
              {required && <span className="usa-label--required">*</span>}
            </h1>
          ) : isNestedObjectTitle ? (
            <h2 id={id + '__title'} className="usa-label margin-top-0">
              {label}
              {required && <span className="usa-label--required">*</span>}
            </h2>
          ) : (
            <Label htmlFor={id} error={hasErrors}>
              {label}
              {required && <span className="usa-label--required">*</span>}
            </Label>
          ))}
        {displayLabel && description ? description : null}
        {help}
        {errors}
        {children}
      </FormGroup>
    </div>
  );
}
