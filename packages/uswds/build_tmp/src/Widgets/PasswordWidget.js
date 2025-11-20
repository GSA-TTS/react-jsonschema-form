import { jsx as _jsx } from 'react/jsx-runtime';
import TextInputWidget from './TextInputWidget'; // Import the base text input
export default function PasswordWidget(props) {
  // Render the TextInputWidget with type="password"
  return _jsx(TextInputWidget, { ...props, type: 'password' });
}
//# sourceMappingURL=PasswordWidget.js.map
