import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { getTemplate } from '@rjsf/utils';
import { FormGroup, Label } from '@trussworks/react-uswds';
export default function FieldTemplate(props) {
  const {
    id,
    label,
    children,
    required,
    hidden,
    classNames,
    style,
    displayLabel,
    rawErrors = [],
    rawHelp,
    rawDescription,
    registry,
    uiSchema,
    schema,
  } = props;
  const uiOptions = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:options'];
  const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, uiOptions);
  if (hidden) {
    return _jsx('div', { style: { display: 'none' }, children: children });
  }
  const hasErrors = rawErrors.length > 0;
  const showLabel = displayLabel && !!label;
  return _jsx('div', {
    style: style,
    className: classNames,
    children: _jsxs(FormGroup, {
      error: hasErrors,
      children: [
        showLabel &&
          _jsxs(Label, {
            htmlFor: id,
            error: hasErrors,
            children: [
              label,
              required && _jsx('span', { className: 'usa-label--required', children: '*' }),
            ],
          }),
        rawDescription &&
          DescriptionFieldTemplate &&
          _jsx(DescriptionFieldTemplate, {
            id: id + '__description',
            description: rawDescription,
            schema: schema,
            uiSchema: uiSchema,
            registry: registry,
          }),
        children,
        rawHelp && _jsx('span', { id: `${id}__help`, className: 'usa-hint', children: rawHelp }),
      ],
    }),
  });
}
//# sourceMappingURL=FieldTemplate.js.map
