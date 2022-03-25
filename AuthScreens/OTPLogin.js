import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
export default function OTPLogin({route}) {
  const navigation = useNavigation();
  const id = route.params.id;
  const phonenumber = route.params.phonenumber;
  const password = route.params.password;
  const email = route.params.email;
  async function me() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        axios({
          method: 'POST',
          url: 'http://hiring-tests.herokuapp.com/login',

          data: {
            email: email,
            password: password,
          },
        })
          .then(resp => {
            if (resp.data.status == 200) {
              AsyncStorage.setItem('token', resp.data.token);
              navigation.navigate('Activity');
            }
          })
          .catch(err => {
            console.log('ERROR===>', err);
          });
      }
    });
  }

  useEffect(() => {
    me();
  }, []);

  const [OTP, setOTP] = useState('');
  async function Verify() {
    const credential = firebase.auth.PhoneAuthProvider.credential(id, OTP);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(res => {
        console.log(res);
        axios({
          method: 'POST',
          url: 'http://hiring-tests.herokuapp.com/login',

          data: {
            email: email,
            password: password,
          },
        }).then(resp => {
          AsyncStorage.setItem('token', resp.data.token);
          AsyncStorage.setItem('id', resp.data.user._id);
          axios({
            method: 'PUT',
            url: `http://hiring-tests.herokuapp.com/changeFlag/${resp.data.user._id}`,
            data: {
              isFirstLoggedIn: false,
            },
          }).then(rt => {
            navigation.navigate('Activity');
          });
        }).catch((err)=>{
          alert("Please Enter Right Email or Password");
          navigation.navigate('Login');
        })
      })
      .catch(err => {
        alert(err);
      });
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          position: 'absolute',
          width: 570,
          height: 548,
          backgroundColor: '#A1D5F0',
          borderRadius: 270,
          right: -30,
          top: -180,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 110,
        }}>
        Please Enter Your OTP!
      </Text>

      <TextInput
        maxLength={6}
        onChangeText={text => {
          setOTP(text);
        }}
        keyboardType="number-pad"
        placeholder="Enter Your OTP"
        style={{
          marginHorizontal: 30,
          marginVertical: 15,
          borderWidth: 1,
          fontWeight: 'bold',
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 10,
          borderColor: '#e5e5e5',
        }}
      />
      <View style={{marginHorizontal: 30, marginVertical: 10}}>
      <TouchableOpacity
          onPress={Verify}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '80%',
            height: 50,
            justifyContent: 'center',
            backgroundColor: 'lightblue',
            marginTop:150,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
          Verify
          </Text>

          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
