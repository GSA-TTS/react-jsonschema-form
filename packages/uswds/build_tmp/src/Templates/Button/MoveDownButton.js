import { jsx as _jsx } from 'react/jsx-runtime';
import { Button, Icon } from '@trussworks/react-uswds'; // Import Icon
import { TranslatableString } from '@rjsf/utils';
/** The `MoveDownButton` renders a button that moves the item down in an array.
 *
 * @param props - The `IconButtonProps` for the component
 */
export default function MoveDownButton(props) {
  const { icon, iconType, registry, ...otherProps } = props;
  const translatedLabel = registry.translateString(TranslatableString.MoveDownButton);
  return _jsx(Button, {
    type: 'button',
    ...otherProps,
    'data-testid': 'move-down-button',
    'aria-label': translatedLabel,
    className: `usa-button usa-button--unstyled ${otherProps.className || ''}`.trim(),
    children: _jsx(Icon.ArrowDownward, { 'aria-hidden': 'true' }),
  });
}
//# sourceMappingURL=MoveDownButton.js.map
