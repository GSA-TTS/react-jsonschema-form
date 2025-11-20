import { jsx as _jsx } from 'react/jsx-runtime';
import { getTemplate } from '@rjsf/utils';
export default function ObjectField(props) {
  const { registry, uiSchema } = props;
  const ObjectFieldTemplate = getTemplate('ObjectFieldTemplate', registry, uiSchema);
  return _jsx(ObjectFieldTemplate, { ...props });
}
//# sourceMappingURL=ObjectField.js.map
