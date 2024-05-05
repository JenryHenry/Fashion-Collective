import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@radix-ui/themes/styles.css';

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import SearchApparel from './pages/SearchApparel.jsx';
import Cart from './pages/Cart.jsx';
import Outfits from './pages/Outfits.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/search',
        element: <SearchApparel />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/my-outfits',
        element: <Outfits />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
