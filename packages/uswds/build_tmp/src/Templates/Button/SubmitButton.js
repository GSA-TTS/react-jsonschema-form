import { jsx as _jsx } from 'react/jsx-runtime';
import { Button } from '@trussworks/react-uswds';
import { getSubmitButtonOptions } from '@rjsf/utils';
export default function SubmitButton({ uiSchema, registry }) {
  // Get button options from the uiSchema
  const { submitText, norender, props: submitButtonProps = {} } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return _jsx(Button, {
    type: 'submit',
    ...submitButtonProps,
    className: `usa-button ${submitButtonProps.className || ''}`,
    children: submitText || 'Submit',
  });
}
//# sourceMappingURL=SubmitButton.js.map
