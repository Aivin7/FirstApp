import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createOrder } from '../services/api';
import { Order } from '../types';

const CreateOrder: React.FC = () => {
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<Omit<Order, 'id' | 'status' | 'createTime'>>({
    product: '',
    amount: '',
    quantity: '1',
    remark: '',
  });

  const handleInputChange = (key: keyof typeof orderInfo, value: string) => {
    setOrderInfo(prev => ({ ...prev, [key]: value }));
  };

  const submitOrder = async () => {
    if (!orderInfo.product || !orderInfo.amount) {
      Alert.alert('错误', '请填写产品名称和金额');
      return;
    }

    try {
      const response = await createOrder(orderInfo);
      if (response.success) {
        Alert.alert('成功', '订单创建成功');
        router.push('order-management');
      } else {
        Alert.alert('失败', response.message || '创建订单失败');
      }
    } catch (error) {
      Alert.alert('错误', '请求失败，请重试');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>创建订单</Text>
      
      <TextInput
        style={styles.input}
        placeholder="产品名称"
        value={orderInfo.product}
        onChangeText={val => handleInputChange('product', val)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="金额"
        keyboardType="numeric"
        value={orderInfo.amount}
        onChangeText={val => handleInputChange('amount', val)}
      />
      
      <Picker
        selectedValue={orderInfo.quantity}
        style={styles.picker}
        onValueChange={val => handleInputChange('quantity', val)}
      >
        {[1, 2, 3, 4, 5].map(num => (
          <Picker.Item key={num} label={`${num}件`} value={num.toString()} />
        ))}
      </Picker>
      
      <TextInput
        style={styles.input}
        placeholder="备注（可选）"
        multiline
        numberOfLines={3}
        value={orderInfo.remark}
        onChangeText={val => handleInputChange('remark', val)}
      />
      
      <View style={styles.buttonGroup}>
        <Button title="取消" onPress={() => router.back()} />
        <Button title="提交" onPress={submitOrder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
});

export default CreateOrder;