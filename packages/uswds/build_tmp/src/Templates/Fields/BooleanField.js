import { jsx as _jsx } from 'react/jsx-runtime';
import { getTemplate } from '@rjsf/utils';
export default function BooleanField(props) {
  const { registry, uiSchema } = props;
  const FieldTemplate = getTemplate('FieldTemplate', registry, uiSchema);
  return _jsx(FieldTemplate, { ...props });
}
//# sourceMappingURL=BooleanField.js.map
