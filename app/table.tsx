import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

import { COLORS_DATA } from '../constants/resistorData';

const formatMultiplier = (value: number) => {
    if (value >= 1000000) return `${value / 1000000}MΩ`;
    if (value >= 1000) return `${value / 1000}kΩ`;
    if (value < 1) return `x${value.toString().replace('.', ',')}`;
    return `${value}Ω`;
};

// decide se o texto e branco ou preto
const getTextColorForBackground = (hexColor: string) => {
    if (!hexColor) return '#1F2937';
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#1F2937' : '#FFFFFF';
};


export default function TableScreen() {
  const [numberOfBands, setNumberOfBands] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const bandOptions = [3, 4, 5, 6];

  // renderiza cada celula colorida
  const Cell = ({ value, color, flex = 1 }: { value: string | number | null, color: string, flex?: number }) => {
    if (value === null) {
        return <View style={[styles.cell, { flex }]} />; 
    }
    const textColor = getTextColorForBackground(color);
    const isWhite = color === '#FFFFFF'; 

    return (
        <View style={[
            styles.cell, 
            { backgroundColor: color, flex },
            isWhite && { borderWidth: 1, borderColor: '#1F2937' } 
        ]}>
            <Text style={[styles.cellText, { color: textColor }]}>{value}</Text>
        </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.centerItems}>
          <Text style={styles.resultText}>100Ω</Text>
          <Text style={styles.formulaText}>10 x 10 = 100</Text>
        </View>

        <View style={styles.resistorBody}>
            <View style={[styles.resistorBand, {backgroundColor: '#B45309'}]}><Text style={styles.bandText}>1</Text></View>
            <View style={[styles.resistorBand, {backgroundColor: '#1C1917'}]}><Text style={styles.bandText}>0</Text></View>
            <View style={[styles.resistorBand, {backgroundColor: '#B45309'}]}><Text style={styles.bandTextSmall}>10Ω</Text></View>
            <View style={[styles.resistorBand, {backgroundColor: '#FACC15', marginLeft: 10}]}><Text style={[styles.bandTextSmall, {color: '#422006'}]}>±5%</Text></View>
        </View>

        {/* tabela de cores */}
        <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, { flex: 1.5 }]}>Cor</Text>
              <Text style={styles.headerCell}>D1</Text>
              <Text style={styles.headerCell}>D2</Text>
              {numberOfBands >= 5 && <Text style={styles.headerCell}>D3</Text>}
              <Text style={styles.headerCell}>Mult.</Text>
              {numberOfBands >= 4 && <Text style={styles.headerCell}>Tol.</Text>}
              {numberOfBands === 6 && <Text style={styles.headerCell}>Coef. T.</Text>}
            </View>

            {COLORS_DATA.map((item) => (
              <View key={item.name} style={styles.tableRow}>
                  <Cell value={item.name} color={item.color} flex={1.5} />
                  <Cell value={item.digit} color={item.color} />
                  <Cell value={item.digit} color={item.color} />
                  {numberOfBands >= 5 && <Cell value={item.digit} color={item.color} />}
                  <Cell value={formatMultiplier(item.multiplier)} color={item.color} />
                  {numberOfBands >= 4 && <Cell value={item.tolerance} color={item.color} />}
                  {numberOfBands === 6 && <Cell value={item.tempCoef} color={item.color} />}
              </View>
            ))}
        </View>

        {/* seletor de faixas */}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Quantidade de Faixas</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.dropdownButtonText}>{`${numberOfBands} Faixas`}</Text>
            <ChevronDown size={22} color="#374151" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* seleçao */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            {bandOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => {
                  setNumberOfBands(option);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{`${option} Faixas de Cor`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16 },
    centerItems: { alignItems: 'center', marginVertical: 24 },
    resultText: { fontSize: 36, fontWeight: 'bold' },
    formulaText: { color: 'gray' },
    resistorBody: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#D6B386', borderRadius: 10, height: 65,
      paddingHorizontal: 20, marginBottom: 24,
    },
    resistorBand: {
      height: 45, width: 35, borderRadius: 6, marginHorizontal: 4,
      justifyContent: 'center', alignItems: 'center',
    },
    bandText: { color: 'white', fontWeight: 'bold', fontSize: 18, },
    bandTextSmall: { color: 'white', fontWeight: 'bold', fontSize: 12, },
    
    tableContainer: { width: '100%', },
    tableHeader: {
      flexDirection: 'row', paddingHorizontal: 4, marginBottom: 8,
    },
    headerText: { color: '#6B7280', fontWeight: '500', textAlign: 'center' },
    headerCell: { flex: 1, color: '#6B7280', fontWeight: '500', textAlign: 'center' },
    tableRow: { flexDirection: 'row', marginVertical: 3, },
    cell: {
        flex: 1, borderRadius: 6, paddingVertical: 10, paddingHorizontal: 5,
        justifyContent: 'center', alignItems: 'center', marginHorizontal: 3,
    },
    cellText: { fontWeight: '500', fontSize: 12, textAlign: 'center', },
    selectorContainer: { marginTop: 32, marginBottom: 40, alignItems: 'center' },
    selectorLabel: {
        fontSize: 16, fontWeight: '600', marginBottom: 10,
        width: '80%', paddingLeft: 4,
    },
    dropdownButton: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8,
      paddingVertical: 12, paddingHorizontal: 20, width: '80%',
    },
    dropdownButtonText: { fontSize: 16, fontWeight: '500', },
    modalOverlay: {
      flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center', alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white', borderRadius: 8, padding: 10,
      width: '80%', maxHeight: '50%',
    },
    modalOption: {
      paddingVertical: 15, borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    modalOptionText: { textAlign: 'center', fontSize: 18, },
});