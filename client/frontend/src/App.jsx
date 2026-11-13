import User from "./getUser/User"
import "./App.css";
import AddUser from "./adduser/adduser"
import UpdateUser from "./updateUsers/Update"
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom"

function AppLayout() {
  return (
    <div className="appShell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Morrow home">
          <span className="brandMark" aria-hidden="true">m</span>
          <span className="brandName">morrow<span>.</span></span>
        </Link>
        <div className="topbarMeta">
          <span className="topbarLabel">PEOPLE DIRECTORY</span>
          <span className="systemStatus"><span /> All systems normal</span>
        </div>
      </header>
      <main className="appMain">
        <Outlet />
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <User /> },
      { path: "adduser", element: <AddUser /> },
      { path: "update/:id", element: <UpdateUser /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
