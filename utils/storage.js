import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    let parsedData = JSON.parse(data);

    return parsedData;

    // return JSON.parse(await AsyncStorage.getItem(key));
  } catch (error) {
    console.error(`Error occurred while fetching data for key: ${key}`, error);
    return null;
  }
}

export const setStorage = async (key, value) => {
  try{
    const stringifiedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringifiedValue);
  } catch (error) {
    console.error(`Error occurred while setting data for key: ${key}`, error);
  }
}