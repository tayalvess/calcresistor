import { ScreenContent } from 'components/ScreenContent';
import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity  } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import './global.css'; 

export default function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hour = now.getHours().toString().padStart(2, '0');
      const minute = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hour}h${minute}`);

      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      setCurrentDate(`${day}/${month}/${year}`);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60 * 1000); 
    return () => clearInterval(intervalId);
  }, []);

  const navegarparaTableScreen = () => {
    console.log('Navegar para Tabela de Resistência (colocar depois)');
    // tela da tabela
  };

  const navegarparaResistorCalculator = () => {
    console.log('Calculadora de Resistores (colocar depois)');
    // tela da calculadora
  };

  return (
      <SafeAreaView className="flex-1 bg-white items-center justify-start pt-20">
      <StatusBar style="auto" />

      <View className="items-center bg-white px-8 py-5 rounded-10px shadow-md border border-gray-200 w-4/5 mb-24"> 
        <Text className="text-5xl font-bold text-gray-800"> 
          {currentTime}
        </Text>
        <Text className="text-lg text-gray-600"> 
          {currentDate}
        </Text>
      </View>

      <TouchableOpacity
        className="items-center justify-center bg-gray-50 w-4/5 p-5 rounded-lg mb-8 shadow-md mt-110" 
        onPress={navegarparaTableScreen}
      >
        <Text className="text-lg font-semibold text-gray-700"> 
          Tabela de Resistência
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="items-center justify-center bg-gray-50 w-4/5 p-5 rounded-lg mb-5 shadow-md" 
        onPress={navegarparaResistorCalculator}
      >
        <Text className="text-lg font-semibold text-gray-700"> 
          Resistor
        </Text>
      </TouchableOpacity>
      </SafeAreaView>
  );
}