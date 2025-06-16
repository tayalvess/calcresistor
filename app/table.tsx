import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, Stack } from 'expo-router';

import './global.css';

export default function TableScreen() {
    const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center p-4">
      <StatusBar style="auto" />

      <Stack.Screen options={{
        title: "Tabela de Cores", 
        headerStyle: { backgroundColor: '#f0f0f0' }, 
        headerTintColor: '#333', 
        headerShown: true, 
      }} />

      <Text className="text-3xl font-bold text-gray-800 mb-8">
        Tabela de Cores de Resistores
      </Text>

    
      <View className="w-full bg-gray-100 p-4 rounded-lg shadow-md items-center">
        <Text className="text-xl font-semibold text-gray-700">Dados da Tabela Irão Aqui</Text>
        <View className="h-48 w-full bg-gray-200 mt-4 rounded"></View>
      </View>

    </SafeAreaView>
  );
}