import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* rota da tabela */}
      <Stack.Screen name="table" options={{ title: "Tabela de Cores", headerShown: true }} />
      {/* rota da calculadora  */}
      <Stack.Screen name="calculator" options={{ title: "Calculadora", headerShown: true }} />
    </Stack>
  );
}