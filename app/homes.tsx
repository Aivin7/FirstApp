import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';

const Homes: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dragonpass Merchant System</Text>
      
      {user && <Text style={styles.welcome}>欢迎，{user.username}</Text>}
      
      <View style={styles.buttonContainer}>
        <Button 
          title="创建订单" 
          onPress={() => router.push('create-order')} 
        />
        
        {/* <Button 
          title="扫码/输码验证" 
          onPress={() => router.push('scan-verify')} 
        /> */}
        
        <Button 
          title="订单管理1" 
          onPress={() => router.push('order-management')} 
        />
        
        <Button 
          title="个人中心" 
          onPress={() => router.push('profile')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 40,
    color: '#2C2C2E',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
});

export default Homes;