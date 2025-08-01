import React from 'react';
import { Button, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link, BarChart } from '@mui/icons-material';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        color="inherit"
        component={RouterLink}
        to="/shortener"
        startIcon={<Link />}
        variant={location.pathname === '/shortener' ? 'outlined' : 'text'}
        sx={{ 
          color: 'white',
          borderColor: location.pathname === '/shortener' ? 'white' : 'transparent'
        }}
      >
        URL Shortener
      </Button>
      <Button
        color="inherit"
        component={RouterLink}
        to="/statistics"
        startIcon={<BarChart />}
        variant={location.pathname === '/statistics' ? 'outlined' : 'text'}
        sx={{ 
          color: 'white',
          borderColor: location.pathname === '/statistics' ? 'white' : 'transparent'
        }}
      >
        Statistics
      </Button>
    </Box>
  );
};

export default Navigation;