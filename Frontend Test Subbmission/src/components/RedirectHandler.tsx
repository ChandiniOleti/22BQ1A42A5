import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Alert, Typography, Button } from '@mui/material';
import { Launch, Home } from '@mui/icons-material';
import { urlService } from '../services/urlService';
import { useLogging } from '../middleware/LoggingContext';

const RedirectHandler: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const { logInfo, logError, logWarn } = useLogging();

  useEffect(() => {
    if (!shortCode) {
      setError('Invalid short code');
      setLoading(false);
      logWarn('Redirect attempted with no short code', null, 'RedirectHandler', 'mount');
      return;
    }

    handleRedirect();
  }, [shortCode]);

  const handleRedirect = async () => {
    if (!shortCode) return;

    try {
      logInfo('Attempting to resolve short URL', { shortCode }, 'RedirectHandler', 'resolve');
      
      const response = await urlService.getURLByShortCode(shortCode);
      
      if (response.success && response.data) {
        setOriginalUrl(response.data.originalUrl);
        logInfo('Short URL resolved successfully', { 
          shortCode, 
          originalUrl: response.data.originalUrl,
          clickCount: response.data.clickCount 
        }, 'RedirectHandler', 'resolve');
        
        // Auto-redirect after a short delay
        setTimeout(() => {
          setRedirecting(true);
          window.location.href = response.data!.originalUrl;
        }, 2000);
      } else {
        setError(response.error || 'Short URL not found or has expired');
        logError('Failed to resolve short URL', { 
          shortCode, 
          error: response.error 
        }, 'RedirectHandler', 'resolve');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      logError('Unexpected error during URL resolution', { 
        shortCode, 
        error 
      }, 'RedirectHandler', 'resolve');
    } finally {
      setLoading(false);
    }
  };

  const handleManualRedirect = () => {
    if (originalUrl) {
      setRedirecting(true);
      logInfo('Manual redirect initiated', { originalUrl }, 'RedirectHandler', 'manualRedirect');
      window.location.href = originalUrl;
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="400px"
        gap={2}
      >
        <CircularProgress size={60} />
        <Typography variant="h6">
          Resolving short URL...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Short code: {shortCode}
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="400px"
        gap={3}
      >
        <Alert severity="error" sx={{ maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            URL Not Found
          </Typography>
          <Typography variant="body1">
            {error}
          </Typography>
        </Alert>
        
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => window.location.href = '/shortener'}
          >
            Go to URL Shortener
          </Button>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Short code: {shortCode}
        </Typography>
      </Box>
    );
  }

  if (originalUrl) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="400px"
        gap={3}
      >
        {redirecting ? (
          <>
            <CircularProgress size={60} />
            <Typography variant="h6">
              Redirecting...
            </Typography>
          </>
        ) : (
          <>
            <Alert severity="success" sx={{ maxWidth: 600 }}>
              <Typography variant="h6" gutterBottom>
                URL Found!
              </Typography>
              <Typography variant="body1" gutterBottom>
                You will be redirected to:
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  wordBreak: 'break-all',
                  fontFamily: 'monospace',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  padding: 1,
                  borderRadius: 1,
                  mt: 1
                }}
              >
                {originalUrl}
              </Typography>
            </Alert>
            
            <Typography variant="body2" color="text.secondary">
              Redirecting automatically in a few seconds...
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              startIcon={<Launch />}
              onClick={handleManualRedirect}
            >
              Go Now
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Home />}
              onClick={() => window.location.href = '/shortener'}
            >
              Back to URL Shortener
            </Button>
          </>
        )}
      </Box>
    );
  }

  // Fallback - should not reach here
  return <Navigate to="/shortener" replace />;
};

export default RedirectHandler;