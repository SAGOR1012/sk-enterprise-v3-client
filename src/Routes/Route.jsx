import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import InvoiceForm from '../Components/InvoiceForm/InvoiceForm';
import InventoryTable from '../Components/InventoryTable/InventoryTable';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Signup/Signup';
import PrivateRoute from './PrivetRoute/PrivetRoute';
import OrderHistory from '../Components/Orders/OrderHistory/OrderHistory';
// import MonthlyTargetProgress from '../Components/Progress/MonthlyTargetProgress';
import ShortProductTable from '../Components/ShortProductTable/ShortProductTable';
import Investment from '../Pages/Investment/Investment';
import StaffPage from '../Pages/staff/StaffPage';
import RestAmount from '../Pages/RestAmount/RestAmount';
// import CustomerDetail from '../Components/CustomerDetail/CustomerDetail';
import BuyProducts from '../Pages/BuyProducts/BuyProducts';
import BookProducts from '../Pages/ProductBooking/BookProducts';
import DemoDashboard from '../Pages/DemoDashboard/DemoDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: '/invoiceform',
        element: (
          <PrivateRoute>
            <InvoiceForm />
          </PrivateRoute>
        ),
      },
      {
        path: '/inventorytable',
        element: (
          <PrivateRoute>
            <InventoryTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/ordersHistory',
        element: (
          <PrivateRoute>
            <OrderHistory></OrderHistory>
          </PrivateRoute>
        ),
      },
      {
        path: '/shortProducts',
        element: (
          <PrivateRoute>
            <ShortProductTable></ShortProductTable>
          </PrivateRoute>
        ),
      },
      {
        path: '/investment',
        element: (
          <PrivateRoute>
            <Investment></Investment>
          </PrivateRoute>
        ),
      },
      {
        path: '/staff',
        element: (
          <PrivateRoute>
            <StaffPage></StaffPage>
          </PrivateRoute>
        ),
      },
      {
        path: '/restAmount',
        element: (
          <PrivateRoute>
            <RestAmount></RestAmount>
          </PrivateRoute>
        ),
      },
      {
        path: '/buyproducts',
        element: <BuyProducts></BuyProducts>,
      },
      {
        path: '/bookproducts',
        element: <BookProducts></BookProducts>,
      },
      // {
      //   path: '/customer/:id', // New route for CustomerDetail page
      //   element: (
      //     <PrivateRoute>
      //       <CustomerDetail />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/demo',
        element: <DemoDashboard></DemoDashboard>,
      },
    ],
  },
]);
