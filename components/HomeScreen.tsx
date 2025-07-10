import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  const [timePeriod, setTimePeriod] = useState('today'); // 'today', 'yesterday', 'month'

  // 模拟数据
  const data = {
    today: {
      orders: 100,
      amount: 5000,
    },
    yesterday: {
      orders: 80,
      amount: 4000,
    },
    month: {
      orders: 2000,
      amount: 100000,
    },
  };

  const currentData = data[timePeriod];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>测试</Text>
      
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>扫一扫</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>编码验证</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>经营数据</Text>
        <View style={styles.timePeriodButtons}>
          <TouchableOpacity 
            style={[styles.timeButton, timePeriod === 'today' && styles.activeTimeButton]}
            onPress={() => setTimePeriod('today')}
          >
            <Text style={styles.timeButtonText}>今天</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.timeButton, timePeriod === 'yesterday' && styles.activeTimeButton]}
            onPress={() => setTimePeriod('yesterday')}
          >
            <Text style={styles.timeButtonText}>昨天</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.timeButton, timePeriod === 'month' && styles.activeTimeButton]}
            onPress={() => setTimePeriod('month')}
          >
            <Text style={styles.timeButtonText}>本月</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataValue}>{currentData.orders}</Text>
          <Text style={styles.dataLabel}>订单 (笔)</Text>
        </View>
      </View>

      {/* <View style={styles.bottomTabs}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>首页</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>订单</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>我的</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timePeriodButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timeButton: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeTimeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  timeButtonText: {
    color: '#000',
  },
  activeTimeButtonText: {
    color: '#fff',
  },
  dataContainer: {
    alignItems: 'center',
  },
  dataValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dataLabel: {
    fontSize: 16,
    color: '#666',
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f8f8f8',
    paddingVertical: 8,
  },
  tabButton: {
    padding: 8,
  },
  tabButtonText: {
    fontSize: 16,
  },
});

export default HomeScreen;