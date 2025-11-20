import templates from './Templates';
import Widgets from './Widgets';
/** Create a theme object using the Form, Templates and Widgets defined in the theme
 *
 * @param props - The `ThemeProps` for the theme
 * @returns - The theme object
 */
export function generateTheme() {
  return {
    // Cast to unknown first to bypass complex type comparison
    templates: templates,
    widgets: {},
  };
}
/** The `Theme` object for the `@rjsf/uswds` theme.
 */
const Theme = {
  templates: templates,
  widgets: Widgets,
};
export default generateTheme();
//# sourceMappingURL=Theme.js.map
