import { ChangeEvent, useCallback, useMemo } from 'react';
import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  dataURItoBlob,
  Registry,
  TranslatableString,
} from '@rjsf/utils';
import Markdown from 'markdown-to-jsx';
import { Button, FileInput as BaseFileInput } from '@trussworks/react-uswds';

// Cast FileInput to accept any props to avoid type conflicts with HTML input attributes
const FileInput = BaseFileInput as any;

function addNameToDataURL(dataURL: string, name: string) {
  if (dataURL === null) {
    return null;
  }
  return dataURL.replace(';base64', `;name=${encodeURIComponent(name)};base64`);
}

type FileInfoType = {
  dataURL?: string | null;
  name: string;
  size: number;
  type: string;
};

function processFile(file: File): Promise<FileInfoType> {
  const { name, size, type } = file;
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
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

function processFiles(files: FileList): Promise<FileInfoType[]> {
  return Promise.all(Array.from(files).map(processFile));
}

function FilesInfo<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  filesInfo,
  registry,
  onRemove,
}: {
  filesInfo: FileInfoType[];
  registry: Registry<T, S, F>;
  onRemove: (index: number) => void;
}) {
  if (filesInfo.length === 0) {
    return null;
  }
  const { translateString } = registry;

  return (
    <ul className="usa-list usa-list--unstyled margin-top-1">
      {filesInfo.map((fileInfo, key) => {
        const { name, size, type } = fileInfo;
        const handleRemove = () => onRemove(key);
        return (
          <li key={key} className="margin-bottom-1">
            <Markdown>
              {translateString(TranslatableString.FilesInfo, [name, type, String(size)])}
            </Markdown>
            <Button
              type="button"
              onClick={handleRemove}
              unstyled
              className="margin-left-1 text-error"
            >
              {translateString(TranslatableString.RemoveButton)}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

function extractFileInfo(dataURLs: string[]): FileInfoType[] {
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
      return acc;
    }
  }, [] as FileInfoType[]);
}

export default function FileWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    disabled,
    readonly,
    required,
    multiple,
    onChange,
    onBlur,
    onFocus,
    value,
    registry,
    options,
    autofocus,
  } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }
      processFiles(event.target.files).then((filesInfoEvent) => {
        const newValue = filesInfoEvent.map((fileInfo) => fileInfo.dataURL);
        if (multiple) {
          const currentValue = Array.isArray(value) ? value : [];
          onChange(currentValue.concat(newValue.filter((v) => v !== null) as string[]));
        } else {
          onChange(newValue[0]);
        }
      });
    },
    [multiple, value, onChange],
  );

  const valueArray = useMemo(() => (Array.isArray(value) ? value : value ? [value] : []), [value]);
  const filesInfo = useMemo(() => extractFileInfo(valueArray), [valueArray]);

  const rmFile = useCallback(
    (index: number) => {
      if (multiple) {
        const currentValue = Array.isArray(value) ? value : [];
        const newValue = currentValue.filter((_: any, i: number) => i !== index);
        onChange(newValue);
      } else {
        onChange(undefined);
      }
    },
    [multiple, value, onChange],
  );

  const handleBlur = () => onBlur(id, value);
  const handleFocus = () => onFocus(id, value);

  return (
    <div>
      <FileInput
        id={id}
        name={id}
        disabled={disabled || readonly}
        required={required && filesInfo.length === 0}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        accept={options.accept ? String(options.accept) : undefined}
        multiple={multiple}
        autoFocus={autofocus}
      />
      <FilesInfo<T, S, F> filesInfo={filesInfo} onRemove={rmFile} registry={registry} />
    </div>
  );
}
