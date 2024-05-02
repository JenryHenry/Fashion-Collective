import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import Cart from './pages/Cart.jsx';
import Outfits from './pages/Outfits.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchApparel />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/outfits',
        element: <Outfits />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
