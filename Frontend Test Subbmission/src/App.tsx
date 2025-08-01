import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import URLShortenerPage from './components/URLShortenerPage';
import URLStatisticsPage from './components/URLStatisticsPage';
import RedirectHandler from './components/RedirectHandler';
import Navigation from './components/Navigation';
import { useLogging } from './middleware/LoggingContext';

const App: React.FC = () => {
  const { logInfo } = useLogging();

  React.useEffect(() => {
    logInfo('Application initialized', null, 'App', 'init');
  }, [logInfo]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Navigation />
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/shortener" replace />} />
          <Route path="/shortener" element={<URLShortenerPage />} />
          <Route path="/statistics" element={<URLStatisticsPage />} />
          <Route path="/:shortCode" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;