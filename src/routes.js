import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

// const Login = React.lazy(() => import('./views/pages/login/Login'));
// const ComplaintsForm= React.lazy(() => import('./views/complaints/ComplaintsForm'));
const WalletRegister = React.lazy(() => import('./views/wallet/WalletRegister'));
const WalletList = React.lazy(() => import('./views/wallet/WalletList'));




const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/wallet/walletList', name: 'Wallet', component: WalletList },
  { path: '/wallet/walletRegister', name: 'Wallet', component: WalletRegister },




];

export default routes;
