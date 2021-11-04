/**
 * @jest-environment jsdom
 */

import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../state/storeProvider';
//import { render, screen } from '@testing-library/react'
import { render, screen } from '../test-utils';
import Home from '../pages/index';

jest.mock('next/router');

describe('Home', () => {
  let expectedRouterPush;

  beforeEach(() => {
    expectedRouterPush = jest.fn();

    useRouter.mockReturnValue({ push: expectedRouterPush });
  });

  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
