import React, { useState } from 'react';
import {
  Button,
  Badge,
  Modal,
  ModalBody,
  ModalFooter,
  StatCard,
  Table,
  SearchFilter,
  FormField,
  FormGrid,
  Input,
  Select,
  type Column,
  type FilterOption,
} from '../custom-component';
import { FaUsers, FaCheck, FaClock, FaExclamationTriangle } from 'react-icons/fa';

interface DemoData {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  email: string;
  role: string;
}

const ComponentDemo: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Sample data for table
  const sampleData: DemoData[] = [
    { id: '1', name: 'John Doe', status: 'active', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', status: 'inactive', email: 'jane@example.com', role: 'User' },
    { id: '3', name: 'Bob Johnson', status: 'pending', email: 'bob@example.com', role: 'User' },
  ];

  // Table columns
  const columns: Column<DemoData>[] = [
    {
      key: 'name',
      title: 'Name',
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'role',
      title: 'Role',
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <Badge variant={value as any}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Edit</Button>
          <Button size="sm" variant="destructive">Delete</Button>
        </div>
      ),
    },
  ];

  // Filter options
  const filterOptions: FilterOption[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      value: filters.status,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
      ],
    },
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      value: filters.role,
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ],
    },
  ];

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchValue('');
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Component Demo</h1>
        <p className="text-gray-600">Showcase of our reusable UI components</p>
      </div>

      {/* Buttons Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🔍</Button>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button icon={<FaUsers />}>With Icon</Button>
        </div>
      </section>

      {/* Badges Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Badge variant="active">Active</Badge>
          <Badge variant="inactive">Inactive</Badge>
          <Badge variant="pending">Pending</Badge>
          <Badge variant="approved">Approved</Badge>
          <Badge variant="cancelled">Cancelled</Badge>
        </div>
      </section>

      {/* StatCards Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Stat Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value="1,234"
            subtitle="Active users"
            icon={<FaUsers />}
            iconColor="primary"
          />
          <StatCard
            title="Completed Tasks"
            value="856"
            subtitle="This month"
            icon={<FaCheck />}
            iconColor="success"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Pending Items"
            value="42"
            subtitle="Awaiting review"
            icon={<FaClock />}
            iconColor="warning"
          />
          <StatCard
            title="Issues"
            value="7"
            subtitle="Need attention"
            icon={<FaExclamationTriangle />}
            iconColor="danger"
            trend={{ value: 5, isPositive: false }}
          />
        </div>
      </section>

      {/* Form Components Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Form Components</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <FormGrid columns={2}>
            <FormField label="First Name" required>
              <Input placeholder="Enter first name" />
            </FormField>
            
            <FormField label="Last Name" required>
              <Input placeholder="Enter last name" />
            </FormField>
            
            <FormField label="Email" error="Please enter a valid email">
              <Input type="email" placeholder="Enter email" error />
            </FormField>
            
            <FormField label="Role">
              <Select
                placeholder="Select role"
                options={[
                  { value: 'admin', label: 'Administrator' },
                  { value: 'user', label: 'User' },
                  { value: 'guest', label: 'Guest' },
                ]}
              />
            </FormField>
          </FormGrid>
        </div>
      </section>

      {/* Search Filter Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Search & Filter</h2>
        <SearchFilter
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search users..."
          filters={filterOptions}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
      </section>

      {/* Table Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Data Table</h2>
        <div className="bg-white rounded-lg border border-gray-200">
          <Table
            data={sampleData}
            columns={columns}
            emptyText="No users found"
            emptyIcon={<FaUsers />}
          />
        </div>
      </section>

      {/* Modal Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Modal</h2>
        <Button onClick={() => setShowModal(true)}>Open Modal</Button>
        
        <Modal
          open={showModal}
          onOpenChange={setShowModal}
          title="Demo Modal"
          description="This is a demonstration of our modal component"
        >
          <ModalBody>
            <p className="text-gray-600">
              This modal demonstrates the reusable modal component with proper styling
              and accessibility features powered by Radix UI.
            </p>
            
            <FormGrid columns={1} className="mt-4">
              <FormField label="Sample Input">
                <Input placeholder="Enter some text..." />
              </FormField>
            </FormGrid>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowModal(false)}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </section>
    </div>
  );
};

export default ComponentDemo;