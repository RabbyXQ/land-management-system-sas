import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, List, Typography, Input, Select, Slider, Space, Spin, message, Checkbox, Pagination } from 'antd';
import { EyeOutlined, SearchOutlined, FilterOutlined, DeleteOutlined } from '@ant-design/icons';
import AppLayout from '../../Layouts/AppLayout';
import axios from 'axios';
import AuthGuard from '../../Components/AuthGuard';

const { Title } = Typography;
const { Option } = Select;

interface LandProps {
  id: number;
  title: string;
  name: string;
  location: string;
  size: string;
  owner: string;
  land_type: string;
  market_value: string;
  notes?: string;
}

const Lands: React.FC = () => {
  const [lands, setLands] = useState<LandProps[]>([]);
  const [filteredLands, setFilteredLands] = useState<LandProps[]>([]);
  const [selectedLands, setSelectedLands] = useState<Set<number>>(new Set());
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [ownerFilter, setOwnerFilter] = useState<string | undefined>(undefined);
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<number[]>([0, 300000]);
  const [sizeRange, setSizeRange] = useState<number[]>([0, 8000]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await axios.get('http://localhost:4000/lands/');
        setLands(response.data);
        setFilteredLands(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lands:', error);
        message.error('Failed to load lands data.');
        setLoading(false);
      }
    };

    fetchLands();
  }, []);

  // Extract owners, types, and prices from lands
  const owners = Array.from(new Set(lands.map(land => land.owner)));
  const types = Array.from(new Set(lands.map(land => land.land_type)));

  // Safely parse price and size
  const safeParseNumber = (value: string | undefined): number => {
    return value ? parseInt(value.replace(/[^0-9]/g, ''), 10) || 0 : 0;
  };

  const minPrice = Math.min(...lands.map(land => safeParseNumber(land.market_value)));
  const maxPrice = Math.max(...lands.map(land => safeParseNumber(land.market_value)));
  const minSize = Math.min(...lands.map(land => safeParseNumber(land.size)));
  const maxSize = Math.max(...lands.map(land => safeParseNumber(land.size)));

  // Handle filtering
  const handleFilter = () => {
    let filtered = lands;

    if (searchText) {
      filtered = filtered.filter(land =>
        land.title.toLowerCase().includes(searchText.toLowerCase()) ||
        land.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (ownerFilter) {
      filtered = filtered.filter(land => land.owner === ownerFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(land => land.land_type === typeFilter);
    }

    filtered = filtered.filter(land => {
      const price = safeParseNumber(land.market_value);
      const size = safeParseNumber(land.size);
      return price >= priceRange[0] && price <= priceRange[1] && size >= sizeRange[0] && size <= sizeRange[1];
    });

    setFilteredLands(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [searchText, ownerFilter, typeFilter, priceRange, sizeRange]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/lands/${id}`);
      message.success('Land deleted successfully.');
      setLands(lands.filter(land => land.id !== id));
      setFilteredLands(filteredLands.filter(land => land.id !== id));
      setSelectedLands(new Set(selectedLands));
    } catch (error) {
      console.error('Error deleting land:', error);
      message.error('Failed to delete land.');
    }
  };

  const handleBulkDelete = async () => {
    try {
      for (const id of Array.from(selectedLands)) {
        await axios.delete(`http://localhost:4000/lands/${id}`);
      }
      message.success('Selected lands deleted successfully.');
      setLands(lands.filter(land => !selectedLands.has(land.id)));
      setFilteredLands(filteredLands.filter(land => !selectedLands.has(land.id)));
      setSelectedLands(new Set());
    } catch (error) {
      console.error('Error deleting lands:', error);
      message.error('Failed to delete selected lands.');
    }
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const newSelectedLands = new Set(selectedLands);
    if (checked) {
      newSelectedLands.add(id);
    } else {
      newSelectedLands.delete(id);
    }
    setSelectedLands(newSelectedLands);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Paginate filtered lands
  const paginatedLands = filteredLands.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: 'auto', marginTop: '50px' }} />;
  }

  return (
    <AuthGuard>
      <div style={{ padding: '24px' }}>
        <Title level={2} style={{ marginBottom: '24px' }}>Lands</Title>

        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="link"
            icon={<SearchOutlined />}
            onClick={() => setSearchVisible(!searchVisible)}
          >
            Search
          </Button>

          {searchVisible && (
            <Input.Search
              placeholder="Search by title or name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleFilter}
              style={{ width: '300px', marginLeft: '16px' }}
            />
          )}

          <Button
            type="link"
            icon={<FilterOutlined />}
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            Filter
          </Button>

          {filtersVisible && (
            <div style={{ marginTop: '16px' }}>
              <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Select
                  placeholder="Filter by owner"
                  style={{ width: '200px' }}
                  onChange={(value) => setOwnerFilter(value)}
                  allowClear
                >
                  {owners.map(owner => (
                    <Option key={owner} value={owner}>{owner}</Option>
                  ))}
                </Select>

                <Select
                  placeholder="Filter by type"
                  style={{ width: '200px' }}
                  onChange={(value) => setTypeFilter(value)}
                  allowClear
                >
                  {types.map(type => (
                    <Option key={type} value={type}>{type}</Option>
                  ))}
                </Select>

                <div>
                  <span>Price Range: </span>
                  <Slider
                    range
                    value={priceRange}
                    min={minPrice}
                    max={maxPrice}
                    onChange={(value) => setPriceRange(value as number[])}
                    style={{ width: '300px' }}
                  />
                  <span>{`$${priceRange[0]} - $${priceRange[1]}`}</span>
                </div>

                <div>
                  <span>Size Range: </span>
                  <Slider
                    range
                    value={sizeRange}
                    min={minSize}
                    max={maxSize}
                    onChange={(value) => setSizeRange(value as number[])}
                    style={{ width: '300px' }}
                  />
                  <span>{`${sizeRange[0]} - ${sizeRange[1]} sq ft`}</span>
                </div>
              </Space>
            </div>
          )}

          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={handleBulkDelete}
            disabled={selectedLands.size === 0}
            style={{ marginTop: '16px' }}
          >
            Delete Selected
          </Button>
        </div>

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            current: currentPage,
            pageSize,
            total: filteredLands.length,
            onChange: handlePageChange,
          }}
          dataSource={paginatedLands}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Checkbox
                  onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                  checked={selectedLands.has(item.id)}
                />,
                <Link to={`/lands/${item.id}`}><Button icon={<EyeOutlined />}>View</Button></Link>,
                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(item.id)}>Delete</Button>,
              ]}
              style={{ background: '#fff', borderRadius: '8px', marginBottom: '16px' }}
            >
              <List.Item.Meta
                title={<Link to={`/lands/${item.id}`}>{item.title}</Link>}
                description={item.location}
              />
              <div>
                <strong>Size:</strong> {item.size} sq ft
              </div>
              <div>
                <strong>Owner:</strong> {item.owner}
              </div>
              <div>
                <strong>Market Value:</strong> ${item.market_value}
              </div>
              <div>
                <strong>Type:</strong> {item.land_type}
              </div>
              {item.notes && (
                <div>
                  <strong>Notes:</strong> {item.notes}
                </div>
              )}
            </List.Item>
          )}
        />
      </div>
    </AuthGuard>
  );
};

export default Lands;
