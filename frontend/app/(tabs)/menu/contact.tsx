// app/(tabs)/menu/contact.tsx
import { Linking, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';
import MapView, { Marker } from 'react-native-maps';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  Footer  from '@/components/Footer';
import ContainerStyles from '@/components/ContainerStyles';
import ButtonAndInputStyles from '@/components/ButtonAndInputStyles';




export default function ContactScreen() {

const phoneNumber = '028 3883 2444';
const emailAddress = 'dining@sintonsatthebridge.com';
const address = '2 Station Road, Scarva, Craigavon, BT63 6JY';

// Coordinates for Sintons
const latitude =54.330339;
const longitude =-6.3867474;


  // handles the call logic autoaticlly suggesting Sintons Number
  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
      console.error('Failed to make call:', err)
    );
  };

  //handles the mail logic, automatically filling in sintons email addess and a subject of App Inquiry
  const handleEmailPress = () => {
    const subject = 'App Inquiry';
    const body = 'Hi, I’d like to know more about...';
    const mailto = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch((err) =>
      console.error('Failed to send email:', err)
    );
  };

  // Handles when someone presses on the map to get directions linking to apple or google maps
  const handleMapPress = () => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${latitude},${longitude}`,
      android: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    });

    Linking.openURL(url as string);
  };
 
  
  // Returns the Contact screen view
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#560324', dark: '#560324' }}
      headerImage={
        <Image
              source={require('@/assets/images/Contacts.jpg')}
              style={ContainerStyles.titleImage}
                      />
      }>
      <ThemedView style={ContainerStyles.titleContainer}>
        <ThemedText type="title">Find Us</ThemedText>
      </ThemedView>

      <ThemedView style = {ContainerStyles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title="Our Restaurant"
          description={address}
        />
      </MapView>
      </ThemedView>

      <ThemedView style={ContainerStyles.titleContainer}>
        <ThemedText type="title">Contact Us</ThemedText>
      </ThemedView>

      <ThemedView>
        <Pressable style={ButtonAndInputStyles.button} onPress={handleCallPress}>
          <ThemedText>Call Us</ThemedText>
        </Pressable>
      </ThemedView>
      
      <ThemedView>
        <Pressable style={ButtonAndInputStyles.button} onPress={handleEmailPress}>
          <ThemedText>Email Us</ThemedText>
        </Pressable>
      </ThemedView>
      <Footer />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 200,
    width: '100%',
  },
});

