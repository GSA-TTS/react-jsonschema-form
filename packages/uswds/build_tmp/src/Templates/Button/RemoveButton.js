import { jsx as _jsx } from 'react/jsx-runtime';
import { Button, Icon } from '@trussworks/react-uswds'; // Import Icon
import { TranslatableString } from '@rjsf/utils';
/** The `RemoveButton` renders a button that removes the item from an array.
 *
 * @param props - The `IconButtonProps` for the component
 */
export default function RemoveButton(props) {
  const { icon, iconType, registry, ...otherProps } = props;
  const translatedLabel = registry.translateString(TranslatableString.RemoveButton);
  return _jsx(Button, {
    type: 'button',
    ...otherProps,
    'data-testid': 'remove-button',
    'aria-label': translatedLabel,
    // Use unstyled or adjust as needed for segmented group
    className: `usa-button usa-button--unstyled ${otherProps.className || ''}`.trim(),
    children: _jsx(Icon.Delete, { 'aria-hidden': 'true' }),
  });
}
//# sourceMappingURL=RemoveButton.js.map
