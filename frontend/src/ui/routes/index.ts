import { lazy } from 'react'

const routes = [
    {
        path: '/',
        component: lazy(() => import('@/ui/pages/Dashboard')),
        title: 'Dashboard'
    },
    {
        path: '/daily-register',
        component: lazy(() => import('@/ui/pages/DailyRegister')),
        title: 'Daily register'
    },
    {
        path: '/monthly-budget',
        component: lazy(() => import('@/ui/pages/MonthlyBudget')),
        title: 'Monthly budget'
    },
    {
        path: '/expense-tracking',
        component: lazy(() => import('@/ui/pages/ExpenseTracking')),
        title: 'Expense tracking'
    },
    {
        path: '/savings-and-investments',
        component: lazy(() => import('@/ui/pages/SavingsInvestments')),
        title: 'Savings and investments'
    },{
        path: '/wishlist',
        component: lazy(() => import('@/ui/pages/Wishlist')),
        title: 'Wishlist'
    },{
        path: '/categories',
        component: lazy(() => import('@/ui/pages/Categories')),
        title: 'Categories'
    }
]

export default routes