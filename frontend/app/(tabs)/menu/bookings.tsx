// app/(tabs)/menu/bookings.tsx
import { StyleSheet, TextInput, Pressable, Modal, ActivityIndicator, ImageBackground} from 'react-native';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getBookingSlots, makeBooking } from '@/libraries/backendService';
import BookingCalendar from '@/libraries/bookingCalender';
import { booking } from '@/libraries/booking';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  Footer  from '@/components/Footer';
import ContainerStyles from '@/components/ContainerStyles';
import ButtonAndInputStyles from '@/components/ButtonAndInputStyles';
import { isValidEmail, isValidPhoneNumber } from '@/libraries/validationServices';

export default function BookingsScreen() {

const [title, setTitle] = useState('');
const [firstName, setFirstName] = useState('');  
const [lastName, setLastName] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [email, setEmail] = useState('');
const [numberOfGuests, setNumberOfGuests] = useState(0);
const [date, setDate] = useState('');
const [time, setTime] = useState(''); 
const [bookingSlots, setBookingSlots] = useState<string[]>([]);
const [booking, setBooking] = useState<booking[]>([]);
const [stage, setStage] = React.useState("makeBooking");
const [comment, setComment] = useState('');

const [bookingButtonInUse, setBookingButtonInUse] = useState(false);
const [isLoading, setIsLoading] = useState(false);

// Format date to DD/MM/YYYY
const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
};

