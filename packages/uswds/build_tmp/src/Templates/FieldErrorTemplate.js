import { jsx as _jsx } from 'react/jsx-runtime';
/** The `FieldErrorTemplate` component renders the errors local to the particular field
 *
 * @param props - The `FieldErrorProps` for the errors being rendered
 */
export default function FieldErrorTemplate(props) {
  const { errors = [], idSchema } = props;
  if (errors.length === 0) {
    return null;
  }
  const id = `${idSchema.$id}__error`;
  return _jsx('ul', {
    id: id,
    className: 'error-detail bs-callout bs-callout-info',
    children: errors
      .filter((elem) => !!elem)
      .map((error, index) => {
        return _jsx(
          'li',
          { className: 'usa-error-message', role: 'alert', children: error },
          index,
        );
      }),
  });
}
//# sourceMappingURL=FieldErrorTemplate.js.map
