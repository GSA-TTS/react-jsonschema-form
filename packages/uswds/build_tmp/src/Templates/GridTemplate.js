import { jsx as _jsx } from 'react/jsx-runtime';
import { Grid } from '@trussworks/react-uswds';
// Assuming this template simply wraps children in a Grid
// Adjust props if it needs more context like FieldTemplateProps
export default function GridTemplate({ children, classNames, uiSchema }) {
  // Simplified props
  const uiOptions =
    (uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:options']) || {};
  const { col = 12, ...gridProps } = uiOptions; // Example: Get grid options from uiSchema
  return _jsx(Grid, { col: col, className: classNames, ...gridProps, children: children });
}
//# sourceMappingURL=GridTemplate.js.map
