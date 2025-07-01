import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Search, Plus, Edit, Trash2, Eye, Star } from 'lucide-react';
import AddProviderModal from './AddProviderModal';

const ServiceProviders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const providers = [
    {
      id: 1,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234 567 8900',
      service: 'Plumbing',
      rating: 4.9,
      bookings: 156,
      status: 'Active',
      joinDate: '2023-01-15',
      verified: true
    },
    {
      id: 2,
      name: 'Tom Brown',
      email: 'tom@example.com',
      phone: '+1 234 567 8901',
      service: 'Electrical',
      rating: 4.8,
      bookings: 142,
      status: 'Active',
      joinDate: '2023-02-20',
      verified: true
    },
    {
      id: 3,
      name: 'Lisa Green',
      email: 'lisa@example.com',
      phone: '+1 234 567 8902',
      service: 'Gardening',
      rating: 4.7,
      bookings: 128,
      status: 'Inactive',
      joinDate: '2023-03-10',
      verified: false
    },
    {
      id: 4,
      name: 'Chris White',
      email: 'chris@example.com',
      phone: '+1 234 567 8903',
      service: 'Painting',
      rating: 4.9,
      bookings: 134,
      status: 'Active',
      joinDate: '2023-01-25',
      verified: true
    },
  ];

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Providers</h1>
          <p className="text-gray-600">Manage all registered service providers</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-brand-600 hover:bg-brand-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Provider
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-gray-600">Total Providers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">112</p>
              <p className="text-sm text-gray-600">Active Providers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">15</p>
              <p className="text-sm text-gray-600">Pending Approval</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">4.8</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>All Service Providers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">{provider.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium">{provider.name}</p>
                          <p className="text-sm text-gray-600">{provider.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{provider.service}</Badge>
                    </TableCell>
                    <TableCell>{provider.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{provider.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{provider.bookings}</TableCell>
                    <TableCell>
                      <Badge variant={provider.status === 'Active' ? 'default' : 'secondary'}>
                        {provider.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{provider.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddProviderModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  );
};

export default ServiceProviders;
