/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getTruplan, uploadTruPlan} from '../api/homePageApi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {pick, types} from 'react-native-document-picker';
import PatientCard from '../components/PatientCard';
import {RootStackParamList} from '../types/screenTypeStack';

const HomeScreen: React.FC<
  NativeStackScreenProps<RootStackParamList>
> = props => {
  const tableData = [
    {Column1: 'Alice', Column2: 'test'},
    {Column1: 'Noah', Column2: 'good'},
    {Column1: 'Daniel', Column2: 'tester02'},
  ];

  const [Loader, setLoader] = useState<boolean>(false);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            paddingRight: 12,
          }}
          onPress={async () => {
            try {
              await AsyncStorage.clear();
              props.navigation.navigate('Login');
              return;
            } catch (err) {
              console.log(err);
            }
          }}>
          <Icon name="logout" size={30} />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  const ViewPDF = useCallback(
    async (id: number) => {
      try {
        const token = await AsyncStorage.getItem('access_token');

        const getData = await getTruplan(id, token);
        props.navigation.navigate('PdfViewer', {url: getData.result.blob_url});
      } catch (err) {
        console.error(err);
      }
    },
    [props.navigation],
  );

  const uploadPDF = useCallback(async () => {
    try {
      setLoader(true);
      const token = await AsyncStorage.getItem('access_token');
      const ApiResponse = await uploadTruPlan('49', token);
      const url = ApiResponse.result.blob_url;
      const PdfFile = await pick({
        allowMultiSelection: false,
        type: types.pdf,
        mode: 'import',
        presentationStyle: 'formSheet',
      });
      const UploadApiData = await ReactNativeBlobUtil.fetch(
        'PUT',
        url,
        {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': 'application/pdf',
        },
        ReactNativeBlobUtil.wrap(PdfFile[0].uri),
      ).uploadProgress(res => {
        console.log(res);
      });
      if (UploadApiData) {
        Alert.alert('File Uploaded successfully');
      }
    } catch (err) {
      console.log('asdas');
    } finally {
      setLoader(false);
      console.log('completed');
    }
  }, []);

  const downloadPdf = useCallback(async (id: string) => {
    try {
      setLoader(true);
      const token = await AsyncStorage.getItem('access_token');
      const getData = await getTruplan(id, token);
      await DownloadFile(getData.result.blob_url);
    } catch (err) {
      console.error('Api is ', err);
    } finally {
      setLoader(false);
    }
  }, []);

  const DownloadFile = async (url: string) => {
    const fileName = 'TruPlan.pdf';
    const dirs = ReactNativeBlobUtil.fs.dirs;
    const filePath = `${dirs.DownloadDir}/${fileName}`;

    try {
      // Configure and start download
      ReactNativeBlobUtil.config({
        fileCache: true,
        appendExt: 'pdf',
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: fileName,
          path: filePath,
          description: 'Downloading the file...',
          mime: 'application/pdf',
          mediaScannable: true,
        },
      })
        .fetch('GET', url, {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': 'application/pdf',
        })
        .then(async res => {
          Alert.alert('Success', `File downloaded to ${filePath}`);
          console.log('File path:', res.path());
        })
        .catch(err => {
          Alert.alert('Error', 'File download failed. Please try again.');
          console.error('Download error:', err);
        });
    } catch (error) {
      Alert.alert('Error', 'Unexpected error occurred during the download.');
      console.error('Download error:', error);
    }
  };

  const renderRow = ({item}: {item: {Column1: string; Column2: string}}) => (
    <PatientCard
      patientName={item.Column1}
      pdfView={() => {
        ViewPDF(49);
      }}
      downloadPdf={() => {
        downloadPdf('49');
      }}
      uploadPdf={() => {
        uploadPDF();
      }}
      DicomImagesList={() => {
        props.navigation.navigate('PatientDicom');
      }}
    />
  );

  return (
    <View style={{flex: 1}}>
      {Loader && (
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <ActivityIndicator color={'#000'} size={30} />
        </View>
      )}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            props.navigation.navigate('NewPatient');
          }}>
          <Text style={styles.text}>New Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            props.navigation.navigate('ExistingPatient');
          }}>
          <Text style={styles.text}>Existing Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            props.navigation.navigate('ViewPatient');
          }}>
          <Text style={styles.text}>View Patient</Text>
        </TouchableOpacity>
      </View>

      {/* Table Data */}
      <FlatList
        data={tableData}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8, // Add spacing between items (if your React Native version supports it)
    margin: 16,
  },
  option: {
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
  },
  headerCell: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 16,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
});
