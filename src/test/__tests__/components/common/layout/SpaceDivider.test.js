import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceDivider from '../../../../../lib/components/common/layout/SpaceDivider';

test('<SpaceDivider />', () => {
    const {container} = render(<SpaceDivider />);
    expect(container.firstChild).toMatchSnapshot();
});