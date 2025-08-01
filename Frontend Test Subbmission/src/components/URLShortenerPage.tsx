import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Chip,
  Grid,
  Divider,
  Tooltip,
  Snackbar
} from '@mui/material';
import {
  ContentCopy,
  Delete,
  Launch,
  AccessTime,
  Link as LinkIcon
} from '@mui/icons-material';
import { URLFormData, ShortenedURL } from '../types';
import { urlService } from '../services/urlService';
import { validateFormData, formatValidationErrors } from '../utils/validation';
import { useLogging } from '../middleware/LoggingContext';

const URLShortenerPage: React.FC = () => {
  const [formData, setFormData] = useState<URLFormData>({
    originalUrl: '',
    validityPeriod: 30,
    customShortcode: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState<ShortenedURL[]>([]);
  const [loadingUrls, setLoadingUrls] = useState(true);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const { logInfo, logError, logWarn } = useLogging();

  useEffect(() => {
    loadURLs();
    logInfo('URL Shortener page loaded', null, 'URLShortenerPage', 'mount');
  }, [logInfo]);

  const loadURLs = async () => {
    try {
      setLoadingUrls(true);
      const response = await urlService.getAllURLs();
      if (response.success && response.data) {
        setUrls(response.data);
        logInfo(`Loaded ${response.data.length} URLs`, { count: response.data.length }, 'URLShortenerPage', 'loadURLs');
      } else {
        logError('Failed to load URLs', { error: response.error }, 'URLShortenerPage', 'loadURLs');
      }
    } catch (error) {
      logError('Error loading URLs', { error }, 'URLShortenerPage', 'loadURLs');
    } finally {
      setLoadingUrls(false);
    }
  };

  const handleInputChange = (field: keyof URLFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'validityPeriod' ? parseInt(event.target.value) || 0 : event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Client-side validation
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      setErrors(formatValidationErrors(validationErrors));
      logWarn('Form validation failed', { errors: validationErrors }, 'URLShortenerPage', 'submit');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      logInfo('Attempting to shorten URL', { url: formData.originalUrl }, 'URLShortenerPage', 'submit');
      
      const response = await urlService.shortenURL(formData);
      
      if (response.success && response.data) {
        logInfo('URL shortened successfully', { shortCode: response.data.shortCode }, 'URLShortenerPage', 'submit');
        
        setSnackbar({
          open: true,
          message: 'URL shortened successfully!',
          severity: 'success'
        });
        
        // Reset form
        setFormData({
          originalUrl: '',
          validityPeriod: 30,
          customShortcode: ''
        });
        
        // Reload URLs
        await loadURLs();
      } else {
        if (response.validationErrors) {
          setErrors(formatValidationErrors(response.validationErrors));
          logWarn('Server validation failed', { errors: response.validationErrors }, 'URLShortenerPage', 'submit');
        } else {
          setSnackbar({
            open: true,
            message: response.error || 'Failed to shorten URL',
            severity: 'error'
          });
          logError('Failed to shorten URL', { error: response.error }, 'URLShortenerPage', 'submit');
        }
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'An unexpected error occurred',
        severity: 'error'
      });
      logError('Unexpected error during URL shortening', { error }, 'URLShortenerPage', 'submit');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setSnackbar({
        open: true,
        message: 'URL copied to clipboard!',
        severity: 'success'
      });
      logInfo('URL copied to clipboard', { url }, 'URLShortenerPage', 'copy');
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to copy URL',
        severity: 'error'
      });
      logError('Failed to copy URL to clipboard', { error }, 'URLShortenerPage', 'copy');
    }
  };

  const handleDeleteURL = async (id: string, shortCode: string) => {
    try {
      logInfo('Attempting to delete URL', { id, shortCode }, 'URLShortenerPage', 'delete');
      
      const response = await urlService.deleteURL(id);
      
      if (response.success) {
        setSnackbar({
          open: true,
          message: 'URL deleted successfully!',
          severity: 'success'
        });
        logInfo('URL deleted successfully', { id, shortCode }, 'URLShortenerPage', 'delete');
        await loadURLs();
      } else {
        setSnackbar({
          open: true,
          message: response.error || 'Failed to delete URL',
          severity: 'error'
        });
        logError('Failed to delete URL', { error: response.error }, 'URLShortenerPage', 'delete');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'An unexpected error occurred',
        severity: 'error'
      });
      logError('Unexpected error during URL deletion', { error }, 'URLShortenerPage', 'delete');
    }
  };

  const formatTimeRemaining = (expiresAt: Date): string => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  const activeUrls = urls.filter(url => url.isActive);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        URL Shortener
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Shorten a New URL
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Original URL"
                value={formData.originalUrl}
                onChange={handleInputChange('originalUrl')}
                error={!!errors.originalUrl}
                helperText={errors.originalUrl || 'Enter the URL you want to shorten (e.g., https://example.com)'}
                placeholder="https://example.com"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Validity Period (minutes)"
                value={formData.validityPeriod}
                onChange={handleInputChange('validityPeriod')}
                error={!!errors.validityPeriod}
                helperText={errors.validityPeriod || 'How long should this URL be valid? (1-1440 minutes)'}
                inputProps={{ min: 1, max: 1440 }}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Custom Shortcode (Optional)"
                value={formData.customShortcode}
                onChange={handleInputChange('customShortcode')}
                error={!!errors.customShortcode}
                helperText={errors.customShortcode || 'Optional: Choose your own shortcode (3-20 characters, letters and numbers only)'}
                placeholder="mylink123"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <LinkIcon />}
                sx={{ minWidth: 150 }}
              >
                {loading ? 'Shortening...' : 'Shorten URL'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Your Shortened URLs ({activeUrls.length}/5)
        </Typography>
        
        {loadingUrls ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : activeUrls.length === 0 ? (
          <Alert severity="info">
            No active shortened URLs. Create your first one above!
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {activeUrls.map((url) => (
              <Grid item xs={12} key={url.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box flex={1}>
                        <Typography variant="subtitle1" component="div" gutterBottom>
                          <strong>Short URL:</strong> {url.shortUrl}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          <strong>Original:</strong> {url.originalUrl}
                        </Typography>
                        <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                          <Chip
                            icon={<AccessTime />}
                            label={`Expires in ${formatTimeRemaining(url.expiresAt)}`}
                            size="small"
                            color={formatTimeRemaining(url.expiresAt) === 'Expired' ? 'error' : 'default'}
                          />
                          <Chip
                            label={`${url.clickCount} clicks`}
                            size="small"
                            variant="outlined"
                          />
                          {url.customShortcode && (
                            <Chip
                              label="Custom"
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </Box>
                      
                      <Box display="flex" gap={1}>
                        <Tooltip title="Copy to clipboard">
                          <IconButton
                            onClick={() => handleCopyToClipboard(url.shortUrl)}
                            size="small"
                          >
                            <ContentCopy />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Open original URL">
                          <IconButton
                            onClick={() => window.open(url.originalUrl, '_blank')}
                            size="small"
                          >
                            <Launch />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete URL">
                          <IconButton
                            onClick={() => handleDeleteURL(url.id, url.shortCode)}
                            size="small"
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    
                    <Divider />
                    
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Created: {url.createdAt.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default URLShortenerPage;