import { render } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { router } from './router';
import { test, expect } from 'vitest';

test('App renders without crashing', () => {
  const result = render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
  expect(result.container).toBeTruthy();
  console.log(result.container.innerHTML.substring(0, 500));
});
