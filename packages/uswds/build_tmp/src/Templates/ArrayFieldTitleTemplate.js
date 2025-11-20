import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { titleId } from '@rjsf/utils';
/** The `ArrayFieldTitleTemplate` component renders a title for an array field
 *
 * @param props - The `ArrayFieldTitleProps` for the component
 */
export default function ArrayFieldTitleTemplate({ idSchema, title, required }) {
  if (!title) {
    return null;
  }
  const id = titleId(idSchema);
  return _jsxs('legend', {
    id: id,
    className: 'field-title',
    children: [title, required && _jsx('span', { className: 'required', children: '*' })],
  });
}
//# sourceMappingURL=ArrayFieldTitleTemplate.js.map
