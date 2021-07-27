import React from 'react';
import renderer from 'react-test-renderer';
import BundleBlobRadio from '../lib/components/drs/formComponents/BundleBlobRadio';
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('SHOW and EDIT <BundleBlobRadio /> should handle blob selection', () => {
    const bundleBlobRadio = renderer
    .create(<BundleBlobRadio is_bundle={false} readOnly={true} />)
    .toJSON();
    expect(bundleBlobRadio).toMatchSnapshot();
});

test('SHOW and EDIT <BundleBlobRadio /> should handle bundle selection', () => {
    const bundleBlobRadio = renderer
    .create(<BundleBlobRadio is_bundle={true} readOnly={true} />)
    .toJSON();
    expect(bundleBlobRadio).toMatchSnapshot();
});

test('NEW <BundleBlobRadio /> should handle blob selection', () => {
    const bundleBlobRadio = renderer
    .create(<BundleBlobRadio id_bundle={false} readOnly={false} />)
    .toJSON();
    expect(bundleBlobRadio).toMatchSnapshot();
});

test('NEW <BundleBlobRadio /> should handle bundle selection', () => {
    const bundleBlobRadio = renderer
    .create(<BundleBlobRadio is_bundle={true} readOnly={false} />)
    .toJSON();
    expect(bundleBlobRadio).toMatchSnapshot();
});