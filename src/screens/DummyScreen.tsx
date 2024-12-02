/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView} from 'react-native';
import React from 'react';
import PatientCard from '../components/PatientCard';

const DummyScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <PatientActions patientName="John Doe" /> */}
      <PatientCard
        patientName="test"
        pdfView={function (): void {
          throw new Error('Function not implemented.');
        }}
        downloadPdf={function (): void {
          throw new Error('Function not implemented.');
        }}
        uploadPdf={function (): void {
          throw new Error('Function not implemented.');
        }}
        DicomImagesList={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </SafeAreaView>
  );
};

export default DummyScreen;
