import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Voltar',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="table" 
        options={{ 
          title: 'Tabela de Resistência' 
        }} 
      />
      <Stack.Screen 
        name="calculator" 
        options={{ 
          title: 'Calculadora' 
        }} 
      />
    </Stack>
  );
}