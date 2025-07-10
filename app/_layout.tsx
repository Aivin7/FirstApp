// import { Stack } from 'expo-router';
// import React from 'react';

// const RootLayout: React.FC = () => {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ title: '首页' }} />
//       <Stack.Screen name="login" options={{ title: '登录' }} />
//       <Stack.Screen name="create-order" options={{ title: '创建订单' }} />
//       <Stack.Screen name="scan-verify" options={{ title: '扫码验证' }} />
//       <Stack.Screen name="order-management" options={{ title: '订单管理' }} />
//       <Stack.Screen name="profile" options={{ title: '个人中心' }} />
//     </Stack>
//   );
// };

// export default RootLayout;
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import HomeScreen from '../components/HomeScreen';
import LoginScreen from '../components/LoginScreen';
import Home from './home';


const Stack = createStackNavigator();

export default function Layout() {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      </Stack.Navigator>
    // </NavigationContainer>
  );
}