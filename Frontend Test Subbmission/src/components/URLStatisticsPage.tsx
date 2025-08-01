import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import {
  Launch,
  ContentCopy,
  TrendingUp,
  Link as LinkIcon,
  AccessTime,
  BarChart
} from '@mui/icons-material';
import { ShortenedURL } from '../types';
import { urlService } from '../services/urlService';
import { useLogging } from '../middleware/LoggingContext';

interface Statistics {
  totalUrls: number;
  activeUrls: number;
  expiredUrls: number;
  totalClicks: number;
}

const URLStatisticsPage: React.FC = () => {
  const [urls, setUrls] = useState<ShortenedURL[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { logInfo, logError } = useLogging();

  useEffect(() => {
    loadData();
    logInfo('URL Statistics page loaded', null, 'URLStatisticsPage', 'mount');
  }, [logInfo]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [urlsResponse, statsResponse] = await Promise.all([
        urlService.getAllURLs(),
        urlService.getStatistics()
      ]);

      if (urlsResponse.success && urlsResponse.data) {
        setUrls(urlsResponse.data);
        logInfo(`Loaded ${urlsResponse.data.length} URLs for statistics`, { count: urlsResponse.data.length }, 'URLStatisticsPage', 'loadData');
      } else {
        throw new Error(urlsResponse.error || 'Failed to load URLs');
      }

      if (statsResponse.success && statsResponse.data) {
        setStatistics(statsResponse.data);
        logInfo('Loaded statistics', statsResponse.data, 'URLStatisticsPage', 'loadData');
      } else {
        throw new Error(statsResponse.error || 'Failed to load statistics');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      logError('Failed to load statistics data', { error }, 'URLStatisticsPage', 'loadData');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      logInfo('URL copied to clipboard from statistics', { url }, 'URLStatisticsPage', 'copy');
    } catch (error) {
      logError('Failed to copy URL to clipboard from statistics', { error }, 'URLStatisticsPage', 'copy');
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

  const getStatusColor = (url: ShortenedURL): 'success' | 'warning' | 'error' => {
    if (!url.isActive) return 'error';
    const now = new Date();
    const timeLeft = url.expiresAt.getTime() - now.getTime();
    const hoursLeft = timeLeft / (1000 * 60 * 60);
    
    if (hoursLeft < 1) return 'warning';
    return 'success';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        URL Statistics
      </Typography>

      {/* Statistics Cards */}
      {statistics && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <LinkIcon color="primary" />
                  <Box>
                    <Typography variant="h4" component="div">
                      {statistics.totalUrls}
                    </Typography>
                    <Typography color="text.secondary">
                      Total URLs
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <AccessTime color="success" />
                  <Box>
                    <Typography variant="h4" component="div">
                      {statistics.activeUrls}
                    </Typography>
                    <Typography color="text.secondary">
                      Active URLs
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <BarChart color="warning" />
                  <Box>
                    <Typography variant="h4" component="div">
                      {statistics.expiredUrls}
                    </Typography>
                    <Typography color="text.secondary">
                      Expired URLs
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <TrendingUp color="info" />
                  <Box>
                    <Typography variant="h4" component="div">
                      {statistics.totalClicks}
                    </Typography>
                    <Typography color="text.secondary">
                      Total Clicks
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* URLs Table */}
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            All Shortened URLs
          </Typography>

          {urls.length === 0 ? (
            <Alert severity="info">
              No URLs have been created yet. Go to the URL Shortener page to create your first one!
            </Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Short Code</TableCell>
                    <TableCell>Original URL</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Clicks</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Expires</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {urls.map((url) => (
                    <TableRow key={url.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" fontFamily="monospace">
                            {url.shortCode}
                          </Typography>
                          {url.customShortcode && (
                            <Chip label="Custom" size="small" variant="outlined" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            maxWidth: 300, 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                          title={url.originalUrl}
                        >
                          {url.originalUrl}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={url.isActive ? 'Active' : 'Expired'}
                          color={getStatusColor(url)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {url.clickCount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {url.createdAt.toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {url.isActive ? formatTimeRemaining(url.expiresAt) : 'Expired'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="Copy short URL">
                            <IconButton
                              size="small"
                              onClick={() => handleCopyToClipboard(url.shortUrl)}
                            >
                              <ContentCopy fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Open original URL">
                            <IconButton
                              size="small"
                              onClick={() => window.open(url.originalUrl, '_blank')}
                            >
                              <Launch fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default URLStatisticsPage;