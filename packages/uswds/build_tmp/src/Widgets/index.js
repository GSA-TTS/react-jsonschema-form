// Removed React import as it's not directly used
// Import widgets using names matching their filenames/exports
import CheckboxWidget from './CheckboxWidget';
import ComboBoxWidget from './ComboBoxWidget';
import RadioWidget from './RadioWidget';
import RangeWidget from './RangeWidget';
import SelectWidget from './SelectWidget';
import TextareaWidget from './TextareaWidget'; // Correct import path casing
import TextInputWidget from './TextInputWidget';
import UpDownWidget from './UpDownWidget';
import CheckboxesWidget from './CheckboxesWidget';
import DateWidget from './DateWidget';
import DateTimeWidget from './DateTimeWidget';
import AltDateWidget from './AltDateWidget';
import AltDateTimeWidget from './AltDateTimeWidget';
import EmailWidget from './EmailWidget';
import URLWidget from './URLWidget';
import ColorWidget from './ColorWidget';
import FileWidget from './FileWidget';
import HiddenWidget from './HiddenWidget';
import PasswordWidget from './PasswordWidget'; // Import the new PasswordWidget
export function generateWidgets() {
  return {
    // Standard RJSF key : Imported USWDS Component
    CheckboxWidget: CheckboxWidget,
    ComboBoxWidget: ComboBoxWidget,
    RadioWidget: RadioWidget,
    RangeWidget: RangeWidget,
    SelectWidget: SelectWidget,
    TextWidget: TextInputWidget,
    TextareaWidget: TextareaWidget, // Corrected variable name casing to match import
    UpDownWidget: UpDownWidget,
    CheckboxesWidget: CheckboxesWidget,
    DateWidget: DateWidget,
    DateTimeWidget: DateTimeWidget,
    AltDateWidget: AltDateWidget,
    AltDateTimeWidget: AltDateTimeWidget,
    EmailWidget: EmailWidget,
    URLWidget: URLWidget,
    ColorWidget: ColorWidget,
    FileWidget: FileWidget,
    HiddenWidget: HiddenWidget,
    PasswordWidget: PasswordWidget, // Use the imported PasswordWidget component
  };
}
export default generateWidgets();
//# sourceMappingURL=index.js.map
