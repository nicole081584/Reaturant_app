// app/(tabs)/menu/login/admin.tsx
import { useRouter } from 'expo-router';
import { Image, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

import { checkUserType } from '@/libraries/backendService';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  Footer  from '@/components/Footer';
import ContainerStyles from '@/components/ContainerStyles';
import ButtonAndInputStyles from '@/components/ButtonAndInputStyles';

export default function AdminScreen() {
    return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#560324', dark: '#560324' }}
      headerImage={
        <Image
                source={require('@/assets/images/Login.jpg')}
                style={ContainerStyles.titleImage}
              />
      }>

    <ThemedView style={ContainerStyles.titleContainer}>
        <ThemedText type="title">Admin</ThemedText>
    </ThemedView>

    <Footer />
    </ParallaxScrollView>

    )}