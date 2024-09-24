import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [nome, setNome] = useState('');
  const [dia, setDia] = useState('');
  const [horario, setHorario] = useState('');

  const handleAgendar = async () => {
    try {
      const agendamento = { nome, dia, horario };
      const agendamentosAnteriores = await AsyncStorage.getItem('agendamentos');
      const agendamentos = agendamentosAnteriores ? JSON.parse(agendamentosAnteriores) : [];
      agendamentos.push(agendamento);
      await AsyncStorage.setItem('agendamentos', JSON.stringify(agendamentos));
      Alert.alert('Sucesso', 'Agendamento salvo com sucesso!');
      setNome('');
      setDia('');
      setHorario('');
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      Alert.alert('Erro', 'Não foi possível salvar o agendamento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Agendamento DuCorte</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Dia"
        value={dia}
        onChangeText={setDia}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário"
        value={horario}
        onChangeText={setHorario}
      />
      <Button title="Agendar" onPress={handleAgendar} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
});
