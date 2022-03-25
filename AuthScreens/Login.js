import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,ActivityIndicator,
  ToastAndroid,
  StyleSheet
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import auth from "@react-native-firebase/auth";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
export default function Login() {
  const [PhoneNum, setPhoneNum] = useState('')
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [Processing, setProcessing] = useState(false);
  const navigation = useNavigation()
  async function PhoneAuth() {
   
        setProcessing(true);
        auth()
          .signInWithPhoneNumber("+91"+PhoneNum)
          .then((res) => {
           
            setProcessing(false);
          navigation.navigate("OTPLogin",{id:res.verificationId,phonenumber:PhoneNum,email:email,password:password})
          }).catch((err)=>alert('Please Enter Valid Details'),navigation.goBack());
      }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={Styles.View1}
      ></View>
     
      {Processing ? (
        <View style={{paddingVertical:50,height:400,top:100,alignItems:'center'}}>
          <ActivityIndicator color={'#A1D5F0'} size={40} animating />
        </View>
      ):(<View>
    <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 140,
        }}
      >
        Welcome!
      </Text>
      <TextInput
        maxLength={10}
        onChangeText={(text)=>{setPhoneNum(text)}}
        keyboardType="phone-pad"
        placeholder="Enter Phone Number"
        style={Styles.TextI1}
      />
      <Text
        style={{

          marginHorizontal: 20,
          bottom: 59,
          fontWeight: "bold",
          color: "#19874B",
        }}
      >
        +91
      </Text>
      <TextInput
            onChangeText={(text) => {
              setemail(text);
            }}
            placeholder="Enter Your Email"
            style={Styles.TextInputStyle}
          />
          <TextInput
            onChangeText={(text) => {
              setPassword(text);
            }}
            placeholder="Enter Your Password"
            style={Styles.TextInputStyle}
          />
      <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
      <TouchableOpacity onPress={PhoneAuth} style={{width:'80%',height:50,justifyContent:'center',backgroundColor:'lightblue',alignItems:'center',alignSelf:'center'}}>
              
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Login
              </Text>
           
          </TouchableOpacity>
      </View>
      </View>)}
  
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  CurvedFlexStyle: {
    position: "absolute",
    width: 570,
    height: 548,
    backgroundColor: "#DCFFD0",
    borderRadius: 270,
    right: -30,
    top: -180,
  },
  TextInputStyle: {
    marginHorizontal: 10,
    marginTop: 5,
    borderWidth: 1,
    fontWeight: "bold",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderColor: "#e5e5e5",
    backgroundColor:'rgba(255,255,255,0.6)'
  },
  View1:{
    position: "absolute",
    width: 570,
    height: 548,
    backgroundColor: "#A1D5F0",
    borderRadius: 270,
    right: -30,
    top: -180,
  },
  TextI1:{
    marginHorizontal: 10,
    marginVertical: 20,
    borderWidth: 1,
    fontWeight: "bold",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderColor: "#e5e5e5",
    backgroundColor:'rgba(255,255,255,0.6)',
  }
});

