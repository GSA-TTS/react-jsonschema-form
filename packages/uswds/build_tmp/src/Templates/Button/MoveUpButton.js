import { jsx as _jsx } from 'react/jsx-runtime';
import { Button, Icon } from '@trussworks/react-uswds'; // Import Icon
import { TranslatableString } from '@rjsf/utils';
/** The `MoveUpButton` renders a button that moves the item up in an array.
 *
 * @param props - The `IconButtonProps` for the component
 */
export default function MoveUpButton(props) {
  const { icon, iconType, registry, ...otherProps } = props;
  const translatedLabel = registry.translateString(TranslatableString.MoveUpButton);
  return _jsx(Button, {
    type: 'button',
    ...otherProps,
    'data-testid': 'move-up-button',
    'aria-label': translatedLabel,
    className: `usa-button usa-button--unstyled ${otherProps.className || ''}`.trim(),
    children: _jsx(Icon.ArrowUpward, { 'aria-hidden': 'true' }),
  });
}
//# sourceMappingURL=MoveUpButton.js.map
