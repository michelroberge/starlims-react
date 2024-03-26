import React from 'react';
import navigationConfig from '../navigation-config.json';
import Login from './components/Login.jsx';
// Function to generate routes recursively
const generateRoutesRecursively = async (items) => {
  const routes = await Promise.all(items.map(async ({ path, component, isPrivate, children }) => {
    if (path && component) {
      let element;
      if (component.includes('/') ) {
        const n = component.lastIndexOf('/');
        const v = component.substring(n+1);
        element = await import(`./components/${component.substring(0, n)}/${v}.jsx`);
      } else {
        element = await import(`./components/${component}.jsx`);
      }

      return {
        path,
        element: React.createElement(element.default),
        isPrivate
      };
    } else if (children) {
      const childRoutes = await generateRoutesRecursively(children);
      // Flatten childRoutes array and include them directly in the routes array
      return childRoutes;
    }
  }));

  // Flatten nested arrays (if any) and filter out undefined routes
  return routes.flat().filter(route => route);
};


// Function to generate routes based on the JSON configuration
const generateRoutes = async () => {
  const dynamicRoutes = await generateRoutesRecursively(navigationConfig);

  // Add your static route here
  const staticRoute = {
    path: "/login",
    element: <Login />,
    isPrivate: false, // Adjust this as needed
  };

  // Concatenate the static route with the dynamically generated routes
  const routes = [...dynamicRoutes, staticRoute];
  return routes;
};


// Export async function to get routes
export default async function getRoutes() {
  const routes = await generateRoutes();
  return routes;
}
