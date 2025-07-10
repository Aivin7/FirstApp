import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getOrderList } from '../services/api';
import { Order, OrderFilterParams } from '../types';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<OrderFilterParams & { status: 'all' | 'pending' | 'completed', dateRange: 'all' | 'today' | 'week' | 'month' }>({
    status: 'all',
    keyword: '',
    dateRange: 'all',
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // 构建筛选参数（排除"all"状态）
      const params: OrderFilterParams = {};
      if (filters.status !== 'all') params.status = filters.status;
      if (filters.dateRange !== 'all') params.dateRange = filters.dateRange;
      if (filters.keyword) params.keyword = filters.keyword;

      const response = await getOrderList(params);
      setOrders(response.success ? response.data.orders : []);
    } catch (error) {
      Alert.alert('错误', '获取订单失败');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderTitle}>订单号：{item.id}</Text>
      <Text>产品：{item.product}</Text>
      <Text>金额：¥{item.amount}</Text>
      <Text>创建时间：{item.createTime}</Text>
      <Text style={[styles.status, { color: item.status === 'pending' ? '#ff9800' : '#4caf50' }]}>
        状态：{item.status === 'pending' ? '待处理' : '已完成'}
      </Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>订单管理1</Text>

      {/* 筛选区域 */}
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={filters.status}
          style={styles.picker}
          onValueChange={val => handleFilterChange('status', val)}
        >
          <Picker.Item label="全部状态" value="all" />
          <Picker.Item label="待处理" value="pending" />
          <Picker.Item label="已完成" value="completed" />
        </Picker>

        <Picker
          selectedValue={filters.dateRange}
          style={styles.picker}
          onValueChange={val => handleFilterChange('dateRange', val)}
        >
          <Picker.Item label="全部时间" value="all" />
          <Picker.Item label="今日" value="today" />
          <Picker.Item label="本周" value="week" />
          <Picker.Item label="本月" value="month" />
        </Picker>

        <TextInput
          style={styles.searchInput}
          placeholder="搜索订单号/产品名"
          value={filters.keyword}
          onChangeText={val => handleFilterChange('keyword', val)}
        />

        <TouchableOpacity style={styles.searchBtn} onPress={fetchOrders}>
          <Text>搜索</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.refreshBtn} onPress={fetchOrders}>
        <Text>刷新订单1</Text>
      </TouchableOpacity>

      {orders.length === 0 ? (
        <Text style={styles.emptyText}>暂无符合条件的订单</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={renderOrderItem}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  filterContainer: {
    gap: 10,
    marginBottom: 15,
  },
  picker: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchBtn: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  refreshBtn: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  orderItem: {
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
  },
  orderTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    marginTop: 5,
    fontSize: 14,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
});

export default OrderManagement;