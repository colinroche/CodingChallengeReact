import Header from './Header'
import Footer from './Footer'
import Home from '../pages/Home'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

export default function Router() {
    const Layout = () => {
        return (
            <div>
                <Header />
                <Outlet />
                <Footer />
            </div>
        )
    }

    const BrowserRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                }
            ]
        }
    ])

    return (
        <div>
            <RouterProvider router={BrowserRoutes} />
        </div>
    )
}