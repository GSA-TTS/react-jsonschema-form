import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Grid } from '@trussworks/react-uswds';
export default function ArrayFieldItemTemplate(props) {
  const {
    children,
    disabled,
    hasToolbar,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    index,
    onDropIndexClick,
    onReorderClick,
    readonly,
    registry, // Add registry to props destructuring
  } = props;
  // Retrieve button components from registry
  const { MoveUpButton, MoveDownButton, RemoveButton } = registry.templates.ButtonTemplates;
  return _jsxs(Grid, {
    row: true,
    children: [
      _jsx(Grid, { col: true, children: children }),
      hasToolbar &&
        _jsxs(Grid, {
          col: 'auto',
          children: [
            (hasMoveUp || hasMoveDown) &&
              MoveUpButton && // Check if button component exists
              _jsx(MoveUpButton, {
                disabled: disabled || readonly || !hasMoveUp,
                onClick: onReorderClick(index, index - 1),
                registry: registry,
              }),
            (hasMoveUp || hasMoveDown) &&
              MoveDownButton && // Check if button component exists
              _jsx(MoveDownButton, {
                disabled: disabled || readonly || !hasMoveDown,
                onClick: onReorderClick(index, index + 1),
                registry: registry,
              }),
            hasRemove &&
              RemoveButton && // Check if button component exists
              _jsx(RemoveButton, {
                disabled: disabled || readonly,
                onClick: onDropIndexClick(index),
                registry: registry,
              }),
          ],
        }),
    ],
  });
}
//# sourceMappingURL=ArrayFieldItemTemplate.js.map
