import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

export default function MedicalHistory() {
  const [selectedDisease, setSelectedDisease] = useState('heart');
  const [cholesterolLevel, setCholesterolLevel] = useState('');
  const [hypertension, setHypertension] = useState('');
  const [smoking, setSmoking] = useState('');
  const [diabetesExpectancy, setDiabetesExpectancy] = useState('');

  const [liverEnzymes, setLiverEnzymes] = useState('');
  const [fattyLiverSeverity, setFattyLiverSeverity] = useState('');

  const [bloodSugarLevel, setBloodSugarLevel] = useState('');
  const [insulin, setInsulin] = useState('');
  const router=useRouter();
  const navigateHome = () => {
    router.push('/home');  
  };
  const navigateLanding = () => {
    router.push('/landing');  
  };
  return (
    <View style={styles.container}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={require('./../../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Medical History</Text>
        </View>

        {/* Disease Selection */}
        <Text style={styles.label}>Disease:</Text>
        <View style={styles.mainPickerContainer}>
          <Picker
            selectedValue={selectedDisease}
            onValueChange={(itemValue) => setSelectedDisease(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Heart Problems" value="heart" />
            <Picker.Item label="Fatty Liver" value="liver" />
            <Picker.Item label="Diabetes" value="diabetes" />
          </Picker>
        </View>

        {/* Heart Disease Case */}
        {selectedDisease === 'heart' && (
          <View>
            <Text style={styles.label}>Diagnosed Since:</Text>
            <TextInput style={styles.input} placeholder="15 months" />

            <Text style={styles.label}>Gender:</Text>
            <TextInput style={styles.input} placeholder="Male" />

            <Text style={styles.label}>Medications:</Text>
            <TextInput
              style={styles.input}
              placeholder="Write medications prescribed by your physician here"
            />

            <Text style={styles.label}>Cholesterol level:</Text>
            <TextInput
              style={styles.input}
              placeholder="200 mg/dL"
              value={cholesterolLevel}
              onChangeText={setCholesterolLevel}
            />

            <Text style={styles.label}>Hypertension:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={hypertension}
                onValueChange={(itemValue) => setHypertension(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Yes" value="yes" />
                <Picker.Item label="No" value="no" />
              </Picker>
            </View>

            <Text style={styles.label}>Dietary restrictions:</Text>
            <TextInput
              style={styles.input}
              placeholder="Avoid high calorie products and fried food"
            />

            <Text style={styles.label}>Smoking:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={smoking}
                onValueChange={(itemValue) => setSmoking(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Yes" value="yes" />
                <Picker.Item label="No" value="no" />
              </Picker>
            </View>

            <Text style={styles.label}>Diabetes expectancy:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={diabetesExpectancy}
                onValueChange={(itemValue) => setDiabetesExpectancy(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Yes" value="yes" />
                <Picker.Item label="No" value="no" />
              </Picker>
            </View>
          </View>
        )}

        {/* Fatty Liver Case */}
        {selectedDisease === 'liver' && (
          <View>
            <Text style={styles.label}>Diagnosed Since:</Text>
            <TextInput style={styles.input} placeholder="18 months" />

            <Text style={styles.label}>Gender:</Text>
            <TextInput style={styles.input} placeholder="Male" />

            <Text style={styles.label}>Medications:</Text>
            <TextInput
              style={styles.input}
              placeholder="Write medications prescribed by your physician here"
            />

            <Text style={styles.label}>Liver Enzymes Level:</Text>
            <TextInput
              style={styles.input}
              placeholder="AST/ALT levels"
              value={liverEnzymes}
              onChangeText={setLiverEnzymes}
            />

            <Text style={styles.label}>Fatty Liver Severity:</Text>
            <TextInput
              style={styles.input}
              placeholder="Mild, Moderate, Severe"
              value={fattyLiverSeverity}
              onChangeText={setFattyLiverSeverity}
            />

            <Text style={styles.label}>Dietary restrictions:</Text>
            <TextInput
              style={styles.input}
              placeholder="Avoid fatty food and alcohol"
            />
          </View>
        )}

        {/* Diabetes Case */}
        {selectedDisease === 'diabetes' && (
          <View>
            <Text style={styles.label}>Diagnosed Since:</Text>
            <TextInput style={styles.input} placeholder="12 months" />

            <Text style={styles.label}>Gender:</Text>
            <TextInput style={styles.input} placeholder="Male" />
            
            <Text style={styles.label}>Diabetes Type:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={insulin}
                onValueChange={(itemValue) => setInsulin(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Type 1" value="1" />
                <Picker.Item label="Type 2" value="2" />
              </Picker>
            </View>

            <Text style={styles.label}>Medications:</Text>
            <TextInput
              style={styles.input}
              placeholder="Write medications prescribed by your physician here"
            />

            <Text style={styles.label}>Blood Sugar Level:</Text>
            <TextInput
              style={styles.input}
              placeholder="Fasting / Postprandial (mg/dL)"
              value={bloodSugarLevel}
              onChangeText={setBloodSugarLevel}
            />

            <Text style={styles.label}>Insulin dependency:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={insulin}
                onValueChange={(itemValue) => setInsulin(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Yes" value="yes" />
                <Picker.Item label="No" value="no" />
              </Picker>
            </View>

            <Text style={styles.label}>Dietary restrictions:</Text>
            <TextInput
              style={styles.input}
              placeholder="Avoid sugar, refined carbs"
            />
            
          </View>
        )}
        <TouchableOpacity 
        style={styles.continueButton}
        onPress={navigateLanding}
        >
        <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight:20,
    backgroundColor: 'white',
    paddingTop:45,
  },
  scrollViewContent: {
    paddingBottom: 40, // Adjust this value to ensure the content is not hidden by the bottom navigation
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B3566',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#5B3566',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#F6F6F6', 
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  mainPickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#E0E0E0', 
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#F6F6F6', 
  },
  continueButton: {
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
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});