import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useCallback, useMemo } from 'react'; // Import hooks
import {
  dataURItoBlob, // Import helpers
  getTemplate,
  TranslatableString,
} from '@rjsf/utils';
import Markdown from 'markdown-to-jsx'; // Import Markdown for FilesInfo
import { Button } from '@trussworks/react-uswds'; // Import Button for remove
// Helper functions copied/adapted from core FileWidget
function addNameToDataURL(dataURL, name) {
  if (dataURL === null) {
    return null;
  }
  return dataURL.replace(';base64', `;name=${encodeURIComponent(name)};base64`);
}
function processFile(file) {
  const { name, size, type } = file;
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      var _a;
      if (
        typeof ((_a = event.target) === null || _a === void 0 ? void 0 : _a.result) === 'string'
      ) {
        resolve({
          dataURL: addNameToDataURL(event.target.result, name),
          name,
          size,
          type,
        });
      } else {
        resolve({
          dataURL: null,
          name,
          size,
          type,
        });
      }
    };
    reader.readAsDataURL(file);
  });
}
function processFiles(files) {
  return Promise.all(Array.from(files).map(processFile));
}
// Simple FilesInfo display component adapted for USWDS
function FilesInfo({ filesInfo, registry, onRemove, options }) {
  if (filesInfo.length === 0) {
    return null;
  }
  const { translateString } = registry;
  // Use USWDS Button for removal
  // const { RemoveButton } = getTemplate<'ButtonTemplates', T, S, F>('ButtonTemplates', registry, options); // Or use direct Button
  return _jsxs('ul', {
    className: 'usa-list usa-list--unstyled margin-top-1',
    children: [
      ' ',
      filesInfo.map((fileInfo, key) => {
        const { name, size, type } = fileInfo;
        const handleRemove = () => onRemove(key);
        return _jsxs(
          'li',
          {
            className: 'margin-bottom-1',
            children: [
              _jsx(Markdown, {
                children: translateString(TranslatableString.FilesInfo, [name, type, String(size)]),
              }),
              _jsx(Button, {
                type: 'button',
                onClick: handleRemove,
                // Use unstyled for simple remove link/button
                unstyled: true,
                className: 'margin-left-1 text-error', // Basic styling
                children: translateString(TranslatableString.RemoveButton),
              }),
            ],
          },
          key,
        );
      }),
    ],
  });
}
function extractFileInfo(dataURLs) {
  return dataURLs.reduce((acc, dataURL) => {
    if (!dataURL) {
      return acc;
    }
    try {
      const { blob, name } = dataURItoBlob(dataURL);
      return [
        ...acc,
        {
          dataURL,
          name: name,
          size: blob.size,
          type: blob.type,
        },
      ];
    } catch (e) {
      // Invalid dataURI, so just ignore it.
      return acc;
    }
  }, []);
}
// Updated FileWidget implementation
export default function FileWidget(props) {
  const { disabled, readonly, required, multiple, onChange, value, options, registry } = props;
  // Get BaseInputTemplate from registry
  const BaseInputTemplate = getTemplate('BaseInputTemplate', registry, options);
  const handleChange = useCallback(
    (event) => {
      if (!event.target.files) {
        return;
      }
      processFiles(event.target.files).then((filesInfoEvent) => {
        const newValue = filesInfoEvent.map((fileInfo) => fileInfo.dataURL);
        if (multiple) {
          // Ensure value is treated as an array
          const currentValue = Array.isArray(value) ? value : [];
          onChange(currentValue.concat(newValue.filter((v) => v !== null)));
        } else {
          onChange(newValue[0]);
        }
      });
    },
    [multiple, value, onChange],
  );
  // Ensure value is always an array for extractFileInfo, handle single value case
  const valueArray = useMemo(() => (Array.isArray(value) ? value : value ? [value] : []), [value]);
  const filesInfo = useMemo(() => extractFileInfo(valueArray), [valueArray]);
  const rmFile = useCallback(
    (index) => {
      if (multiple) {
        // Ensure value is treated as an array
        const currentValue = Array.isArray(value) ? value : [];
        const newValue = currentValue.filter((_, i) => i !== index);
        onChange(newValue);
      } else {
        onChange(undefined);
      }
    },
    [multiple, value, onChange],
  );
  // Determine if the input should be considered 'filled' (for required validation)
  const hasValue = multiple ? value && value.length > 0 : !!value;
  return _jsxs('div', {
    children: [
      _jsx(BaseInputTemplate, {
        ...props,
        disabled: disabled || readonly,
        type: 'file',
        required: !hasValue && required,
        onChangeOverride: handleChange,
        value: '', // Input value is always empty for file inputs
        accept: options.accept ? String(options.accept) : undefined,
        multiple: multiple,
      }),
      _jsx(FilesInfo, {
        filesInfo: filesInfo,
        onRemove: rmFile,
        registry: registry,
        options: options,
      }),
    ],
  });
}
//# sourceMappingURL=FileWidget.js.map
