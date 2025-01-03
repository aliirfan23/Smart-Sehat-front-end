import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MedicalHistory() {
    const [selectedDisease, setSelectedDisease] = useState('heart');
    const [gender, setGender] = useState('male');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    // Heart Problems
    const [severity, setSeverity] = useState('');
    const [stentInserted, setStentInserted] = useState('');
    const [openHeartSurgery, setOpenHeartSurgery] = useState('');
    const [cholesterolLevel, setCholesterolLevel] = useState('');
    const [hypertension, setHypertension] = useState('');
    const [smoking, setSmoking] = useState('');
    const [diabetesExpectancy, setDiabetesExpectancy] = useState('');

    // Fatty Liver
    const [liverEnzymes, setLiverEnzymes] = useState('');
    const [fibrosisStage, setFibrosisStage] = useState('');
    const [steatosisGrade, setSteatosisGrade] = useState('');

    // Diabetes
    const [diabetesType, setDiabetesType] = useState('');
    const [bloodSugarLevel, setBloodSugarLevel] = useState('');
    const [a1cLevel, setA1cLevel] = useState('');
    const [insulinUsage, setInsulinUsage] = useState('');
    const [insulinDependency, setInsulinDependency] = useState('');

    const router = useRouter();

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };

    const handleStartDateConfirm = (date) => {
        setStartDate(date.toISOString().split('T')[0]);
        hideStartDatePicker();
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleEndDateConfirm = (date) => {
        setEndDate(date.toISOString().split('T')[0]);
        hideEndDatePicker();
    };

    const fetchMedicalHistory = async () => {
        try {
            const token = await AsyncStorage.getItem('jwt_token');
            if (!token) {
                Alert.alert('Error', 'No authentication token found.');
                return;
            }

            const response = await fetch('http://192.168.1.19:5000/medicalHistory', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const historyData = await response.json();
                Alert.alert('Medical History', JSON.stringify(historyData), [
                    { text: 'OK', onPress: () => router.push('/landing') },
                ]);
            } else if (response.status === 401) {
                Alert.alert('Error', 'Invalid token. Please log in again.');
            } else {
                Alert.alert('Info', 'No medical history found. Please add your details.');
            }
        } catch (error) {
            console.error('Error fetching medical history:', error);
            Alert.alert('Error', 'An error occurred while fetching medical history.');
        }
    };

    const addMedicalHistory = async () => {
        try {
            const token = await AsyncStorage.getItem('jwt_token');
            if (!token) {
                Alert.alert('Error', 'No authentication token found.');
                return;
            }
            const mapToBinary = (value) => {
              if (value === null || value === undefined) return 1; // Default to 1 if null
              return value.toLowerCase() === 'yes' ? 1 : 0; // 1 for "Yes", 0 for "No"
            };
            const medicalHistory = {
                diseaseType: selectedDisease,
                gender,
                startDate,
                endDate,
                ...(selectedDisease === 'heart' && {
                    severity,
                    stentInserted: mapToBinary(stentInserted),
                    openHeartSurgery: mapToBinary(openHeartSurgery),
                    cholesterolLevel,
                    hypertension: mapToBinary(hypertension),
                    smoking: mapToBinary(smoking),
                    diabetesExpectancy: mapToBinary(diabetesExpectancy),
                }),
                ...(selectedDisease === 'liver' && {
                    liverEnzymes,
                    fibrosisStage,
                    steatosisGrade,
                    severity,
                }),
                ...(selectedDisease === 'diabetes' && {
                    diabetesType,
                    bloodSugarLevel,
                    a1cLevel,
                    insulinUsage,
                    insulinDependency,
                }),
            };
            console.log(medicalHistory);
            const response = await fetch('http://192.168.1.19:5000/medicalHistory/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                body: new URLSearchParams(medicalHistory).toString(),
            });

            if (response.ok) {
                Alert.alert('Success', 'Medical history added successfully!', [
                    { text: 'OK', onPress: () => router.push('/landing') },
                ]);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to add medical history.');
            }
        } catch (error) {
            console.error('Error submitting medical history:', error);
            Alert.alert('Error', 'An error occurred while submitting medical history.');
        }
    };

    const handleSubmit = async () => {
        await fetchMedicalHistory();
        // If no data is found in fetchMedicalHistory, prompt user to add a new history.
        // if (!startDate || !endDate || !gender) {
        //     Alert.alert('Info', 'Please fill out all required fields.');
        // } else {
        //     await addMedicalHistory();
        // }
        await addMedicalHistory();
    };

    return (
        <View style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <Image source={require('./../../assets/images/logo.png')} style={styles.logo} />
                        <Text style={styles.title}>Medical History</Text>
                    </View>
                    
                    <Text style={styles.label}>Disease Type:</Text>
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

                    <Text style={styles.label}>Gender:</Text>
                    <View style={styles.mainPickerContainer}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue) => setGender(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                        </Picker>
                    </View>

                    <Text style={styles.label}>Start Date:</Text>
                    <TouchableOpacity style={styles.input} onPress={showStartDatePicker}>
                        <Text>{startDate || 'Select Start Date'}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={isStartDatePickerVisible}
                        mode="date"
                        onConfirm={handleStartDateConfirm}
                        onCancel={hideStartDatePicker}
                    />

                    <Text style={styles.label}>End Date:</Text>
                    <TouchableOpacity style={styles.input} onPress={showEndDatePicker}>
                        <Text>{endDate || 'Select End Date'}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={isEndDatePickerVisible}
                        mode="date"
                        onConfirm={handleEndDateConfirm}
                        onCancel={hideEndDatePicker}
                    />

                    {selectedDisease === 'heart' && (
                        <View>
                            <Text style={styles.label}>Severity:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Mild/Moderate/Severe"
                                value={severity}
                                onChangeText={setSeverity}
                            />

                            <Text style={styles.label}>Stent Inserted:</Text>
                            <View style={styles.mainPickerContainer}>
                                <Picker
                                    selectedValue={stentInserted}
                                    onValueChange={(itemValue) => setStentInserted(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                                </Picker>
                            </View>

                            <Text style={styles.label}>Open Heart Surgery:</Text>
                            <View style={styles.mainPickerContainer}>
                                <Picker
                                    selectedValue={openHeartSurgery}
                                    onValueChange={(itemValue) => setOpenHeartSurgery(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                                </Picker>
                            </View>

                            <Text style={styles.label}>Cholesterol Level:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., 200 mg/dL"
                                value={cholesterolLevel}
                                onChangeText={setCholesterolLevel}
                            />

                            <Text style={styles.label}>Hypertension:</Text>
                            <View style={styles.mainPickerContainer}>
                                <Picker
                                    selectedValue={hypertension}
                                    onValueChange={(itemValue) => setHypertension(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                                </Picker>
                            </View>

                            <Text style={styles.label}>Smoking:</Text>
                            <View style={styles.mainPickerContainer}>
                                <Picker
                                    selectedValue={smoking}
                                    onValueChange={(itemValue) => setSmoking(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                                </Picker>
                            </View>

                            <Text style={styles.label}>Diabetes Expectancy:</Text>
                            <View style={styles.mainPickerContainer}>
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

                    {selectedDisease === 'liver' && (
                        <View>
                            <Text style={styles.label}>Liver Enzymes:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., AST/ALT levels"
                                value={liverEnzymes}
                                onChangeText={setLiverEnzymes}
                            />

                            <Text style={styles.label}>Fibrosis Stage:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="1-4"
                                value={fibrosisStage}
                                onChangeText={setFibrosisStage}
                            />

                            <Text style={styles.label}>Steatosis Grade:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="1-3"
                                value={steatosisGrade}
                                onChangeText={setSteatosisGrade}
                            />

                            <Text style={styles.label}>Severity:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Mild/Moderate/Severe"
                                value={severity}
                                onChangeText={setSeverity}
                            />
                        </View>
                    )}
                    {selectedDisease === 'diabetes' && (
                        <View>
                            <Text style={styles.label}>Diabetes Type:</Text>
                            <View style={styles.mainPickerContainer}>
                                <Picker
                                    selectedValue={diabetesType}
                                    onValueChange={(itemValue) => setDiabetesType(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Type 1" value="1" />
                                    <Picker.Item label="Type 2" value="2" />
                                </Picker>
                            </View>

                            <Text style={styles.label}>Blood Sugar Level:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., Fasting/Postprandial"
                                value={bloodSugarLevel}
                                onChangeText={setBloodSugarLevel}
                            />

                            <Text style={styles.label}>A1c Level:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., 6.5%"
                                value={a1cLevel}
                                onChangeText={setA1cLevel}
                            />

                            <Text style={styles.label}>Insulin Usage:</Text>
                            <View style={styles.mainPickerContainer}>
                                <Picker
                                    selectedValue={insulinUsage}
                                    onValueChange={(itemValue) => setInsulinUsage(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                                </Picker>
                            </View>

                            <Text style={styles.label}>Insulin Dependency:</Text>
                            <View style={styles.mainPickerContainer}>
                                <Picker
                                    selectedValue={insulinDependency}
                                    onValueChange={(itemValue) => setInsulinDependency(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                                </Picker>
                            </View>
                        </View>
                    )}

                    <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
                        <Text style={styles.continueText}>Submit</Text>
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
        paddingRight: 20,
        backgroundColor: 'white',
        paddingTop: 45,
    },
    scrollViewContent: {
        paddingBottom: 40,
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
