import { jsx as _jsx } from 'react/jsx-runtime';
import { getTemplate } from '@rjsf/utils';
export default function NumberField(props) {
  const { registry, uiSchema } = props;
  const FieldTemplate = getTemplate('FieldTemplate', registry, uiSchema);
  return _jsx(FieldTemplate, { ...props });
}
//# sourceMappingURL=NumberField.js.map
