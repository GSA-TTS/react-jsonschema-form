import { jsx as _jsx } from 'react/jsx-runtime';
/** The `FieldHelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
export default function FieldHelpTemplate(props) {
  const { idSchema, help } = props;
  if (!help) {
    return null;
  }
  const id = `${idSchema.$id}__help`;
  return _jsx('span', { id: id, className: 'usa-hint', children: help });
}
//# sourceMappingURL=FieldHelpTemplate.js.map
