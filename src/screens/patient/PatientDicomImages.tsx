/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DicomImage} from '../../types/PatientDataTypes';
import {getPatientDicom} from '../../api/homePageApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
const PatientDicomImages: React.FC<StackNavigationProp<{}>> = props => {
  const [data, setData] = useState<DicomImage[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('access_token');
        const ApiData = await getPatientDicom('49', token);
        setData(ApiData.result.study);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color={'#000'} size={30} />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        PatientDicomImages
      </Text>

      <FlatList
        data={data}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 8,
              borderRadius: 20,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000',
              }}>
              UUID:{' '}
              <Text
                style={{
                  fontWeight: '500',
                  color: '#000',
                }}>
                {item.uuid}
              </Text>
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0022ff',
                  padding: 20,
                  marginTop: 20,
                  borderRadius: 30,
                  marginBottom: 20,
                }}
                onPress={() => {
                  props.navigation.navigate('WebView', {
                    url: item.viewer_link,
                  });
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  Open View
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PatientDicomImages;
