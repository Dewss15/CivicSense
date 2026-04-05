import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const Issues = ({ issues = [], onDelete, onToggleStatus, onCreate }) => {
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, issueId: null, issueTitle: '' });
  const [createModal, setCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    location: '',
  });
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
  });

  // Filter issues
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      issue.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || issue.status === filters.status;
    const matchesPriority = filters.priority === 'all' || issue.priority === filters.priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || formData.title.trim().length < 5) {
      return alert('Title must be at least 5 characters');
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      return alert('Description must be at least 10 characters');
    }
    try {
      await onCreate(formData);
      setCreateModal(false);
      setFormData({ title: '', description: '', priority: 'Medium', location: '' });
    } catch (err) {
      // Error already handled by parent toast
    }
  };

  const confirmDelete = () => {
    onDelete(deleteModal.issueId);
    setDeleteModal({ isOpen: false, issueId: null, issueTitle: '' });
  };

  const statusColors = {
    'Open': 'info',
    'In Progress': 'warning',
    'Resolved': 'success',
  };

  const priorityColors = {
    'Low': 'success',
    'Medium': 'warning',
    'High': 'danger',
    'Critical': 'danger',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
            All Issues
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredIssues.length} of {issues.length} issues
          </p>
        </div>
        <Button onClick={() => setCreateModal(true)} size="lg">
          ➕ Create Issue
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="🔍 Search issues..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </Card>

      {/* Issues Grid */}
      {filteredIssues.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">No issues found</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {filters.search || filters.status !== 'all' || filters.priority !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first issue to get started!'}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredIssues.map((issue, index) => (
            <Card 
              key={issue._id} 
              hover 
              className="p-6 animate-slide-up"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Issue Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant={statusColors[issue.status]}>{issue.status}</Badge>
                  <Badge variant={priorityColors[issue.priority]}>{issue.priority}</Badge>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {issue.title}
              </h3>

              {/* AI Summary */}
              {issue.aiSummary && (
                <p className="text-sm italic text-primary-600 dark:text-primary-400 mb-1 flex items-center gap-1">
                  <span>✨</span> {issue.aiSummary}
                </p>
              )}

              {/* AI Tags */}
              {(issue.aiPriority || issue.aiCategory) && (
                <div className="flex items-center gap-2 mb-3">
                  {issue.aiCategory && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                      🏷️ {issue.aiCategory}
                    </span>
                  )}
                  {issue.aiPriority && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                      🤖 AI: {issue.aiPriority}
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {issue.description}
              </p>

              {/* Metadata */}
              {(issue.location || issue.createdBy) && (
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-slate-700">
                  {issue.location && <span>📍 {issue.location}</span>}
                  {issue.createdBy && <span>👤 {issue.createdBy.name}</span>}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => onToggleStatus(issue._id)}
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                >
                  {issue.status === 'Open' ? '▶️ Start' : issue.status === 'In Progress' ? '✅ Resolve' : '🔄 Reopen'}
                </Button>
                <Button
                  onClick={() => setDeleteModal({ isOpen: true, issueId: issue._id, issueTitle: issue.title })}
                  variant="danger"
                  size="sm"
                >
                  🗑️
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, issueId: null, issueTitle: '' })}
        onConfirm={confirmDelete}
        title="Delete Issue"
        variant="danger"
        confirmText="Delete"
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete <strong>"{deleteModal.issueTitle}"</strong>?
          This action cannot be undone.
        </p>
      </Modal>

      {/* Create Issue Modal */}
      <Modal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        title="Create New Issue"
        confirmText="Create"
        onConfirm={handleSubmit}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Brief summary of the issue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Detailed description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🟠 High</option>
                <option value="Critical">🔴 Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Where?"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Issues;
