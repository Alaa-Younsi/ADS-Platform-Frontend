'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Table, TableRow, TableCell } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/Badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import api from '@/lib/api';
import { Campaign } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await api.get('/campaigns');
      setCampaigns(response.data.data.campaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;

    try {
      await api.delete(`/campaigns/${id}`);
      setCampaigns(campaigns.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Failed to delete campaign');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your advertising campaigns
          </p>
        </div>
        <Link href="/campaigns/new">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            New Campaign
          </Button>
        </Link>
      </div>

      {/* Campaigns Table */}
      {campaigns.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No campaigns yet. Create your first campaign to get started!
            </p>
            <Link href="/campaigns/new">
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Create Campaign
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card>
          <Table headers={['Name', 'Status', 'Budget', 'Spent', 'Duration', 'Actions']}>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>
                  <Link
                    href={`/campaigns/${campaign.id}`}
                    className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    {campaign.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <StatusBadge status={campaign.status} />
                </TableCell>
                <TableCell>{formatCurrency(campaign.budget)}</TableCell>
                <TableCell>{formatCurrency(campaign.spent)}</TableCell>
                <TableCell>
                  {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Link href={`/campaigns/${campaign.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(campaign.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Card>
      )}
    </div>
  );
}
