import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import classes from './header.module.css';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  // Function to render content based on the current rout

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          PHOENIX GIFTS!
        </Link>
        
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <a onClick={logout}>Logout</a>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Render content based on current route */}
      </div>
    </header>
  );
}
