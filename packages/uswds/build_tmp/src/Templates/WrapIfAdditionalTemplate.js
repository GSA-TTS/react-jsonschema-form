import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Grid, Label, TextInput } from '@trussworks/react-uswds';
import { TranslatableString } from '@rjsf/utils';
export default function WrapIfAdditionalTemplate(props) {
  const {
    children,
    disabled,
    id,
    label,
    onDropPropertyClick,
    onKeyChange,
    readonly,
    required,
    schema,
    uiSchema,
    registry,
  } = props;
  const { templates, translateString } = registry;
  const keyLabel = translateString(TranslatableString.KeyLabel, [label]);
  const additional = schema.additionalProperties;
  if (!additional) {
    return _jsx(_Fragment, { children: children });
  }
  const handleBlur = ({ target }) => onKeyChange(target.value);
  return _jsxs(Grid, {
    row: true,
    gap: 'md',
    className: 'form-additional',
    children: [
      _jsxs(Grid, {
        col: 5,
        children: [
          _jsx(Label, { htmlFor: `${id}-key`, children: keyLabel }),
          _jsx(TextInput, {
            id: `${id}-key`,
            name: `${id}-key`,
            defaultValue: label,
            required: required,
            disabled: disabled || readonly,
            onBlur: !readonly ? handleBlur : undefined,
            type: 'text',
          }),
        ],
      }),
      _jsx(Grid, { col: 5, children: children }),
      _jsx(Grid, {
        col: 2,
        children:
          templates.ButtonTemplates.RemoveButton &&
          _jsx(templates.ButtonTemplates.RemoveButton, {
            disabled: disabled || readonly,
            onClick: onDropPropertyClick(label),
            uiSchema: uiSchema,
            registry: registry,
            className: 'array-item-remove usa-button--unstyled',
            style: { marginTop: '1.5rem' },
          }),
      }),
    ],
  });
}
//# sourceMappingURL=WrapIfAdditionalTemplate.js.map
