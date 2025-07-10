import * as BarCodeScanner from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { verifyCode } from '../services/api';

const ScanVerify: React.FC = () => {
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState('');
  const [hasPermission, setHasPermission] = useState<BarCodeScanner.PermissionStatus | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status);
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeScanner.BarCodeScannedResult) => {
    setScanned(true);
    setCode(data);
    verifyCodeAction(data);
  };

  const verifyCodeAction = async (inputCode: string) => {
    if (!inputCode) {
      Alert.alert('错误', '请输入或扫描验证码');
      return;
    }

    try {
      setVerifying(true);
      const response = await verifyCode(inputCode);
      if (response.success) {
        Alert.alert(
          response.data.valid ? '验证成功' : '验证失败',
          response.data.message || (response.data.valid ? '码值有效' : '无效码值')
        );
      } else {
        Alert.alert('错误', response.message || '验证请求失败');
      }
    } catch (error) {
      Alert.alert('错误', '网络请求失败');
    } finally {
      setVerifying(false);
    }
  };

  if (hasPermission === null) {
    return <Text style={styles.statusText}>请求相机权限...</Text>;
  }
  if (hasPermission === 'denied') {
    return <Text style={styles.statusText}>需要相机权限才能扫码</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>扫码/输码验证</Text>

      {/* 扫码区域 */}
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <TouchableOpacity 
            style={styles.rescanBtn} 
            onPress={() => setScanned(false)}
          >
            <Text>再次扫码</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 手动输入区域 */}
      <View style={styles.manualInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="手动输入码值"
          value={code}
          onChangeText={setCode}
        />
        <Button
          title={verifying ? '验证中...' : '手动验证'}
          onPress={() => verifyCodeAction(code)}
          disabled={verifying}
        />
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
  scannerContainer: {
    height: 300,
    width: '100%',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
    overflow: 'hidden',
  },
  rescanBtn: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 4,
  },
  manualInputContainer: {
    gap: 10,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  statusText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ScanVerify;