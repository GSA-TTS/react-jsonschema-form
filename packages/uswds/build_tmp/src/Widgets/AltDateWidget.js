import { jsx as _jsx } from 'react/jsx-runtime';
// Basic implementation using DateWidget, real AltDate often uses selects
import DateWidget from './DateWidget';
// For now, just re-export DateWidget. A full implementation would use selects.
export default function AltDateWidget(props) {
  return _jsx(DateWidget, { ...props });
}
//# sourceMappingURL=AltDateWidget.js.map
