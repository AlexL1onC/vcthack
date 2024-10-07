import React from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import DashboardServer from './components/user-server';
import { redirect } from 'next/navigation';

const Dashboard = async () => {

  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect('/api/auth/login');
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <div className="lg:col-span-5">
          <DashboardServer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
