import { jsx as _jsx } from 'react/jsx-runtime';
import { Button, Icon } from '@trussworks/react-uswds'; // Import Icon
import { TranslatableString } from '@rjsf/utils';
/** The `CopyButton` renders a button that copies the data for an array item.
 *
 * @param props - The `IconButtonProps` for the component
 */
export default function CopyButton(props) {
  // Use IconButtonProps
  const { icon, iconType, registry, ...otherProps } = props;
  const translatedLabel = registry.translateString(TranslatableString.CopyButton);
  return _jsx(Button, {
    type: 'button',
    ...otherProps,
    'data-testid': 'copy-button',
    'aria-label': translatedLabel,
    className: `usa-button usa-button--unstyled ${otherProps.className || ''}`.trim(),
    children: _jsx(Icon.ContentCopy, { 'aria-hidden': 'true' }),
  });
}
//# sourceMappingURL=CopyButton.js.map
