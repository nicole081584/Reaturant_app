// app/(tabs)/menu/login/admin.tsx
import { useRouter,useLocalSearchParams } from 'expo-router';
import { Image, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getBooking, makeBooking, getBookingSlots } from '@/libraries/backendService';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  Footer  from '@/components/Footer';
import ContainerStyles from '@/components/ContainerStyles';
import ButtonAndInputStyles from '@/components/ButtonAndInputStyles';
import BookingCalendar from '@/libraries/bookingCalender';
import { booking } from '@/libraries/booking';
import { emptyBooking } from "@/constants/emptyBooking"; 

export default function AdminScreen() {
  const { bookingNumberPassword } = useLocalSearchParams<{ bookingNumberPassword: string }>();
  const router = useRouter();
  const [originalBooking, setOriginalBooking] = useState<booking>(emptyBooking);
  const [ammendetBooking, setAmmendetBooking] = useState<booking>(emptyBooking);
  const [stage, setStage] = React.useState("");

   // function that retrieves the booking with the given bookingNumebr on opening this page
  const retrieveBooking = async () => {
    console.log("Retrieving booking with:", bookingNumberPassword);
    const b = await getBooking (bookingNumberPassword);
            if (b && b.length > 0) {
              setOriginalBooking(b);
              setStage ("displayOriginalBooking");}
            else {
              alert("An error occured, please try again!");
              router.replace('./menu/login/index');
            }
  };

  // run automatically on mount
  useEffect(() => {
    retrieveBooking();
  }, []); // empty dependency array = run once when mounted


    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#560324'}}>
    <ParallaxScrollView>
       
          <Image
            source={require('@/assets/images/Login.jpg')}
            style={ContainerStyles.titleImage}
            />
            
    <ThemedView style={ContainerStyles.titleContainer}>
        <ThemedText type="title">Amend your Booking</ThemedText>
    </ThemedView>

    { stage == "displayOriginalBooking" && //stage that displays the original booking with ammendable options
    
      <ThemedView>
      <ThemedText type="subtitle">Title: {originalBooking.title}</ThemedText>
      
      <ThemedText type = "subtitle">Name: {originalBooking.firstName}, {originalBooking.lastName}</ThemedText>

      <ThemedText type = "subtitle">Phone Number: {originalBooking.phoneNumber}</ThemedText>

     <ThemedText type = "subtitle">Email: {originalBooking.email}</ThemedText>

       <ThemedText type = "subtitle">Select the number of Guests:</ThemedText>
       <ThemedView style={ButtonAndInputStyles.pickerWrapper}>
        <Picker
          selectedValue={originalBooking.numberOfGuests}
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

    <Footer />
    </ParallaxScrollView>
    </SafeAreaView>

    )}