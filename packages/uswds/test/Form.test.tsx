import { formTests } from '@rjsf/snapshot-tests';

import WrappedForm from './WrappedForm';

// Run snapshot tests for the USWDS theme
formTests(WrappedForm);

describe('USWDS Form', () => {
  it('should exist', () => {
    expect(WrappedForm).toBeTruthy();
  });
});
