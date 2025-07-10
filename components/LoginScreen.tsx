import { useNavigation } from '@react-navigation/native'; // 导入导航钩子
import React, { useState } from 'react';
import {
  Alert,
  I18nManager,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Checkbox } from 'react-native-paper';
interface LoginProps {}

const LoginScreen: React.FC<LoginProps> = () => {
  const navigation = useNavigation(); // 获取导航对象
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [language, setLanguage] = useState('zh'); // 'zh', 'en', 'ja'

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    // 登录成功后导航到首页
    navigation.navigate('Home');
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'zh' ? 'en' : language === 'en' ? 'ja' : 'zh';
    setLanguage(newLanguage);
    if (newLanguage === 'en' || newLanguage === 'ja') {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
  };

  const getText = () => {
    switch (language) {
      case 'en':
        return {
          username: 'Username',
          password: 'Password',
          rememberPassword: 'Remember Password',
          login: 'Login',
          customerService: 'Customer Service',
          language: 'English'
        };
      case 'ja':
        return {
          username: 'ユーザー名',
          password: 'パスワード',
          rememberPassword: 'パスワードを覚える',
          login: 'ログイン',
          customerService: 'カスタマーサービス',
          language: '日本語'
        };
      default:
        return {
          username: '用户名',
          password: '密码',
          rememberPassword: '记住密码',
          login: '登录',
          customerService: '客服电话',
          language: '中文'
        };
    }
  };

  const text = getText();

  return (
    <View style={styles.container}>
       <StatusBar backgroundColor="blue" barStyle={'dark-content'} />
      <Image
        source={require('../assets/logo.png')} // 替换为实际logo图片路径
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder={text.username}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder={text.password}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={rememberPassword}
          onValueChange={setRememberPassword}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>{text.rememberPassword}</Text>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>{text.login}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
        <Text style={styles.languageButtonText}>{text.language}</Text>
      </TouchableOpacity>
      <Text style={styles.customerService}>{text.customerService}</Text>
      <Text style={styles.version}>V1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxLabel: {
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  languageButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  languageButtonText: {
    color: 'white',
    fontSize: 16,
  },
  customerService: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  version: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

export default LoginScreen;