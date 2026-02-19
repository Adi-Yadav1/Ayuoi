import React, { useRef, useState } from 'react';
import { Alert, PermissionsAndroid, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

// const audioRecorder = new AudioRecorderPlayer();

const fontFamily = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'Georgia',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EC',
    position: 'relative',
  },
  backgroundGlowA: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#FFD7B3',
    top: -120,
    right: -120,
    opacity: 0.6,
  },
  backgroundGlowB: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#DFF5E1',
    bottom: -100,
    left: -80,
    opacity: 0.6,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    color: '#2E2A24',
    fontFamily,
    fontWeight: '700',
  },
  headerSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B5E4B',
    fontFamily,
  },
  heroCard: {
    marginHorizontal: 20,
    marginTop: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFF0DE',
    borderWidth: 1,
    borderColor: '#F2D2B5',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  heroTitle: {
    fontSize: 16,
    fontFamily,
    color: '#2E2A24',
    fontWeight: '700',
  },
  heroBody: {
    marginTop: 8,
    fontSize: 14,
    color: '#5F5344',
    lineHeight: 20,
    fontFamily,
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 170,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1D9C4',
  },
  emptyTitle: {
    fontSize: 15,
    color: '#2F2A23',
    fontWeight: '700',
    marginBottom: 6,
    fontFamily,
  },
  emptyText: {
    fontSize: 13,
    color: '#6B5E4B',
    lineHeight: 18,
    fontFamily,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF1E1',
    borderTopWidth: 1,
    borderTopColor: '#F0D8C0',
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 90,
    borderRadius: 16,
  },
  inputWrap: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6CCB5',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    fontSize: 14,
    color: '#2F2A23',
    fontFamily,
  },
  micButton: {
    marginLeft: 10,
    backgroundColor: '#E6F6EA',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CFE9D6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  micButtonText: {
    color: '#1F5E3C',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#E58B3A',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sendButtonText: {
    color: '#FFF7ED',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.3,
  },
});

export default function DoctorScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef(audioRecorder).current;

  const requestMicPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'Allow access to your microphone to record audio.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const handleMicPress = async () => {
    try {
      if (isRecording) {
        await recorder.stopRecorder();
        recorder.removeRecordBackListener();
        setIsRecording(false);
        return;
      }

      const hasPermission = await requestMicPermission();
      if (!hasPermission) {
        Alert.alert('Permission required', 'Microphone access is needed to record audio.');
        return;
      }

      await recorder.startRecorder();
      setIsRecording(true);
    } catch (error) {
      console.error('Audio record error:', error);
      Alert.alert('Error', 'Could not start audio recording.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundGlowA} />
      <View style={styles.backgroundGlowB} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doctor AI</Text>
        <Text style={styles.headerSubtitle}>
          Share how you feel. You can type or use audio input.
        </Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Quick Start</Text>
        <Text style={styles.heroBody}>
          "I am feeling not good" or describe your symptoms in a few words.
        </Text>
      </View>

      <View style={styles.chatArea}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No messages yet</Text>
          <Text style={styles.emptyText}>
            Start by typing your symptoms or tap the mic to record.
          </Text>
        </View>
      </View>

      <View style={styles.inputBar}>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Type how you are feeling"
            placeholderTextColor="#8B7E6B"
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.micButton} activeOpacity={0.85} onPress={handleMicPress}>
          <View style={styles.iconButton}>
            <Ionicons name={isRecording ? 'mic-off' : 'mic'} size={20} color="#1F5E3C" />
          </View>
          <Text style={styles.micButtonText}>{isRecording ? 'Stop' : 'Mic'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} activeOpacity={0.85}>
          <View style={styles.iconButton}>
            <Ionicons name="send" size={18} color="#FFF7ED" />
          </View>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
