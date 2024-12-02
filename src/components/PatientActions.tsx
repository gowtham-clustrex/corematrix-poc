import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

export type propsType = {
  patientName: string;
};

const PatientActions: React.FC<propsType> = ({patientName}) => {
  const handleViewPDF = () => {
    Alert.alert('Action', 'View PDF button pressed');
  };

  const handleDownloadPDF = () => {
    Alert.alert('Action', 'Download PDF button pressed');
  };

  const handleUploadPDF = () => {
    Alert.alert('Action', 'Upload PDF button pressed');
  };

  const handleViewDICOM = () => {
    Alert.alert('Action', 'View DICOM Images button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.patientName}>Patient Name: {patientName}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleViewPDF}>
          <Text style={styles.buttonText}>View PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDownloadPDF}>
          <Text style={styles.buttonText}>Download PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUploadPDF}>
          <Text style={styles.buttonText}>Upload PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleViewDICOM}>
          <Text style={styles.buttonText}>View DICOM Images</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PatientActions;
