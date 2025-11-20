import React from 'react';
import { render } from '@testing-library/react';

import FieldTemplate from '../src/Templates/FieldTemplate';
import CheckboxWidget from '../src/Widgets/CheckboxWidget';
import RadioWidget from '../src/Widgets/RadioWidget';
import RangeWidget from '../src/Widgets/RangeWidget';

// Minimal mock registry for widgets/templates
const mockRegistry: any = {
  fields: {},
  templates: {},
  widgets: {},
  formContext: {},
};

const noop = () => {};
const keyChangeFn = () => () => {};
const dropPropertyFn = () => () => {};

describe('USWDS Widget CSS and Structure Parity', () => {
  it('renders CheckboxWidget with correct class and spacing', () => {
    const { container } = render(
      <CheckboxWidget
        id="checkbox-test"
        name="checkbox-test"
        value={true}
        required={true}
        disabled={false}
        readonly={false}
        label="Test Checkbox"
        schema={{ type: 'boolean', title: 'Test Checkbox' }}
        options={{}}
        registry={mockRegistry}
        onChange={noop}
        onBlur={noop}
        onFocus={noop}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('.margin-bottom-2')).toBeTruthy();
  });

  it('renders RadioWidget with correct class and spacing', () => {
    const { container } = render(
      <RadioWidget
        id="radio-test"
        name="radio-test"
        options={{
          enumOptions: [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
          ],
        }}
        value={'a'}
        required={true}
        disabled={false}
        readonly={false}
        schema={{ type: 'string', title: 'Test Radio' }}
        label="Test Radio"
        registry={mockRegistry}
        onChange={noop}
        onBlur={noop}
        onFocus={noop}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('.margin-bottom-2')).toBeTruthy();
  });

  it('renders RangeWidget with correct value and structure', () => {
    const { container } = render(
      <RangeWidget
        id="range-test"
        name="range-test"
        value={50}
        required={true}
        disabled={false}
        readonly={false}
        schema={{ type: 'number', minimum: 0, maximum: 100, title: 'Test Range' }}
        options={{}}
        label="Test Range"
        hideLabel={false}
        registry={mockRegistry}
        onChange={noop}
        onBlur={noop}
        onFocus={noop}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('.field-range-wrapper')).toBeTruthy();
  });

  it('renders FieldTemplate with H1 for root title', () => {
    const { container } = render(
      <FieldTemplate
        id="root"
        label="Root Title"
        required={true}
        hidden={false}
        classNames=""
        style={{}}
        displayLabel={true}
        rawErrors={[]}
        rawHelp={undefined}
        rawDescription={undefined}
        registry={mockRegistry}
        uiSchema={{}}
        schema={{ type: 'object' }}
        readonly={false}
        disabled={false}
        onChange={() => {}}
        onKeyChange={keyChangeFn}
        onDropPropertyClick={dropPropertyFn}
      >
        <div>Child</div>
      </FieldTemplate>,
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('h1')).toBeTruthy();
  });
});
