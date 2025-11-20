import { jsx as _jsx } from 'react/jsx-runtime';
// Basic implementation using DateTimeWidget, real AltDateTime often uses selects
import DateTimeWidget from './DateTimeWidget';
// For now, just re-export DateTimeWidget. A full implementation would use selects.
export default function AltDateTimeWidget(props) {
  return _jsx(DateTimeWidget, { ...props });
}
//# sourceMappingURL=AltDateTimeWidget.js.map
