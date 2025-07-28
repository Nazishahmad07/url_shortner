import React, { useState, useEffect } from 'react';
import { Link as LinkIcon, Copy, ExternalLink, Trash2, Search, Plus } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUrl, setNewUrl] = useState({
    originalUrl: '',
    title: '',
    description: '',
    tags: ''
  });

  useEffect(() => {
    fetchUrls();
    fetchStats();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get('/api/urls');
      setUrls(response.data.urls);
    } catch (error) {
      toast.error('Failed to fetch URLs');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/profile/stats');
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUrl = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/urls', newUrl);
      setUrls([response.data, ...urls]);
      setNewUrl({ originalUrl: '', title: '', description: '', tags: '' });
      setShowCreateForm(false);
      toast.success('URL created successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create URL';
      toast.error(message);
    }
  };

  const handleDeleteUrl = async (id) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      try {
        await axios.delete(`/api/urls/${id}`);
        setUrls(urls.filter(url => url._id !== id));
        toast.success('URL deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete URL');
      }
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard!');
  };

  const filteredUrls = urls.filter(url =>
    url.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Create URL</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <LinkIcon className="text-primary-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total URLs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUrls || 0}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <LinkIcon className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active URLs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeUrls || 0}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ExternalLink className="text-blue-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalClicks || 0}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Search className="text-purple-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Clicks</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalUrls > 0 ? Math.round(stats.totalClicks / stats.totalUrls) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Create Form */}
      <div className="card mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search URLs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Create URL Form */}
      {showCreateForm && (
        <div className="card mb-6">
          <h3 className="text-lg font-semibold mb-4">Create New URL</h3>
          <form onSubmit={handleCreateUrl} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original URL
              </label>
              <input
                type="url"
                value={newUrl.originalUrl}
                onChange={(e) => setNewUrl({ ...newUrl, originalUrl: e.target.value })}
                placeholder="https://example.com"
                className="input-field"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  value={newUrl.title}
                  onChange={(e) => setNewUrl({ ...newUrl, title: e.target.value })}
                  placeholder="My URL Title"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (Optional)
                </label>
                <input
                  type="text"
                  value={newUrl.tags}
                  onChange={(e) => setNewUrl({ ...newUrl, tags: e.target.value })}
                  placeholder="tag1, tag2, tag3"
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={newUrl.description}
                onChange={(e) => setNewUrl({ ...newUrl, description: e.target.value })}
                placeholder="Description of this URL"
                className="input-field"
                rows={3}
              />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">
                Create URL
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* URLs List */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Your URLs</h3>
        {filteredUrls.length === 0 ? (
          <div className="text-center py-8">
            <LinkIcon className="mx-auto text-gray-400" size={48} />
            <p className="text-gray-500 mt-2">No URLs found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUrls.map((url) => (
              <div key={url._id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">
                        {url.title || 'Untitled URL'}
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        url.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {url.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 break-all">
                      {url.originalUrl}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Short: {url.shortUrl}</span>
                      <span>Clicks: {url.clicks}</span>
                      <span>Created: {new Date(url.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(url.shortUrl)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="Copy URL"
                    >
                      <Copy size={16} />
                    </button>
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="Visit URL"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <button
                      onClick={() => handleDeleteUrl(url._id)}
                      className="p-2 text-red-400 hover:text-red-600"
                      title="Delete URL"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 