import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Dashboard = ({ issues = [] }) => {
  // Calculate statistics
  const stats = {
    total: issues.length,
    open: issues.filter(i => i.status === 'Open').length,
    inProgress: issues.filter(i => i.status === 'In Progress').length,
    resolved: issues.filter(i => i.status === 'Resolved').length,
    critical: issues.filter(i => i.priority === 'Critical').length,
    high: issues.filter(i => i.priority === 'High').length,
  };

  const statCards = [
    { label: 'Total Issues', value: stats.total, icon: '📊', color: 'from-blue-500 to-blue-600', textColor: 'text-blue-600 dark:text-blue-400' },
    { label: 'Open', value: stats.open, icon: '🔵', color: 'from-indigo-500 to-indigo-600', textColor: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'In Progress', value: stats.inProgress, icon: '🟡', color: 'from-yellow-500 to-yellow-600', textColor: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'Resolved', value: stats.resolved, icon: '✅', color: 'from-green-500 to-green-600', textColor: 'text-green-600 dark:text-green-400' },
    { label: 'Critical', value: stats.critical, icon: '🔴', color: 'from-red-500 to-red-600', textColor: 'text-red-600 dark:text-red-400' },
    { label: 'High Priority', value: stats.high, icon: '🟠', color: 'from-orange-500 to-orange-600', textColor: 'text-orange-600 dark:text-orange-400' },
  ];

  // Recent issues
  const recentIssues = issues.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
          Welcome to CivicSense
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Track and manage civic infrastructure issues efficiently
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card 
            key={stat.label} 
            hover 
            className="p-6 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`text-5xl opacity-80`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Issues */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Issues
          </h2>
          <Badge variant="primary">{recentIssues.length} issues</Badge>
        </div>

        {recentIssues.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No issues yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Create your first issue to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentIssues.map((issue) => {
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
                <div
                  key={issue._id}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {issue.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {issue.aiSummary ? (
                          <span className="italic text-primary-600 dark:text-primary-400">✨ {issue.aiSummary}</span>
                        ) : (
                          issue.description
                        )}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={statusColors[issue.status]} size="sm">
                          {issue.status}
                        </Badge>
                        <Badge variant={priorityColors[issue.priority]} size="sm">
                          {issue.priority}
                        </Badge>
                        {issue.aiCategory && (
                          <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                            🏷️ {issue.aiCategory}
                          </span>
                        )}
                        {issue.location && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            📍 {issue.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
