import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from 'react-router-dom';
import Home from './Home'; // Your main homepage component
import BookReturnForm from './components/BookReturn';
import BookCheckoutForm from './components/BookCheckout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="return" element={<BookReturnForm />} />
      <Route path="checkout" element={<BookCheckoutForm />} />

    </Route>
  )
);

const AppRouter = ({ loggedIn: boolean }) => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
