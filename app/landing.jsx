import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';



export default function Home() {

  const router = useRouter();  
  const navigateChatbot = () => {
    router.push('/chatBot');  
  };

  const getCurrentDate = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = new Date();
    const day = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const dateOfMonth = date.getDate();
    const year = date.getFullYear();

    return `${day} ${month} ${dateOfMonth}, ${year}`;
  }

  const getCurrentTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  }

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Camera access denied', 'Please grant camera access to take pictures.');
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      if (imageUri) {
        console.log('Image URI:', imageUri);
      } else {
        console.log('Error: Image URI is undefined.');
      }
    } else if (result.canceled) {
      console.log('Camera operation was cancelled.');
    } else {
      console.log('Error: No image assets found.');
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hey, Ali!</Text>
          <TouchableOpacity style={styles.scanButton} onPress={openCamera}>
            <Text style={styles.scanButtonText}>Scan Now</Text>
          </TouchableOpacity>
        </View>

        {/* Date and Time Section */}
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <FontAwesome name="calendar" size={24} color="#FF6B81" />
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </View>
          <View style={styles.timeContainer}>
            <MaterialIcons name="access-time" size={24} color="#FF6B81" />
            <Text style={styles.timeText}>{getCurrentTime()}</Text>
          </View>
        </View>

        {/* Daily Report Section */}
        <View style={styles.reportContainer}>
          <Text style={styles.sectionTitle}>Daily Report</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <View style={styles.reportCards}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Blood Pressure</Text>
            <Text style={styles.cardValue}>130 / 80</Text>
            <Text style={styles.cardSubtitle}>Normal</Text>
            <Text style={styles.cardTime}>08:00am - 10:00am</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sugar</Text>
            <Text style={styles.cardValue}>100</Text>
            <Text style={styles.cardSubtitle}>Normal</Text>
            <Text style={styles.cardTime}>08:00am - 10:30am</Text>
          </View>
        </View>

        {/* Diet Plan Section */}
        <Text style={styles.sectionTitle}>Today's Diet Plans</Text>
        <View style={styles.dietPlanContainer}>
          <View style={styles.dietPlanOptions}>
            <TouchableOpacity style={[styles.dietPlanButton, styles.active]}>
              <Text style={styles.dietPlanText}>Morning</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dietPlanButton}>
              <Text style={styles.dietPlanText}>Evening</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dietPlanButton}>
              <Text style={styles.dietPlanText}>Night</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dietPlanCard}>
            <Image source={require('./../assets/images/sandwich.png')} style={styles.foodImage} />
            <Text style={styles.dietDescription}>One Sandwich with Half Boiled Egg</Text>
            <Text style={styles.dietTime}>Around: 08:00am - 11:00am</Text>
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.doneButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dietPlanCard}>
            <Image source={require('./../assets/images/sandwich.png')} style={styles.foodImage} />
            <Text style={styles.dietDescription}>One Sandwich with Half Boiled Egg</Text>
            <Text style={styles.dietTime}>Around: 08:00am - 11:00am</Text>
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.doneButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dietPlanCard}>
            <Image source={require('./../assets/images/sandwich.png')} style={styles.foodImage} />
            <Text style={styles.dietDescription}>One Sandwich with Half Boiled Egg</Text>
            <Text style={styles.dietTime}>Around: 08:00am - 11:00am</Text>
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.doneButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dietPlanCard}>
            <Image source={require('./../assets/images/sandwich.png')} style={styles.foodImage} />
            <Text style={styles.dietDescription}>One Sandwich with Half Boiled Egg</Text>
            <Text style={styles.dietTime}>Around: 08:00am - 11:00am</Text>
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.doneButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity>
          <FontAwesome name="home" size={30} color="#FF6B81" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="search" size={30} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="comments" size={30} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateChatbot}>
          <FontAwesome name="envelope" size={30} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="user" size={30} color="#666" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: '#FF6B81',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 10,
    fontSize: 16,
  },
  reportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#FF6B81',
    fontSize: 16,
  },
  reportCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#F7CAC9',
    padding: 20,
    borderRadius: 10,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  cardSubtitle: {
    color: '#999',
  },
  cardTime: {
    color: '#999',
    marginTop: 10,
  },
  dietPlanContainer: {
    marginVertical: 20,
  },
  dietPlanOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dietPlanButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#E5E5E5',
  },
  active: {
    backgroundColor: '#FF6B81',
  },
  dietPlanText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dietPlanCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  foodImage: {
    width: 345,
    height: 170,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  dietDescription: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dietTime: {
    color: '#999',
    marginTop: 5,
  },
  doneButton: {
    marginTop: 10,
    backgroundColor: '#FF6B81',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '112%',
    height: 70,
  },
});
