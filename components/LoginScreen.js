import React, { useRef, useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ImageBackground } from 'react-native'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import {firebaseConfig} from 'firebase/compat/app'


const LoginScreen = ({ navigation }) => {
   const [phoneNumber, setPhoneNumber] = useState('');
   const [code, setCode] = useState('');
   const [verificationId, setVerificationId] = useState(null);
   const recaptchaVerifier = useRef(null);
   const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then(setVerificationId);
        setPhoneNumber('');
   };
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
        .then(() => {
            setCode('')
        })
        .catch((error) => {
            // show an alert in case of error
            alert(error)
        })
        Alert.alert(
            'Login Successful. Welcome To Your Journal Diary',
        );
  }
    return(
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            />
            <Text style={styles.otpText}>
                Sign in using OTP
            </Text>
            <TextInput
                placeholder=' Enter Your Phone Number'
                onChangeText={setPhoneNumber}
                keyboardType='phone-pad'
                autoCompleteType='tel'
                style={styles.TextInput}
                />
                <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                    <Text style={styles.buttonText}>
                        Send Verification
                    </Text>
                </TouchableOpacity>
                <TextInput
                placeholder='Confirm code'
                onChangeText={setCode}
                keyboardType='number-pad'
                style={styles.TextInput}
                />
                       <TouchableOpacity style={styles.sendCode}
                       onPress = {() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>
                        Confirm Verification
                    </Text>
                </TouchableOpacity>
        </View>
    )
 }
export default LoginScreen;