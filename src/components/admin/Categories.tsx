import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Plus, Edit, Trash2, Settings } from 'lucide-react';
import AddCategoryModal from './AddCategoryModal';

const Categories = () => {
  const [newCategory, setNewCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = [
    {
      id: 1,
      name: 'Plumbing',
      description: 'Water pipes, drainage, and plumbing fixtures',
      providers: 45,
      services: 128,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Electrical',
      description: 'Electrical installations, repairs, and maintenance',
      providers: 38,
      services: 95,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Gardening',
      description: 'Lawn care, landscaping, and garden maintenance',
      providers: 52,
      services: 156,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Painting',
      description: 'Interior and exterior painting services',
      providers: 29,
      services: 78,
      status: 'Active'
    },
    {
      id: 5,
      name: 'Cleaning',
      description: 'House cleaning and maintenance services',
      providers: 67,
      services: 203,
      status: 'Active'
    },
    {
      id: 6,
      name: 'Carpentry',
      description: 'Wood work, furniture repair, and custom carpentry',
      providers: 23,
      services: 67,
      status: 'Inactive'
    },
  ];

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      console.log('Adding category:', newCategory);
      setNewCategory('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Categories</h1>
          <p className="text-gray-600">Manage service categories and subcategories</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-brand-600 hover:bg-brand-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Add New Category */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Add Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter category name..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddCategory} className="bg-brand-600 hover:bg-brand-700">
              <Plus className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Total Categories</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">11</p>
              <p className="text-sm text-gray-600">Active Categories</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">254</p>
              <p className="text-sm text-gray-600">Total Providers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">727</p>
              <p className="text-sm text-gray-600">Total Services</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <Badge variant={category.status === 'Active' ? 'default' : 'secondary'}>
                  {category.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Providers:</span>
                  <span className="font-medium">{category.providers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Services:</span>
                  <span className="font-medium">{category.services}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories
              .sort((a, b) => b.services - a.services)
              .slice(0, 5)
              .map((category, index) => (
                <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-gray-600">{category.providers} providers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{category.services}</p>
                    <p className="text-sm text-gray-600">services</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <AddCategoryModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  );
};

export default Categories;
