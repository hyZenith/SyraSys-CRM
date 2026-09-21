import { render } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { router } from './router';

try {
  const result = render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
  console.log("Render successful!");
  console.log(result.container.innerHTML.substring(0, 500));
} catch (error) {
  console.error("Render failed with error:");
  console.error(error);
}
