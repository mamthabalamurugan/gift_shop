import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import classes from './dashboard.module.css';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        {allItems
          .filter(item => user.isAdmin || !item.forAdmin)
          .map(item => (
            <Link
              key={item.title}
              to={item.url}
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                color: item.color,
              }}
              className={classes.menuItem}
            >
              <h2>{item.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}

const allItems = [
  {
    title: 'Orders',
    imageUrl: 'https://img.freepik.com/premium-photo/bright-lavender-flowers-selective-focus-lavender-field_160152-4999.jpg',
    url: '/orders',
    color: 'white',
  },
  {
    title: 'Profile',
    imageUrl: 'https://img.freepik.com/premium-photo/bright-lavender-flowers-selective-focus-lavender-field_160152-4999.jpg',
    url: '/profile',
    color: 'white',
  },
  {
    title: 'Users',
    imageUrl: 'https://img.freepik.com/premium-photo/bright-lavender-flowers-selective-focus-lavender-field_160152-4999.jpg',
    url: '/admin/users',
    forAdmin: true,
    color: 'white',
  },
  {
    title: 'Products',
    imageUrl: 'https://img.freepik.com/premium-photo/bright-lavender-flowers-selective-focus-lavender-field_160152-4999.jpg',
    url: '/admin/foods',
    forAdmin: true,
    color: 'white',
  },
];
