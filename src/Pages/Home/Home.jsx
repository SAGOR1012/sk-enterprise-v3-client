import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Title from '../../Components/Title/Title';
import { Link } from 'react-router-dom';
import DailySellChart from '../../Components/Charts/DailySellChart/DailySellChart';
import './home.css';
const Home = () => {
  return (
    <div className=''>
      {/* <Title heading='Dashboard'></Title> */}
      <Dashboard></Dashboard>
    </div>
  );
};

export default Home;
