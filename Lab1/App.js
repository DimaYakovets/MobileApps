import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Vibration, TouchableOpacity } from 'react-native';

const inputs = {
  time: '',
};

export default function App() {
  const interval = useRef(undefined);
  const [timer, setTimer] = useState(0);
  const [counting, setCounting] = useState(false);
  const deadline = useRef(Date.now());

  function tick() {
    const delta = Math.floor((deadline.current - Date.now()) / 1000);

    if (delta <= 0) {
      Vibration.vibrate(1000);
      setCounting(0);
      setTimer(0);
      return;
    }

    setTimer(Math.floor((deadline.current - Date.now()) / 1000));
  }

  useEffect(() => {
    if (counting) {
      interval.current = setInterval(tick, 1000);
    } else {
      clearInterval(interval.current);
      interval.current = undefined;
    }
  }, [counting]);


  function StartStop() {
    if (interval.current) {
      setCounting(false);
      setTimer(0);
      return;
    }

    const parsed = Number.parseInt(inputs.time);
    const minutes = (Number.isNaN(parsed) ? 0 : parsed) * 60;

    if (!minutes) {
      return;
    }

    deadline.current = new Date(Date.now() + minutes * 1000);
    setTimer(minutes);

    setCounting(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{Math.floor(timer / 60)}:{timer % 60}</Text>
      <TouchableOpacity style={styles.startStopBtn} onPress={StartStop}>
        <Text style={styles.startStopBtnTxt}>{counting ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
      <TextInput style={styles.timeInput} placeholder='Time' onChangeText={text => inputs.time = text}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c42',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  timerText: {
    fontSize: 75,
    marginBottom: '20%'
  },
  timeInput: {
    fontSize: 35,
    borderColor: 'black',
    borderWidth: 2,
    padding: 3,
    width: '40%',
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: '#ddd',
  },
  startStopBtn: {
    marginTop: 8,
    backgroundColor: '#171',
    width: '40%',
    alignItems: 'center'
  },
  startStopBtnTxt: {
    fontSize: 35,
    padding: 4,
  },
});
