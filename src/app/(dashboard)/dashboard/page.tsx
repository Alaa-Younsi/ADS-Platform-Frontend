'use client';

import { useEffect, useState } from 'react';
import { StatCard, Card } from '@/components/ui/Card';
import { TrendingUp, MousePointerClick, Eye, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '@/lib/api';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, analyticsRes] = await Promise.all([
        api.get('/campaigns/stats'),
        api.get('/analytics/overview'),
      ]);
      setStats(statsRes.data.data);
      setAnalytics(analyticsRes.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here&apos;s an overview of your campaigns.
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
          title="CTR"
          value={`${overview.ctr || 0}%`}
          icon={<TrendingUp className="w-6 h-6 text-primary-600" />}
        />
        <StatCard
          title="Conversions"
          value={formatNumber(overview.conversions || 0)}
          icon={<DollarSign className="w-6 h-6 text-primary-600" />}
        />
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Campaigns" className="text-center">
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {stats?.totalCampaigns || 0}
          </p>
        </Card>
        <Card title="Active Campaigns" className="text-center">
          <p className="text-4xl font-bold text-green-600">
            {stats?.activeCampaigns || 0}
          </p>
        </Card>
        <Card title="Total Budget" className="text-center">
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(stats?.totalBudget || 0)}
          </p>
        </Card>
      </div>

      {/* Top Campaigns */}
      {analytics?.topCampaigns && analytics.topCampaigns.length > 0 && (
        <Card title="Top Performing Campaigns">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Campaign
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Impressions
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Clicks
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Conversions
                  </th>
                </tr>
              </thead>
              <tbody>
                {analytics.topCampaigns.map((campaign: any) => (
                  <tr
                    key={campaign._id}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                      {campaign.campaign?.name || 'Unknown'}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-gray-100">
                      {formatNumber(campaign.impressions)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-gray-100">
                      {formatNumber(campaign.clicks)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-gray-100">
                      {formatNumber(campaign.conversions)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Performance Overview">
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p>Analytics data will appear here once campaigns generate traffic</p>
          </div>
        </Card>
        <Card title="Budget Utilization">
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p>Budget tracking will appear here</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
