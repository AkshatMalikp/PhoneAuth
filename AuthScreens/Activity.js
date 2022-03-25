import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
export default function Activity() {
  const Navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', async () => {
        setTimeout(() => {
          console.log('Token Available');
          Navigation.navigate('Home');
        }, 1000);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [Navigation]);

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={40} animating color={'black'} />
    </View>
  );
}
