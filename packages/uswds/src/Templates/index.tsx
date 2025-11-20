import { FormContextType, RJSFSchema, StrictRJSFSchema, TemplatesType } from '@rjsf/utils';

// Import all template components using the new filenames
import ArrayFieldItemTemplate from './ArrayFieldItemTemplate'; // Renamed
import ArrayFieldTemplate from './ArrayFieldTemplate';
import BaseInputTemplate from './BaseInputTemplate';
import DescriptionFieldTemplate from './DescriptionFieldTemplate'; // Renamed
import ErrorListTemplate from './ErrorListTemplate'; // Renamed
import FieldHelpTemplate from './FieldHelpTemplate';
import FieldTemplate from './FieldTemplate'; // Renamed
import ObjectFieldTemplate from './ObjectFieldTemplate'; // Renamed
import TitleFieldTemplate from './TitleFieldTemplate'; // Renamed
import UnsupportedFieldTemplate from './UnsupportedFieldTemplate'; // Added
import WrapIfAdditionalTemplate from './WrapIfAdditionalTemplate';
import AddButton from './Button/AddButton';
import IconButton from './Button/IconButton';
import SubmitButton from './Button/SubmitButton';

export default function generateTemplates<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(): Partial<TemplatesType<T, S, F>> {
  return {
    ArrayFieldItemTemplate,
    ArrayFieldTemplate,
    BaseInputTemplate,
    DescriptionFieldTemplate,
    ErrorListTemplate,
    FieldHelpTemplate,
    FieldTemplate,
    ObjectFieldTemplate,
    TitleFieldTemplate,
    UnsupportedFieldTemplate, // Added registration
    WrapIfAdditionalTemplate,
    ButtonTemplates: {
      AddButton: AddButton,
      CopyButton: (props) => <IconButton {...props} icon="content_copy" />, // Added CopyButton
      MoveDownButton: (props) => <IconButton {...props} icon="arrow_downward" />,
      MoveUpButton: (props) => <IconButton {...props} icon="arrow_upward" />,
      RemoveButton: (props) => <IconButton {...props} icon="close" />,
      SubmitButton: SubmitButton,
    },
  };
}
