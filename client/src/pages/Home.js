import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link as LinkIcon, Copy, ExternalLink, BarChart3, Shield } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!originalUrl) {
      toast.error('Please enter a URL');
      return;
    }

    if (!isAuthenticated) {
      toast.error('Please login to create short URLs');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/urls', { originalUrl });
      setShortUrl(response.data.shortUrl);
      toast.success('URL shortened successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to shorten URL';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Shorten Your URLs
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create short, memorable links that are easy to share and track. 
          Perfect for social media, marketing campaigns, and personal use.
        </p>
        
        {!isAuthenticated && (
          <div className="flex justify-center space-x-4 mb-12">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* URL Shortener Form */}
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <LinkIcon className="text-primary-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-800">
              Create Short URL
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your long URL
              </label>
              <input
                type="url"
                id="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/very-long-url-that-needs-shortening"
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !isAuthenticated}
              className={`w-full btn-primary ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating...' : 'Shorten URL'}
            </button>

            {!isAuthenticated && (
              <p className="text-sm text-gray-600 text-center">
                <Link to="/login" className="text-primary-600 hover:underline">
                  Sign in
                </Link>{' '}
                to create short URLs and track their performance.
              </p>
            )}
          </form>

          {shortUrl && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ExternalLink size={20} className="text-green-600" />
                  <span className="text-green-800 font-medium">Your short URL:</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                >
                  <Copy size={16} />
                  <span className="text-sm">Copy</span>
                </button>
              </div>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-green-700 hover:text-green-800 break-all"
              >
                {shortUrl}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our URL Shortener?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LinkIcon className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Simply paste your long URL and get a short, shareable link instantly.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Performance</h3>
            <p className="text-gray-600">
              Monitor clicks, analyze traffic, and understand your audience better.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">
              Your links are safe with us. We use industry-standard security practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 