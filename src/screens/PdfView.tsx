/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import Pdf from 'react-native-pdf';

const PdfView: React.FC<StackScreenProps<{}>> = props => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <Pdf
        source={{
          uri: props.route.params?.url,
        }}
        style={{
          flex: 1,
        }}
        onError={er => {
          console.log('testing', er);
        }}
        trustAllCerts={false}
      />

      {/* <WebView
        source={{
          uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=https://devtruplan.blob.core.windows.net/pdf/1_truplan.pdf?se=2024-11-29T11%3A45%3A17Z&sp=r&sv=2025-01-05&sr=b&sig=RlGXhcdtYQlJqZvEfUQIbFY%2BpzKGDFQHP/ycU1DFVjE%3D`,
        }}
        style={{
          flex: 1,
        }}
      /> */}
    </View>
  );
};

export default PdfView;
