import { jsx as _jsx } from 'react/jsx-runtime';
import { RichDescription } from '@rjsf/utils';
/** The `DescriptionFieldTemplate` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
export default function DescriptionFieldTemplate(props) {
  const { id, description, registry, uiSchema } = props; // Destructure only needed props
  if (!description) {
    return null;
  }
  // Render the description directly within the hint div
  // If markdown or complex rendering is needed, add a library like react-markdown
  return _jsx('div', {
    id: id,
    className: 'usa-hint',
    children: _jsx(RichDescription, {
      description: description,
      registry: registry,
      uiSchema: uiSchema,
    }),
  });
}
//# sourceMappingURL=DescriptionFieldTemplate.js.map
