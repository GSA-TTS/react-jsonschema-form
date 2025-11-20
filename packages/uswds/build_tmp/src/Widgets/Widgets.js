import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import {
  TranslatableString,
  ariaDescribedByIds,
  enumOptionsValueForIndex,
  getTemplate,
  getUiOptions,
} from '@rjsf/utils';
import { Checkbox, ComboBox, FileInput, Radio, Select, Textarea } from '@trussworks/react-uswds';
// CheckboxWidget (Boolean) - Simplified
function CheckboxWidget({
  schema,
  autofocus,
  disabled,
  readonly,
  required,
  value,
  id,
  onChange,
  onBlur,
  onFocus,
  options,
}) {
  const _onChange = ({ target: { checked } }) => onChange(checked);
  const _onBlur = ({ target: { checked } }) => onBlur(id, checked);
  const _onFocus = ({ target: { checked } }) => onFocus(id, checked);
  const description =
    schema.description || (options === null || options === void 0 ? void 0 : options.help);
  const ariaDescribedById = ariaDescribedByIds(id, !!description);
  return _jsx(Checkbox, {
    id: id,
    name: id,
    label: schema.title,
    checked: typeof value === 'undefined' ? false : value,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    required: required,
    onChange: !readonly ? _onChange : undefined,
    onBlur: !readonly ? _onBlur : undefined,
    onFocus: !readonly ? _onFocus : undefined,
    'aria-describedby': ariaDescribedById,
  });
}
// CheckboxesWidget - Simplified, remove FormGroup/Label
function CheckboxesWidget({
  id,
  disabled,
  options,
  value,
  autofocus,
  readonly,
  required,
  schema,
  onChange,
  onBlur,
  onFocus,
}) {
  const { enumOptions, enumDisabled, inline, emptyValue } = options;
  const _onChange =
    (index) =>
    ({ target: { checked } }) => {
      const all = (enumOptions || []).map((option) => option.value);
      if (checked) {
        onChange(Array.isArray(value) ? value.concat(all[index]) : [all[index]]);
      } else {
        onChange(value.filter((v) => v !== all[index]));
      }
    };
  const _onBlur = ({ target: { value: eventValue } }) =>
    onBlur(id, enumOptionsValueForIndex(eventValue, enumOptions, emptyValue));
  const _onFocus = ({ target: { value: eventValue } }) =>
    onFocus(id, enumOptionsValueForIndex(eventValue, enumOptions, emptyValue));
  const description = schema.description || options.help;
  const ariaDescribedById = ariaDescribedByIds(id, !!description);
  return _jsx('div', {
    className: `checkboxes ${inline ? 'display-flex flex-wrap' : ''}`,
    id: id,
    children: (enumOptions || []).map((option, index) => {
      const checked = Array.isArray(value) && value.includes(option.value);
      const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.includes(option.value);
      const checkboxId = `${id}_${index}`;
      const checkbox = _jsx(
        Checkbox,
        {
          id: checkboxId,
          name: id,
          label: option.label,
          checked: checked,
          required: required,
          disabled: disabled || itemDisabled || readonly,
          autoFocus: autofocus && index === 0,
          onChange: !readonly ? _onChange(index) : undefined,
          onBlur: !readonly ? _onBlur : undefined,
          onFocus: !readonly ? _onFocus : undefined,
          'aria-describedby': ariaDescribedById,
        },
        index,
      );
      return inline
        ? _jsx('div', { className: 'margin-right-2 margin-bottom-1', children: checkbox }, index)
        : checkbox;
    }),
  });
}
// RadioWidget - Simplified, remove FormGroup/Label
function RadioWidget({
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  autofocus = false,
  onChange,
  onBlur,
  onFocus,
  schema,
}) {
  const { enumOptions, enumDisabled, inline } = options;
  const readOnly = readonly;
  const _onChange = ({ target: { value: eventValue } }) =>
    onChange(schema.type == 'boolean' ? eventValue !== 'false' : eventValue);
  const _onBlur = ({ target: { value: eventValue } }) => onBlur(id, eventValue);
  const _onFocus = ({ target: { value: eventValue } }) => onFocus(id, eventValue);
  const description = schema.description || options.help;
  const ariaDescribedById = ariaDescribedByIds(id, !!description);
  return _jsx('div', {
    className: `radio ${inline ? 'display-flex flex-wrap' : ''}`,
    id: id,
    children: (enumOptions || []).map((option, i) => {
      const checked = option.value === value;
      const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.includes(option.value);
      const radioId = `${id}_${i}`;
      const radio = _jsx(
        Radio,
        {
          id: radioId,
          name: id,
          label: option.label,
          value: String(option.value),
          checked: checked,
          required: required,
          disabled: disabled || itemDisabled || readOnly,
          autoFocus: autofocus && i === 0,
          onChange: !readOnly ? _onChange : undefined,
          onBlur: !readOnly ? _onBlur : undefined,
          onFocus: !readOnly ? _onFocus : undefined,
          'aria-describedby': ariaDescribedById,
        },
        i,
      );
      return inline
        ? _jsx('div', { className: 'margin-right-2 margin-bottom-1', children: radio }, i)
        : radio;
    }),
  });
}
// Define thresholds
const COMBOBOX_THRESHOLD = 15;
const RADIO_THRESHOLD = 4; // Threshold for using Radio buttons
// ComboBoxWidget
export function ComboBoxWidget(props) {
  const { id, value, onChange, onBlur, onFocus, options, readonly } = props;
  const _onChangeComboBox = (val) => {
    onChange(val !== null && val !== void 0 ? val : '');
  };
  const comboBoxOptions = (options.enumOptions || []).map((option) => ({
    value: String(option.value),
    label: String(option.label),
  }));
  return _jsx(ComboBox, {
    id: id,
    name: id,
    defaultValue: value,
    onChange: () => {
      /* intentionally empty - change handling managed elsewhere */
    },
    disabled: readonly,
    options: comboBoxOptions,
  });
}
// SelectWidget
function SelectWidget({
  id,
  name,
  options,
  registry,
  value,
  emptyValue,
  readonly,
  disabled,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  schema,
  multiple,
}) {
  const { translateString } = registry;
  const { enumOptions, enumDisabled } = options;
  const _onChangeSelect = ({ target: { value: eventValue } }) => {
    onChange(enumOptionsValueForIndex(eventValue, enumOptions, emptyValue));
  };
  const _onBlurSelect = ({ target: { value: eventValue } }) =>
    onBlur(id, enumOptionsValueForIndex(eventValue, enumOptions, emptyValue));
  const _onFocusSelect = ({ target: { value: eventValue } }) =>
    onFocus(id, enumOptionsValueForIndex(eventValue, enumOptions, emptyValue));
  return _jsxs(Select, {
    id: id,
    name: name,
    value: typeof value === 'undefined' ? emptyValue : value,
    disabled: disabled || readonly,
    multiple: multiple,
    onChange: !readonly ? _onChangeSelect : undefined,
    onBlur: !readonly ? _onBlurSelect : undefined,
    onFocus: !readonly ? _onFocusSelect : undefined,
    children: [
      !multiple &&
        schema.default === undefined &&
        _jsx('option', {
          value: '',
          children: placeholder || translateString(TranslatableString.NewStringDefault),
        }),
      (enumOptions || []).map(({ value: optionValue, label: optionLabel }, i) => {
        const disabled = Array.isArray(enumDisabled) && enumDisabled.includes(optionValue);
        return _jsx('option', { value: optionValue, disabled: disabled, children: optionLabel }, i);
      }),
    ],
  });
}
// TextareaWidget
function TextareaWidget({
  id,
  options,
  placeholder,
  value,
  required,
  disabled,
  readonly,
  autofocus = false,
  onChange,
  onBlur,
  onFocus,
}) {
  const readOnly = readonly;
  const _onChange = ({ target: { value: eventValue } }) =>
    onChange(eventValue === '' ? options.emptyValue : eventValue);
  const _onBlur = ({ target: { value: eventValue } }) => onBlur(id, eventValue);
  const _onFocus = ({ target: { value: eventValue } }) => onFocus(id, eventValue);
  const description = options.help;
  const descId = ariaDescribedByIds(id, !!description);
  return _jsx('div', {
    children: _jsx(Textarea, {
      id: id,
      name: id,
      value: value !== null && value !== void 0 ? value : '',
      placeholder: placeholder,
      required: required,
      disabled: disabled || readOnly,
      autoFocus: autofocus,
      rows: options.rows || 5,
      onChange: !readOnly ? _onChange : undefined,
      onBlur: !readOnly ? _onBlur : undefined,
      onFocus: !readOnly ? _onFocus : undefined,
      'aria-describedby': descId,
    }),
  });
}
// UpDownWidget
function UpDownWidget(props) {
  const { registry, readonly, ...rest } = props;
  const readOnly = readonly;
  const BaseInputTemplate = getTemplate(
    'BaseInputTemplate',
    registry,
    getUiOptions(props.uiSchema),
  );
  return _jsx(BaseInputTemplate, {
    ...rest,
    registry: registry,
    readonly: readOnly,
    type: 'number',
  });
}
// FileWidget
function FileWidget(props) {
  const { id, readonly, disabled, onChange, multiple = false, autofocus = false, required } = props;
  const readOnly = readonly;
  const _onChange = ({ target }) => {
    if (!target.files) {
      return;
    }
    onChange(multiple ? target.files : target.files[0]);
  };
  const _onBlur = (event) => {
    var _a;
    return props.onBlur(id, (_a = event.target) === null || _a === void 0 ? void 0 : _a.value);
  };
  const _onFocus = (event) => {
    var _a;
    return props.onFocus(id, (_a = event.target) === null || _a === void 0 ? void 0 : _a.value);
  };
  const fileInputProps = {
    id: id,
    name: id,
    multiple: multiple,
    required: required,
    disabled: disabled || readOnly,
    onChange: !readOnly ? _onChange : undefined,
    onBlur: !readOnly ? _onBlur : undefined,
    onFocus: !readOnly ? _onFocus : undefined,
    autoFocus: autofocus,
    'aria-describedby': ariaDescribedByIds(id),
  };
  return _jsx(FileInput, { ...fileInputProps });
}
// HiddenWidget
function HiddenWidget({ id, value }) {
  return _jsx('input', {
    type: 'hidden',
    id: id,
    name: id,
    value: typeof value === 'undefined' ? '' : value,
  });
}
// Define the object containing all widgets
const widgets = {
  PasswordWidget: CheckboxWidget,
  RadioWidget,
  UpDownWidget,
  SelectWidget,
  TextWidget: CheckboxWidget,
  DateWidget: CheckboxWidget,
  DateTimeWidget: CheckboxWidget,
  AltDateWidget: CheckboxWidget,
  AltDateTimeWidget: CheckboxWidget,
  EmailWidget: CheckboxWidget,
  URLWidget: CheckboxWidget,
  TextareaWidget,
  HiddenWidget,
  ColorWidget: CheckboxWidget,
  FileWidget,
  CheckboxWidget,
  CheckboxesWidget,
  ComboBoxWidget,
};
// Export the generateWidgets function
export function generateWidgets() {
  return widgets;
}
// Export the widgets object as the default
export default generateWidgets();
//# sourceMappingURL=Widgets.js.map
