import useAuth from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Profile: React.FC = () => {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      router.replace('login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>用户信息加载失败</Text>
        <Button title="重新登录" onPress={() => router.replace('login')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>个人中心</Text>
      
      <View style={styles.userInfo}>
        <Text style={styles.infoItem}>用户名：{user.username}</Text>
        <Text style={styles.infoItem}>商户ID：{user.merchantId}</Text>
        <Text style={styles.infoItem}>
          账户状态：
          <Text style={{ color: user.status === 'normal' ? 'green' : 'red' }}>
            {user.status === 'normal' ? '正常' : '异常'}
          </Text>
        </Text>
        <Text style={styles.infoItem}>注册时间：{user.registerTime}</Text>
        <Text style={styles.infoItem}>联系电话：{user.phone}</Text>
      </View>

      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('提示', '账户设置功能开发中')}>
        <Text>账户设置</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('提示', '帮助中心功能开发中')}>
        <Text>帮助中心</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('关于我们', 'Dragonpass Merchant System v1.0')}>
        <Text>关于我们</Text>
      </TouchableOpacity>

      <Button 
        title="退出登录" 
        onPress={logout} 
        color="#ff4d4f" 
        style={styles.logoutBtn}
      />
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
    marginBottom: 30,
    textAlign: 'center',
  },
  userInfo: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 30,
  },
  infoItem: {
    marginBottom: 8,
    fontSize: 16,
  },
  settingItem: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  logoutBtn: {
    marginTop: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Profile;