import axios from 'axios';
import {
    ApiResponse,
    LoginParams,
    LoginResponse,
    Order,
    OrderFilterParams,
    UserInfo,
    VerifyCodeResponse
} from '../types';

const API_BASE_URL = 'https://api.example.com/dragonpass/merchant';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：添加token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：处理401错误
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      alert('登录已过期，请重新登录');
    }
    return Promise.reject(error);
  }
);

// 登录
export const login = (params: LoginParams): Promise<ApiResponse<LoginResponse>> => {
  return api.post('/login', params);
};

// 获取用户信息
export const getUserInfo = (): Promise<ApiResponse<UserInfo>> => {
  return api.get('/user/info');
};

// 创建订单
export const createOrder = (data: Omit<Order, 'id' | 'status' | 'createTime'>): Promise<ApiResponse<{ orderId: string }>> => {
  return api.post('/order/create', data);
};

// 获取订单列表
export const getOrderList = (params?: OrderFilterParams): Promise<ApiResponse<{ orders: Order[] }>> => {
  return api.get('/order/list', { params });
};

// 核销码验证
export const verifyCode = (code: string): Promise<ApiResponse<VerifyCodeResponse>> => {
  return api.post('/verify', { code });
};

export default api;