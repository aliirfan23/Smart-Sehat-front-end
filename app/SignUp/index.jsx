import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();  
  const navigateTouserLogin = () => {
    router.push('/userLogin');  // Navigate to the SignUp screen
  };
  const navigateHome = () => {
    router.push('/medicalHistory');  // Navigate to the SignUp screen
  };
  return (
    <View style={styles.container}>
      <Image source={require('./../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.header}>Create a new account</Text>
      <Text style={styles.subHeader}>Please put your information below to create a new account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Create account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateTouserLogin}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.link}>Log in</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>Or</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity 
      style={styles.guestButton}
      onPress={navigateHome}>
        <Text style={styles.guestText}>Continue as guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    //alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D0052',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#8A8A8A',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeButton: {
    padding: 10,
  },
  eyeText: {
    fontSize: 18,
  },
  createAccountButton: {
    // backgroundColor: '#F7577A',
    // borderRadius: 10,
    // paddingVertical: 15,
    // alignItems: 'center',
    // marginBottom: 20,
    width: '100%',
    backgroundColor: '#F7577A',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: '#8A8A8A',
    fontSize: 14,
  },
  link: {
    color: '#FF4D6D',
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  orText: {
    fontSize: 14,
    color: '#8A8A8A',
    marginHorizontal: 5,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  guestButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  guestText: {
    color: '#FF4D6D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
