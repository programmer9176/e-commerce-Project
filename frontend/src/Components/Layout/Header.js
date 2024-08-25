import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../ContenxtApi/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Header = () => {

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })

    localStorage.removeItem("auth")
    navigate("/login")
    toast.success("Logout successfully")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">E-Commerce</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link active" aria-current="page">Home</NavLink>
                  </li>


                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth.user.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink></li>
                      <li><NavLink to="/login" onClick={handleLogout} className="dropdown-item">Logout</NavLink></li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/service" className="nav-link" aria-current="page">Service</NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/service" className="nav-link" aria-current="page">About</NavLink>
                  </li>

                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" aria-current="page">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/signup" className="nav-link" aria-current="page">SignUp</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Header
