import { jsx as _jsx } from 'react/jsx-runtime';
import { TranslatableString } from '@rjsf/utils';
import { Button } from '@trussworks/react-uswds';
/** The `AddButton` renders a button that represents the `Add` action on a form */
export default function AddButton(props) {
  const { icon, iconType = 'default', registry, className = '', uiSchema, ...otherProps } = props;
  const { translateString } = registry;
  const translatedLabel = translateString(TranslatableString.AddItemButton);
  return _jsx(Button, {
    type: 'button',
    ...otherProps,
    'data-testid': 'add-button',
    'aria-label': translatedLabel,
    className: `usa-button usa-button--outline ${className}`.trim(),
    children: translatedLabel,
  });
}
//# sourceMappingURL=AddButton.js.map
