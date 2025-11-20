import { jsx as _jsx } from 'react/jsx-runtime';
import TextInputWidget from './TextInputWidget'; // Corrected import
export default function EmailWidget(props) {
  return _jsx(TextInputWidget, { ...props, type: 'email' });
}
//# sourceMappingURL=EmailWidget.js.map
