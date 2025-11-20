import { jsx as _jsx } from 'react/jsx-runtime';
import { getTemplate } from '@rjsf/utils';
export default function ArrayField(props) {
  const { registry, uiSchema } = props;
  const ArrayFieldTemplate = getTemplate('ArrayFieldTemplate', registry, uiSchema);
  return _jsx(ArrayFieldTemplate, { ...props });
}
//# sourceMappingURL=ArrayField.js.map
