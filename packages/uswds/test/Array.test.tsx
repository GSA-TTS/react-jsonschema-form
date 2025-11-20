import { arrayTests } from '@rjsf/snapshot-tests';
import Form from '../src';

describe('ArrayField Tests', () => {
  it('runs array field tests', () => {
    arrayTests(Form);
  });
});
