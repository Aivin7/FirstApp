import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../services/api';
import { UserInfo } from '../types';

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          router.replace('login');
          return;
        }

        const response = await getUserInfo();
        if (response.success) {
          setUser(response.data);
        } else {
          localStorage.removeItem('token');
          router.replace('login');
        }
      } catch (error) {
        localStorage.removeItem('token');
        router.replace('login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.replace('login');
  };

  return { user, loading, logout };
};

export default useAuth;