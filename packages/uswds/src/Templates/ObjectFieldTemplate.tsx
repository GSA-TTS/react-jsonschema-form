import {
  FormContextType,
  ObjectFieldTemplateProps,
  RJSFSchema,
  StrictRJSFSchema,
  getTemplate,
} from '@rjsf/utils';
import { Grid, GridContainer } from '@trussworks/react-uswds';

/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. Since this will wrap rendered content, and was really more of a concept of
 * RJSF than a React template, the name of the component is `ObjectField` instead of `ObjectFieldTemplate`.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
export default function ObjectFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: ObjectFieldTemplateProps<T, S, F>) {
  const { description, title, properties, required, uiSchema, idSchema, schema, registry } = props;

  if (!idSchema) {
    return null;
  }

  const uiOptions = uiSchema?.['ui:options'];

  const TitleFieldTemplate = getTemplate<'TitleFieldTemplate', T, S, F>(
    'TitleFieldTemplate',
    registry,
    uiOptions,
  );

  const DescriptionFieldTemplate = getTemplate<'DescriptionFieldTemplate', T, S, F>(
    'DescriptionFieldTemplate',
    registry,
    uiOptions,
  );

  return (
    <GridContainer className="usa-form-group">
      {title && (
        <TitleFieldTemplate
          id={`${idSchema.$id}-title`}
          title={title}
          required={required}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {description && (
        <DescriptionFieldTemplate
          id={`${idSchema.$id}-description`}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      <Grid row gap={2}>
        {properties.map((prop) => (
          <Grid key={prop.name} col={12}>
            {prop.content}
          </Grid>
        ))}
      </Grid>
    </GridContainer>
  );
}
