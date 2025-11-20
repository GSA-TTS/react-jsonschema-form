import { jsx as _jsx } from 'react/jsx-runtime';
import { getTemplate, getInputProps } from '@rjsf/utils';
export default function TextInputWidget(props) {
  const { options, schema, type: propType, registry } = props;
  const BaseInputTemplate = getTemplate('BaseInputTemplate', registry, options);
  const inputType = propType || (schema.type === 'string' ? 'text' : schema.type);
  const inputProps = getInputProps(schema, inputType, options);
  return _jsx(BaseInputTemplate, { ...props, ...inputProps, type: inputType });
}
//# sourceMappingURL=TextInputWidget.js.map
