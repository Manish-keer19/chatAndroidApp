import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setData(JSON.parse(value)); // Parse JSON if the value is found
        }
      } catch (e) {
        setError('Error fetching data from AsyncStorage');
        console.error('Error fetching data from AsyncStorage:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  return {data, loading, error};
};

export default useAsyncStorage;
