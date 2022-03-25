import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function SignUp() {
  const navigation = useNavigation();
  const [PhoneNum, setPhoneNum] = useState('');
  const [uname, setuname] = useState('');
  const [FName, setFName] = useState('');
  const [LName, setLName] = useState('');
  const [email, setemail] = useState('');
  const [Password, setPassword] = useState('');
  const [AlertVisible, setAlertVisible] = useState(false);
  const [ALertMessage, setALertMessage] = useState('Error Occured !! ');
  const [Processing, setProcessing] = useState(false);
  async function PhoneAuth() {
    if (PhoneNum.length != 10 || FName == '' || Password == '') {
      setAlertVisible(true);
      setALertMessage('Kindly Enter Valid Details');
    } else {
      setProcessing(true);
      console.log('+91' + PhoneNum);
      auth()
        .verifyPhoneNumber('+91' + PhoneNum)
        .then(res => {
          //console.log(res.verificationId);
          setProcessing(false);
          navigation.navigate('OTP', {
            id: res.verificationId,
            phonenumber: PhoneNum,
            password: Password,
            fname: FName,
            lname: LName,
            email: email,
            uname: uname,
          });
        })
        .catch(err => {
          setAlertVisible(true);
          setALertMessage(err.message);
          setProcessing(false);
        });
    }
  }
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={'#A1D5F0'} barStyle="dark-content" />
      <View style={Styles.CurvedFlexStyle} />

      {Processing ? (
        <View
          style={Styles.View1}>
          <ActivityIndicator color={'#A1D5F0'} size={40} animating />
        </View>
      ) : (
        <View>
          <Text
            style={Styles.Text1}>
            Welcome!
          </Text>
          <TextInput
            maxLength={10}
            keyboardType="phone-pad"
            onChangeText={text => {
              setPhoneNum(text);
            }}
            placeholder="Enter Phone Number"
            style={Styles.TextInputStyle}
          />

          <TextInput
            onChangeText={text => {
              setuname(text);
            }}
            placeholder="Enter Your UserName"
            style={Styles.TextInputStyle}
          />
          <TextInput
            onChangeText={text => {
              setFName(text);
            }}
            placeholder="Enter Your First Name"
            style={Styles.TextInputStyle}
          />
          <TextInput
            onChangeText={text => {
              setLName(text);
            }}
            placeholder="Enter Your Last Name"
            style={Styles.TextInputStyle}
          />
          <TextInput
            onChangeText={text => {
              setemail(text);
            }}
            placeholder="Enter Your Email"
            style={Styles.TextInputStyle}
          />
          <TextInput
            onChangeText={text => {
              setPassword(text);
            }}
            secureTextEntry
            placeholder="Enter Your Password"
            style={Styles.TextInputStyle}
          />
          <View
            style={{
              marginHorizontal: 30,
              marginVertical: 10,
              marginBottom: 20,
            }}>
            <TouchableOpacity
              onPress={PhoneAuth}
              style={Styles.Button1}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Sign-Up</Text>

            </TouchableOpacity>
          </View>
          <Text
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 20}}>
            > Already Registerd ? Login
          </Text>
        </View>
      )}

      <AwesomeAlert
        confirmText="Ok !"
        confirmButtonTextStyle={{
          fontWeight: 'bold',
          fontSize: 17,
        }}
        onConfirmPressed={() => {
          setAlertVisible(false);
        }}
        titleStyle={{fontWeight: 'bold'}}
        closeOnHardwareBackPress={true}
        onDismiss={() => {
          setAlertVisible(false);
        }}
        show={AlertVisible}
        title="Error"
        messageStyle={{fontWeight: 'bold', fontSize: 20}}
        showConfirmButton={true}
        confirmButtonStyle={{
          backgroundColor: '#138211',
          paddingHorizontal: 50,
          fontWeight: 'bold',
          fontSize: 20,
          marginVertical: 20,
        }}
        message={ALertMessage}
      />
    </ScrollView>
  );
}
const Styles = StyleSheet.create({
  CurvedFlexStyle: {
    position: 'absolute',
    width: 570,
    height: 548,
    backgroundColor: '#A1D5F0',
    borderRadius: 270,
    right: -30,
    top: -180,
  },
  TextInputStyle: {
    marginHorizontal: 30,
    marginTop: 5,
    borderWidth: 1,
    fontWeight: 'bold',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderColor: 'lightgrey',
    backgroundColor:'rgba(255,255,255,0.6)',
  
  },
  Text1:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 110,
  },
  Button1:{
    width: '80%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    alignItems: 'center',
    alignSelf: 'center',
  },
  View1:{
    paddingVertical: 50,
    height: 400,
    top: 100,
    alignItems: 'center',
  }
});
