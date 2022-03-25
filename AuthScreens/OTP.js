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
export default function OTP({route}) {
  const navigation = useNavigation();
  const id = route.params.id;
  const phonenumber = route.params.phonenumber;
  const password = route.params.password;
  const fname = route.params.fname;
  const lname = route.params.lname;
  const uname = route.params.uname;
  const email = route.params.email;

  const [OTP, setOTP] = useState('');

  async function me() {
    firebase.auth().onAuthStateChanged(user => {
      user
        ? axios({
            method: 'POST',
            url: 'http://hiring-tests.herokuapp.com/addUser',
            data: {
              phoneNum: phonenumber,
              fName: fname,
              lName: lname,
              userName: uname,
              password: password,
              email: email,
            },
          }).then(resp => {
            console.log(resp.data);
            if (resp.data.status == 403) {
              alert(resp.data.message);
              navigation.navigate('SignUp');
            } else {
              navigation.navigate('Activity');
            }
          })
        : console.log('None');
    });
  }
  me();

  async function Verify() {
    const credential = firebase.auth.PhoneAuthProvider.credential(id, OTP);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(res => {
        console.log(res);
        axios({
          method: 'POST',
          url: 'http://hiring-tests.herokuapp.com/addUser',
          data: {
            phoneNum: phonenumber,
            fName: fname,
            lName: lname,
            userName: uname,
            password: password,
            email: email,
          },
        }).then(resp => {
          if (resp.data.status == 403) {
            alert(resp.data.message);
            navigation.navigate('SignUp');
          } else {
            AsyncStorage.setItem('id', resp.data.savedUser._id);
            axios({
              method: 'PUT',
              url: `http://hiring-tests.herokuapp.com/changeFlag/${resp.data.savedUser._id}`,
              data: {
                isFirstLoggedIn: true,
              },
            }).then(rt => {
              navigation.navigate('Activity');
            });
          }
        });
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
            marginTop:150,
            backgroundColor: 'lightblue',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Verify</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
