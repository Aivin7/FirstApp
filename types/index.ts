// 订单类型
export interface Order {
  id: string;
  product: string;
  amount: string;
  quantity: string;
  remark?: string;
  status: 'pending' | 'completed';
  createTime: string;
}

// 订单筛选参数
export interface OrderFilterParams {
  status?: 'pending' | 'completed';
  keyword?: string;
  dateRange?: 'today' | 'week' | 'month';
}

// 用户信息
export interface UserInfo {
  username: string;
  merchantId: string;
  status: 'normal' | 'abnormal';
  registerTime: string;
  phone: string;
}

// API响应通用格式
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 登录接口
export interface LoginParams {
  username: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  expireTime: string;
}

// 核销码验证
export interface VerifyCodeResponse {
  valid: boolean;
  message?: string;
}