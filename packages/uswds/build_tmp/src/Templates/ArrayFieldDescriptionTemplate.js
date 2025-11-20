import { jsx as _jsx } from 'react/jsx-runtime';
import { descriptionId } from '@rjsf/utils';
/** The `ArrayFieldDescriptionTemplate` component renders a description for an array field
 *
 * @param props - The `ArrayFieldDescriptionProps` for the component
 */
export default function ArrayFieldDescriptionTemplate(props) {
  // Remove unused schema, uiSchema, registry
  const { description, idSchema } = props;
  const id = descriptionId(idSchema);
  if (!description) {
    return null;
  }
  return _jsx('p', { id: id, className: 'field-description', children: description });
}
//# sourceMappingURL=ArrayFieldDescriptionTemplate.js.map
