import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export type PropsType = {
  patientName: string;
  pdfView: () => void;
  downloadPdf: () => void;
  uploadPdf: () => void;
  DicomImagesList: () => void;
};

const PatientCard: React.FC<PropsType> = ({
  patientName,
  pdfView,
  downloadPdf,
  uploadPdf,
  DicomImagesList,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.patientName}>Patient Name: {patientName}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={pdfView}>
          <Text style={styles.buttonText}>View PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={downloadPdf}>
          <Text style={styles.buttonText}>Download PDF</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={uploadPdf}>
          <Text style={styles.buttonText}>Upload PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={DicomImagesList}>
          <Text style={styles.buttonText}>View Images</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    margin: 20,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'left',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PatientCard;
