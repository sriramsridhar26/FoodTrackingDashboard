import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Transitn from './pages/Transitn/Transitn';
import { Grid } from '@mui/material';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import TransitnFruitn from './pages/TransitnFruitn/TransitnFruitn';



function App() {
  const [enableSideNav, updateenableSideNav] = useState(false);
  var transitId = 0;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login onupdateSideNav={updateenableSideNav} />,
    },
    {
      path: "/Home",
      element: <Home onupdateSideNav={updateenableSideNav} />,
    },
    {
      path: "/Transit/:transitId",
      element: <Transitn onupdateSideNav={updateenableSideNav} />,
    },
    {
      path: "/TransitFruit/:FruitId/:transitId",
      element: <TransitnFruitn onupdateSideNav={updateenableSideNav} />,
    }
  ]);

  return (
    <>
      <div className='grid'>
        <div className='sidenav'>
          {enableSideNav && <SideNav />}

        </div>
        <div className='app'>
          <RouterProvider router={router} />
        </div>


      </div>

    </>
  )
}

export default App
