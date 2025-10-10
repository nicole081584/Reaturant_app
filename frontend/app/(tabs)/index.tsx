import { Image } from 'expo-image';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  Footer  from '@/components/Footer';
import ContainerStyles from '@/components/ContainerStyles';

export default function HomeScreen() {
  // Returns Home screen view
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#560324', dark: '#560324'  }}
      headerImage={
      <Image
        source={require('@/assets/images/sintons_house_logo.png')}
        style={ContainerStyles.titleImage}
      />
      }>
      <ThemedView style={ContainerStyles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
      <ThemedView style={ContainerStyles.stepContainer}>
        
        <ThemedText>
           to Sinton’s at the Bridge. 
        </ThemedText>
      </ThemedView>

      <ThemedView style={ContainerStyles.stepContainer}>
        <ThemedText>
          Located in the idyllic award winning village of Scarva on the borders of County Armagh and County Down, 
          owners Graeme and Julianne Morton have brought their considerable experience within the hospitality 
          industry to this purpose built restaurant.
        </ThemedText>
      </ThemedView>

      <ThemedView style={ContainerStyles.stepContainer}>
        <ThemedText>
          Their enthusiasm for food, culinary expertise and the delivery of excellence in customer service
          means that your first visit will not be your last.
        </ThemedText>
      </ThemedView>

      <Footer />
    </ParallaxScrollView>
  );
}

