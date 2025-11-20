import SelectWidget from './SelectWidget'; // Use a local implementation if the core module is unavailable
import { FormContextType, RJSFSchema, StrictRJSFSchema, WidgetProps } from '@rjsf/utils';

// Import widgets using names matching their filenames/exports
import CheckboxWidget from './CheckboxWidget';
import RadioWidget from './RadioWidget';
import RangeWidget from './RangeWidget';
import TextareaWidget from './TextareaWidget';
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
import PasswordWidget from './PasswordWidget';

/** The `Widgets` object for the `@rjsf/uswds` theme. */
export type WidgetsType<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
> = {
  [name: string]: (props: WidgetProps<T, S, F>) => JSX.Element;
};

export function generateWidgets<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(): Partial<WidgetsType<T, S, F>> {
  return {
    CheckboxWidget,
    RadioWidget,
    RangeWidget,
    SelectWidget, // Use the SelectWidget from local implementation
    TextWidget: TextInputWidget,
    TextareaWidget,
    UpDownWidget,
    CheckboxesWidget,
    DateWidget,
    DateTimeWidget,
    AltDateWidget,
    AltDateTimeWidget,
    EmailWidget,
    URLWidget,
    ColorWidget,
    FileWidget,
    HiddenWidget,
    PasswordWidget,
  };
}

// Export the generated widgets as the default export
export default generateWidgets();
