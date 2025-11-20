import { jsx as _jsx } from 'react/jsx-runtime';
import { Alert } from '@trussworks/react-uswds';
/** The `HelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
export default function HelpTemplate(props) {
  const { help, idSchema } = props;
  if (!help) {
    return null;
  }
  const id = `${idSchema.$id}__help`;
  return _jsx(Alert, {
    id: id,
    type: 'info',
    headingLevel: 'h4',
    slim: true,
    role: 'tooltip',
    className: 'margin-top-1',
    children: help,
  });
}
//# sourceMappingURL=HelpTemplate.js.map
