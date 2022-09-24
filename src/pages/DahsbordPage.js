import React from 'react'
import BaseLayout from '../utils/BaseLayout';

import Dashboard from '../components/Dashboard';

const DashboardPage = () => {


  return  <BaseLayout children={<Dashboard />} active="dashboard" />
    
}

export default DashboardPage;