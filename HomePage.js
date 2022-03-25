import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Animated,
} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Home = ({navigation}) => {
  const Navigation = useNavigation();
  const [name, setname] = useState('');
  async function GetProfile() {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios({
      method: 'GET',
      url: 'http://hiring-tests.herokuapp.com/profile',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => {
        setname(res.data.user.fName);
      })
      .catch(err => {});
  }

  async function SignOut() {
    auth()
      .signOut()
      .then(
        () => AsyncStorage.removeItem('token'),
        AsyncStorage.removeItem('id'),
        console.log('User signed out!'),
      )
      .catch(error => console.log('Error==>', error));
    Navigation.navigate('SignUp');
  }

  useEffect(() => {
    GetProfile();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <LottieView
            style={{height: 500}}
            source={require('./assets/animation.json')}
            autoPlay
            loop
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, marginVertical: 10}}>
              Thank You for giving me this opportunity {name}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={SignOut}>
          <View
            style={{
              marginHorizontal: 30,
              marginVertical: 10,
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 17,
                borderWidth: 2,
                borderColor: '#19874B',
                color: '#19874B',
                borderRadius: 8,
                fontWeight: 'bold',
                justifyContent: 'flex-end',
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
