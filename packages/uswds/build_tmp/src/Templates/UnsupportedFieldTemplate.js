import { jsx as _jsx } from 'react/jsx-runtime';
import { Alert } from '@trussworks/react-uswds';
import { TranslatableString } from '@rjsf/utils';
/** The `UnsupportedField` component is used to render a field in the schema is one that is not supported by
 * react-jsonschema-form.
 *
 * @param props - The `UnsupportedFieldProps` for this component
 */
export default function UnsupportedFieldTemplate({ schema, idSchema, reason, registry }) {
  const { translateString } = registry;
  const translateEnum = TranslatableString.UnsupportedField;
  const message = translateString(translateEnum, [
    String(idSchema === null || idSchema === void 0 ? void 0 : idSchema.$id),
    reason,
  ]);
  return _jsx(Alert, {
    type: 'error',
    heading: message,
    headingLevel: 'h4',
    slim: true,
    children: _jsx('pre', { children: JSON.stringify(schema, null, 2) }),
  });
}
//# sourceMappingURL=UnsupportedFieldTemplate.js.map
