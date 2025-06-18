import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CircuitBoard, Omega } from "lucide-react-native";
import { useRouter } from 'expo-router';

import '../global.css';

export default function Index() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const router = useRouter();

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
    router.push('/table');
  };

  const navegarparaResistorCalculator = () => {
    router.push('/calculator');
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
        className="flex-row items-center bg-gray-50 w-4/5 p-5 rounded-lg mb-8 shadow-md mt-110 pl-8"
        onPress={navegarparaTableScreen}
      >
        <CircuitBoard size={24} color="#4B5563" style={{ marginRight: 16 }} />
        <View className="flex-1 items-center pr-16">
          <Text className="text-lg font-semibold text-gray-700">
            Tabela de Resistência
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center bg-gray-50 w-4/5 p-5 rounded-lg mb-5 shadow-md pl-8"
        onPress={navegarparaResistorCalculator}
      >
        <Omega size={24} color="#4B5563" style={{ marginRight: 16 }} />
        <View className="flex-1 items-center pr-16">
          <Text className="text-lg font-semibold text-gray-700">
            Resistor
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}