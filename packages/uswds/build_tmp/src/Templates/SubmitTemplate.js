import { jsx as _jsx } from 'react/jsx-runtime';
import { getSubmitButtonOptions } from '@rjsf/utils';
import { Button } from '@trussworks/react-uswds';
export default function SubmitButton(props) {
  const { submitText, props: submitButtonProps } = getSubmitButtonOptions(props.uiSchema);
  return _jsx(Button, {
    type: 'submit',
    ...submitButtonProps,
    className: 'usa-button',
    children: submitText,
  });
}
//# sourceMappingURL=SubmitTemplate.js.map
