'use client';

import { useEffect, useState } from 'react';
import { Card, StatCard } from '@/components/ui/Card';
import { Eye, MousePointerClick, TrendingUp, DollarSign } from 'lucide-react';
import api from '@/lib/api';
import { formatNumber } from '@/lib/utils';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/analytics/overview');
      setAnalytics(response.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const overview = analytics?.overview || {};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Comprehensive analytics across all your campaigns
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Impressions"
          value={formatNumber(overview.impressions || 0)}
          icon={<Eye className="w-6 h-6 text-primary-600" />}
        />
        <StatCard
          title="Total Clicks"
          value={formatNumber(overview.clicks || 0)}
          icon={<MousePointerClick className="w-6 h-6 text-primary-600" />}
        />
        <StatCard
          title="Average CTR"
          value={`${overview.ctr || 0}%`}
          icon={<TrendingUp className="w-6 h-6 text-primary-600" />}
        />
        <StatCard
          title="Total Conversions"
          value={formatNumber(overview.conversions || 0)}
          icon={<DollarSign className="w-6 h-6 text-primary-600" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Performance Metrics">
          <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p>Generate analytics data by creating campaigns and simulating traffic</p>
          </div>
        </Card>

        <Card title="Conversion Funnel">
          <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p>Conversion tracking will appear here</p>
          </div>
        </Card>
      </div>

      {/* Additional Info */}
      <Card title="Quick Actions">
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            To generate analytics data for your campaigns:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Create a campaign from the Campaigns page</li>
            <li>Use the API to simulate analytics events</li>
            <li>View real-time analytics updates here</li>
          </ol>
        </div>
      </Card>
    </div>
  );
}
