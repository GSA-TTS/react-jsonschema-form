import { objectTests } from '@rjsf/snapshot-tests';
import Form from '../src';

describe('ObjectField Tests', () => {
  it('runs object field tests', () => {
    objectTests(Form);
  });
});