// Wrapper function to handle date selection and retrieval of booking slots
const handleDateSelected = async (selectedDate: string) => {
  const formattedDate = formatDate(selectedDate);
  setDate(formattedDate);

  try {
    const slotData = await getBookingSlots(formattedDate, numberOfGuests);
    setBookingSlots(slotData);
  } catch (error) {
    console.error('Failed to load booking slots:', error);
    setBookingSlots([]);
  }
};

 // function that handles the reset when the return Button is pressed 
  const handleReset = async () => {
    setTitle ('');
    setFirstName ('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setDate('');
    setTime('');
    setComment('');
    setNumberOfGuests(0);
    setBooking([]);
    setBookingSlots([]);
    setStage("makeBooking");
  }

// function to handle the submit of a booking request
  const handleSubmit = async () => {

      //check and verify all fields are filled in correctly
      if (title ===''){
        alert ("Please select your title");
      }
      else if (firstName === ''){
        alert ("Please enter your first name.");
      }
      else if (lastName === ''){
        alert ("Please enter your last name.");
      }
      else if (phoneNumber==='' || !isValidPhoneNumber(phoneNumber)){
        alert ("Please enter a valid UK mobile or landline number (e.g. 07700 900123 or 020 7946 0958).")
      }
      else if (email ==='' || !isValidEmail(email)){
        alert ("Please provide a valid email address")
      }
      else if (numberOfGuests === 0) {
        alert("Please select number of Guests");
        }
       else if (date === '') {
        alert("Please select a date");
        }
        else if (time === '') {
        alert("Please select a time for your booking");
        }
      else {
        setBookingButtonInUse(true);
        // show  loading screen
        setIsLoading(true);
        //submit booking and set the booking constant with returned values and display booking
        const b = await makeBooking (title, firstName, lastName, phoneNumber, email, numberOfGuests, date, time, comment);
        if (b && b.length > 0) {
          setBooking(b);
          setStage ("displayBooking");}
        else {
          alert("An error occured, please try again!");
          setStage ("makeBooking");
        }
      }

      //stop showing loading screen
      setIsLoading(false);
      setBookingButtonInUse(false);

  }

  return (

     <SafeAreaView style={{ flex: 1, backgroundColor: '#560324'}}>
      <ParallaxScrollView>
       
          <Image
            source={require('@/assets/images/bookings.jpg')}
            style={ContainerStyles.titleImage}
            />

      { stage == "makeBooking" && //stage make a booking
    
      <ThemedView>

      <ThemedView style={ContainerStyles.titleContainer}>
        <ThemedText type="title">Make a Booking</ThemedText>
      </ThemedView>

      <ThemedText type="subtitle">Title:</ThemedText>
      <ThemedView style={ButtonAndInputStyles.pickerWrapper}>
        <Picker
          selectedValue={title}
          onValueChange={(itemValue) => setTitle(itemValue)}
          style={ButtonAndInputStyles.picker}
          >
          <Picker.Item label="Choose title" value="" />
          <Picker.Item label="Mr." value="Mr." />
          <Picker.Item label="Mrs." value="Mrs." />
          <Picker.Item label="Miss" value="Miss" />
          <Picker.Item label="Ms." value="Ms." />
          <Picker.Item label="Mx." value="Mx." />
        </Picker>
      </ThemedView>
      
      <ThemedText type = "subtitle">Name:</ThemedText>
      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <ThemedText type = "subtitle">Phone Number: </ThemedText>
      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

     <ThemedText type = "subtitle">Email:</ThemedText>
      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

       <ThemedText type = "subtitle">Select the number of Guests:</ThemedText>
       <ThemedView style={ButtonAndInputStyles.pickerWrapper}>
        <Picker
          selectedValue={numberOfGuests}
          onValueChange={(itemValue) => setNumberOfGuests(itemValue)}
          style={ButtonAndInputStyles.picker}
          >
            <Picker.Item label="Select number of guests" value="" />
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
            <Picker.Item label="7" value={7} />
            <Picker.Item label="8" value={8} />
            <Picker.Item label="9" value={9} />
            <Picker.Item label="10" value={10} />
        </Picker>
        </ThemedView>
        <ThemedText type = 'small'>Please count Children and Highchairs into your final number.</ThemedText>
        <ThemedText type = 'small'>For bookings of 11 Guests and above please phone the Restuarant directly on: 028 3883 2444</ThemedText>

        <ThemedText type = "subtitle">Date:</ThemedText>
        <BookingCalendar onDateSelected={handleDateSelected} />
        <ThemedText type = 'small'>🔴 Closed </ThemedText>
        <ThemedText type = 'small'>🟢 Online booking unavailable, please phone 028 3883 2444 to book a table </ThemedText>
        

        <ThemedText type = "subtitle">Time:</ThemedText>
        <ThemedView style={ButtonAndInputStyles.pickerWrapper}>
        <Picker
          selectedValue={time}
          onValueChange={(itemValue) => setTime(itemValue)}
          style={ButtonAndInputStyles.picker}
        >
          { bookingSlots.map((val) => (
            <Picker.Item key={val} label={val.toString()} value={val} />
          ))}
        </Picker>
        </ThemedView>

        <ThemedText type="subtitle">Additional Comments (Optional):</ThemedText>
          <TextInput
            style={[ButtonAndInputStyles.input, { height: 100, textAlignVertical: 'top' }]} // Adjust height for multiline input
            placeholder="Let us know anything else we should be aware of..."
            value={comment}
            onChangeText={setComment}
            multiline={true}
            numberOfLines={4}
          />

        <ThemedView>
          <Pressable  style={[!bookingButtonInUse && ButtonAndInputStyles.button, bookingButtonInUse && ButtonAndInputStyles.buttonInUse]}  
            onPress={handleSubmit}>
              <ThemedText type= 'subtitle'>Make Booking</ThemedText>
          </Pressable>
        </ThemedView>

        </ThemedView>

      }

      { stage == "displayBooking" && //stage to display the Booking

        <ImageBackground
          source={require('@/assets/images/voucher_background.png')} 
          style={ContainerStyles.voucherBackground}
          imageStyle={{ borderRadius: 10 }} 
        >
          <ThemedView style={{ marginBottom:40, backgroundColor: 'transparent' }}>
          {booking.map((booking, index) => (
            <ThemedView key={index} style={{ backgroundColor: 'transparent' }}>
              <ThemedText type="voucherTitle">Booking made</ThemedText>
              <ThemedText type="voucherValue">Date: {booking.dateOfBooking}</ThemedText>
              <ThemedText type="voucherValue">Time: {booking.time}</ThemedText>
              <ThemedText type="voucher"> Number of Guests: {booking.numberOfGuests}</ThemedText>
              <ThemedText type="voucher">Booking Number: {booking.bookingNumber}</ThemedText>
              <ThemedText type="voucher">A confirmation email has been send, please check your spam folder if you can not see it in your inbox.</ThemedText>
              <ThemedText type="voucher">We are looking forward to welcome you to our award winning restaurant.</ThemedText>
              <ThemedText type="voucherFineprint">You can amend this booking by going to the Login page in the app 
                                          and using your Booking Number and email to log in</ThemedText>
              <ThemedText type="voucherFineprint">Or phone us directly on 028 3883 2444 </ThemedText>
            </ThemedView>
          ))}
          </ThemedView>

          <ThemedView >
           <Pressable style={ButtonAndInputStyles.button} onPress={handleReset}>
              <ThemedText type= 'subtitle'>Return</ThemedText>
           </Pressable>
          </ThemedView>

        </ImageBackground>
      }

      {/* Modal showing the loading screen while voucher is beeing processed*/}
          <Modal
            transparent={true}
            animationType="fade"
            visible={isLoading}
          >
            <ThemedView style={ContainerStyles.loadingOverlay}>
              <ActivityIndicator size="large" color="#560324" />
            </ThemedView>
          </Modal>

      <Footer />
    </ParallaxScrollView>
    </SafeAreaView>
  );
}
