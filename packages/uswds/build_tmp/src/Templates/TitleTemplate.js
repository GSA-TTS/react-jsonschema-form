import { jsx as _jsx } from 'react/jsx-runtime';
export default function Title({ id, title }) {
  if (!title) {
    return null;
  }
  return _jsx('h2', { id: id, className: 'usa-legend', children: title });
}
//# sourceMappingURL=TitleTemplate.js.map
