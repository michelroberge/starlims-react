import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

let wrapper; // Declare the wrapper at a higher scope

describe('<App />', () => {
  // Run this setup code before each test
  beforeEach(() => {
    wrapper = render(
        <App />
    );
  });

  test('App mounts properly', () => {
    expect(wrapper).toBeTruthy();
  });

  test('specific test in document', () => {
    const warning = screen.getByText(/This is a development server/i);
    expect(warning.textContent).toBeTruthy();

    // You can access the wrapper here
    const h3 = wrapper.container.querySelector('h3');
    expect(h3?.textContent).toBe('Credentials');
  });

  test('click home button', async () => {

    const homeButton = screen.getByText(import.meta.env.VITE_APP_TITLE);
    expect(homeButton.textContent).toBeTruthy();

    // Simulate a click event
    fireEvent.click(homeButton);

    // You can assert the behavior after the click event here
    // For example, you can check if some state has changed or a specific component is rendered.
    // check that mongoDb text is there.
    const topP = screen.getByText(/This is web app built with the following components:/i);
    expect(topP.textContent).toBeTruthy();

  });

  test('login button to be present', async () => {
    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeTruthy();
  });
  
});
