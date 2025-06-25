import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { COLORS_DATA } from '../constants/resistorData';

type SelectorType = 'bands' | 'band1' | 'band2' | 'band3' | 'multiplier' | 'tolerance' | 'tempCoef';

export default function CalculatorScreen() {
  const [numberOfBands, setNumberOfBands] = useState(4);
  const [band1Color, setBand1Color] = useState(COLORS_DATA[1]);
  const [band2Color, setBand2Color] = useState(COLORS_DATA[0]);
  const [band3Color, setBand3Color] = useState(COLORS_DATA[2]);
  const [multiplierColor, setMultiplierColor] = useState(COLORS_DATA[1]);
  const [toleranceColor, setToleranceColor] = useState(COLORS_DATA[10]);
  const [tempCoefColor, setTempCoefColor] = useState(COLORS_DATA[1]);

  const [result, setResult] = useState({ resistanceValue: '', formula: '', fullDisplay: '' });

  const [modalVisible, setModalVisible] = useState(false);
  const [currentSelector, setCurrentSelector] = useState<SelectorType | null>(null);
  const [selectorOptions, setSelectorOptions] = useState<any[]>([]);

  useEffect(() => {
    const calculateResistance = () => {
        let firstDigit = band1Color?.digit ?? 0;
        let secondDigit = band2Color?.digit ?? 0;
        let finalValue = 0;
        let formula = '';
        let tolerance: string | null = '';

        if (numberOfBands === 3 || numberOfBands === 4) {
            const multiplier = multiplierColor?.multiplier ?? 1;
            tolerance = numberOfBands === 4 ? (toleranceColor?.tolerance ?? null) : '±20%';
            const baseValue = firstDigit * 10 + secondDigit;
            finalValue = baseValue * multiplier;
            formula = `${baseValue} x ${multiplier} = ${finalValue}`;
        } else { // 5 ou 6 faixas
            const thirdDigit = band3Color?.digit ?? 0;
            const multiplier = multiplierColor?.multiplier ?? 1;
            tolerance = toleranceColor?.tolerance ?? null;
            const baseValue = firstDigit * 100 + secondDigit * 10 + thirdDigit;
            finalValue = baseValue * multiplier;
            formula = `${baseValue} x ${multiplier} = ${finalValue}`;
        }

        const formatNumber = (num: number) => num % 1 === 0 ? num.toString() : num.toFixed(2).replace('.', ',');
        
        let resistanceValue = '';
        if (finalValue >= 1000000) resistanceValue = `${formatNumber(finalValue / 1000000)} MΩ`;
        else if (finalValue >= 1000) resistanceValue = `${formatNumber(finalValue / 1000)} kΩ`;
        else resistanceValue = `${formatNumber(finalValue)} Ω`;
        
        const fullDisplay = tolerance ? `${resistanceValue} ${tolerance}` : resistanceValue;
        
        setResult({ resistanceValue, formula, fullDisplay });
    };
    calculateResistance();
  }, [numberOfBands, band1Color, band2Color, band3Color, multiplierColor, toleranceColor, tempCoefColor]);

  const openSelector = (type: SelectorType) => {
    setCurrentSelector(type);
    if (type === 'bands') setSelectorOptions([3, 4, 5, 6]);
    else {
      const validColors = COLORS_DATA.filter(color => {
        if (type.startsWith('band')) return color.digit !== null;
        if (type === 'multiplier') return color.multiplier !== null;
        if (type === 'tolerance') return color.tolerance !== null;
        if (type === 'tempCoef') return color.tempCoef !== null;
        return false;
      });
      setSelectorOptions(validColors);
    }
    setModalVisible(true);
  };

  const handleSelect = (item: any) => {
    switch (currentSelector) {
        case 'bands': setNumberOfBands(item); break;
        case 'band1': setBand1Color(item); break;
        case 'band2': setBand2Color(item); break;
        case 'band3': setBand3Color(item); break;
        case 'multiplier': setMultiplierColor(item); break;
        case 'tolerance': setToleranceColor(item); break;
        case 'tempCoef': setTempCoefColor(item); break;
    }
    setModalVisible(false);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>100Ω</Text>
          <Text style={styles.formulaText}>10 x 10 = 100</Text>
        </View>

        <View style={styles.resistorBody}>
          <View style={[styles.resistorBand, { backgroundColor: band1Color?.color ?? 'transparent' }]} />
          <View style={[styles.resistorBand, { backgroundColor: band2Color?.color ?? 'transparent' }]} />
          {numberOfBands >= 5 && <View style={[styles.resistorBand, { backgroundColor: band3Color?.color ?? 'transparent' }]} />}
          <View style={[styles.resistorBand, { backgroundColor: multiplierColor?.color ?? 'transparent' }]} />
          {numberOfBands >= 4 && <View style={[styles.resistorBand, { backgroundColor: toleranceColor?.color ?? 'transparent' }]} />}
          {numberOfBands === 6 && <View style={[styles.resistorBand, { backgroundColor: tempCoefColor?.color ?? 'transparent' }]} />}
        </View>

        <View style={styles.selectorsContainer}>
          <Text style={styles.label}>Quantidade de Faixas</Text>
          <TouchableOpacity style={styles.dropdownButton} onPress={() => openSelector('bands')}><Text style={styles.dropdownButtonText}>{`${numberOfBands} Faixas de Cor`}</Text><ChevronDown size={22} color="#374151" /></TouchableOpacity>
          
          <Text style={styles.label}>Faixa 1 (Dígito 1)</Text>
          <TouchableOpacity style={styles.dropdownButton} onPress={() => openSelector('band1')}><Text style={styles.dropdownButtonText}>{`${band1Color.name} ${band1Color.digit}`}</Text><ChevronDown size={22} color="#374151" /></TouchableOpacity>

          <Text style={styles.label}>Faixa 2 (Dígito 2)</Text>
          <TouchableOpacity style={styles.dropdownButton} onPress={() => openSelector('band2')}><Text style={styles.dropdownButtonText}>{`${band2Color.name} ${band2Color.digit}`}</Text><ChevronDown size={22} color="#374151" /></TouchableOpacity>

          {numberOfBands >= 5 && (<><Text style={styles.label}>Faixa 3 (Dígito 3)</Text><TouchableOpacity style={styles.dropdownButton} onPress={() => openSelector('band3')}><Text style={styles.dropdownButtonText}>{`${band3Color.name} ${band3Color.digit}`}</Text><ChevronDown size={22} color="#374151" /></TouchableOpacity></>)}
          
          <Text style={styles.label}>{numberOfBands >= 5 ? 'Faixa 4 (Multiplicador)' : 'Faixa 3 (Multiplicador)'}</Text>
          <TouchableOpacity style={styles.dropdownButton} onPress={() => openSelector('multiplier')}><Text style={styles.dropdownButtonText}>{multiplierColor.name}</Text><ChevronDown size={22} color="#374151" /></TouchableOpacity>

          {numberOfBands >= 4 && (<><Text style={styles.label}>{numberOfBands >= 5 ? 'Faixa 5 (Tolerância)' : 'Faixa 4 (Tolerância)'}</Text><TouchableOpacity style={styles.dropdownButton} onPress={() => openSelector('tolerance')}><Text style={styles.dropdownButtonText}>{`${toleranceColor.name} ${toleranceColor.tolerance}`}</Text><ChevronDown size={22} color="#374151" /></TouchableOpacity></>)}
          
          {numberOfBands === 6 && (<><Text style={styles.label}>Faixa 6 (Coef. Temp.)</Text><TouchableOpacity style={styles.dropdownButton} onPress={() => openSelector('tempCoef')}><Text style={styles.dropdownButtonText}>{`${tempCoefColor.name} ${tempCoefColor.tempCoef}`}</Text><ChevronDown size={22} color="#374151" /></TouchableOpacity></>)}
        </View>
        
        <View>
            <Text style={styles.label}>Resistência (Ω)</Text>
            <View style={styles.finalResultBox}>
              <Text style={styles.finalResultText}>{result.resistanceValue}</Text>
            </View>
        </View>
      </ScrollView>

      <Modal transparent={true} visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <ScrollView>
              {selectorOptions.map((option, index) => (
                <TouchableOpacity key={index} style={styles.modalOption} onPress={() => handleSelect(option)}>
                  <Text style={styles.modalOptionText}>
                    {typeof option === 'number' ? `${option} Faixas de Cor` :
                     option.tolerance ? `${option.name} ${option.tolerance}` :
                     option.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 24, },
    resultContainer: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 20, alignItems: 'center', marginVertical: 24, borderWidth: 1, borderColor: '#F3F4F6' },
    resultText: { fontSize: 42, fontWeight: 'bold', color: '#111827', },
    formulaText: { color: '#6B7280', fontSize: 16, marginTop: 4, },
    resistorBody: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#D6B386', borderRadius: 6, paddingVertical: 8, paddingHorizontal: 10, marginBottom: 32, alignSelf: 'center', },
    resistorBand: { width: 14, height: 30, borderRadius: 3, marginHorizontal: 3, },
    selectorsContainer: {},
    label: { fontSize: 14, fontWeight: '500', color: '#6B7280', marginBottom: 8, paddingLeft: 4, },
    dropdownButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, paddingVertical: 14, paddingHorizontal: 16, marginBottom: 20, },
    dropdownButtonText: { fontSize: 16, color: '#111827', fontWeight: '500', },
    finalResultBox: { backgroundColor: '#F3F4F6', borderRadius: 8, padding: 16, alignItems: 'center', },
    finalResultText: { fontSize: 18, fontWeight: 'bold', color: '#374151', },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', },
    modalContent: { backgroundColor: 'white', borderRadius: 8, padding: 10, width: '80%', maxHeight: '60%', },
    modalOption: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', },
    modalOptionText: { textAlign: 'center', fontSize: 18, },
});