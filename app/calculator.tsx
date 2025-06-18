import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router'; 
import { ArrowLeft } from 'lucide-react-native'; 

import '../global.css'; 

export default function Calculator() {
  const router = useRouter(); 

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Stack.Screen
        options={{
          headerTitle: 'Calculadora de Resistores',
          headerShown: true, 
          headerLeft: () => ( 
            <TouchableOpacity onPress={() => router.back()} className="ml-4">
              <ArrowLeft size={24} color="#4B5563" />
            </TouchableOpacity>
          ),
        }}
      />
      <Text className="text-2xl font-bold text-gray-800">
        Esta é a tela da Calculadora de Resistores!!!!!!
      </Text>
      <Text className="text-base text-gray-600 mt-4">
        Teste teste teste calculadora !!!
      </Text>
    </SafeAreaView>
  );
}