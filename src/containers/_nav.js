
export default [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-browser',
        // badge: {
        //   color: 'info',
        //   text: 'NEW',
        // }
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['WorkFlow']
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Wallets',
        to: '/wallet/walletlist',
        icon: 'cil-storage',
    },



]

