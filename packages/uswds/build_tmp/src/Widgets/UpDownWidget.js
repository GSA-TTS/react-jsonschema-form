import { jsx as _jsx } from 'react/jsx-runtime';
import TextInputWidget from './TextInputWidget'; // Use TextInputWidget
export default function UpDownWidget(props) {
  // Pass props to TextInputWidget, specifying type as number
  return _jsx(TextInputWidget, { ...props, type: 'number' });
}
//# sourceMappingURL=UpDownWidget.js.map
