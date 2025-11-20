import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Grid, GridContainer } from '@trussworks/react-uswds';
/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. Since this will wrap rendered content, and was really more of a concept of
 * RJSF than a React template, the name of the component is `ObjectField` instead of `ObjectFieldTemplate`.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
export default function ObjectField({
  description,
  title,
  properties,
  required,
  uiSchema,
  idSchema,
  schema,
  formData,
}) {
  return _jsxs(GridContainer, {
    className: 'usa-form-group',
    children: [
      title && _jsx('h3', { className: 'usa-label', children: title }),
      description && _jsx('div', { className: 'usa-hint', children: description }),
      _jsx(Grid, {
        row: true,
        gap: 2,
        children: properties.map((prop) =>
          _jsx(Grid, { col: 12, children: prop.content }, prop.name),
        ),
      }),
    ],
  });
}
//# sourceMappingURL=ObjectFieldTemplate.js.map
