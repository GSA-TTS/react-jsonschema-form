import { FormProps } from '@rjsf/core';
import Form from '../src';

/**
 * WrappedForm component for USWDS snapshot tests.
 * Provides the necessary setup for USWDS form rendering.
 * Note: USWDS CSS must be imported in jest.setup.js
 */
export default function WrappedForm(props: FormProps) {
  return <Form {...props} />;
}
