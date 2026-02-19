// app/(tabs)/menu/menus.tsx
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  Footer  from '@/components/Footer';
import ContainerStyles from '@/components/ContainerStyles';

export default function MenusScreen() {

   return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#560324'}}>
    <ParallaxScrollView>
       
          <Image
            source={require('@/assets/images/Cod.jpg')}
            style={ContainerStyles.titleImage}
            />  

      <ThemedView style={ContainerStyles.titleContainer}>
        <ThemedText type="title">Menus</ThemedText>
      </ThemedView>
      <Collapsible title="Breakfast">
        <ThemedText>
          available 10am-11:45am Tuesday to Saturday and 10am-11:30am Sunday
        </ThemedText>
        
        <ExternalLink href="https://sintonsatthebridge.com/wp-content/uploads/2025/02/Breakfast-feb-25.pdf">
          <ThemedText type="link">View Menu</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Lunch">
        <ThemedText>
          available 12pm-3pm Tuesday, Wednesday and 12pm-3:30pm Thursday-Saturday
        </ThemedText>
        
        <ExternalLink href="https://sintonsatthebridge.com/wp-content/uploads/2025/02/LUNCH-FEB-25.pdf">
          <ThemedText type="link">View Menu</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="A la Carte">
        <ThemedText>
          available 5pm-7:30pm Thursday, 5pm-8:30pm Friday and Saturday
        </ThemedText>
        
        <ExternalLink href="https://sintonsatthebridge.com/wp-content/uploads/2025/02/A-la-carte-FEB-25.pdf">
          <ThemedText type="link">View Menu</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Sample Sunday Menu">
        <ThemedText>
          available 12pm-3:30pm and 5pm-7pm Sunday.
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          This is a sample only, Menu changes weekly.
        </ThemedText>
        
        <ExternalLink href="https://sintonsatthebridge.com/wp-content/uploads/2025/01/Sample-Sunday-Menu-25.pdf">
          <ThemedText type="link">View Menu</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Vegetarian Menu">
        <ThemedText>
          available during Lunch and Dinner Service Tuesday-Sunday
        </ThemedText>
        
        <ExternalLink href="https://sintonsatthebridge.com/wp-content/uploads/2025/02/Veggie-menu-FEB-25.pdf">
          <ThemedText type="link">View Menu</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Dessert Menu">
        <ThemedText>
          available during Lunch and Dinner Service Tuesday-Saturday
        </ThemedText>
        
        <ExternalLink href="https://sintonsatthebridge.com/wp-content/uploads/2025/02/DESSERTS-FEB-25.pdf">
          <ThemedText type="link">View Menu</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Kids Menu">
        <ThemedText>
          available during Lunch and Dinner Service Tuesday-Saturday
        </ThemedText>
        
        <ExternalLink href="https://sintonsatthebridge.com/wp-content/uploads/2025/02/Kids-at-Sintons-Feb-25.pdf">
          <ThemedText type="link">View Menu</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Footer />

    </ParallaxScrollView>
    </SafeAreaView>    
  );
}