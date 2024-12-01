import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import BaseWebView from '../screens/BaseWebView';
import PdfView from '../screens/PdfView';
import NewPatientScreen from '../screens/patient/NewPatientScreen';
import ExistingPatientScreen from '../screens/patient/ExistingPatientScreen';
import ViewPatientScreen from '../screens/patient/ViewPatientScreen';
import PatientDicomImages from '../screens/patient/PatientDicomImages';

const Routes = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
        }}
        component={LoginScreen}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="WebView" component={BaseWebView} />
      <Stack.Screen name="PdfViewer" component={PdfView} />
      <Stack.Screen name="NewPatient" component={NewPatientScreen} />
      <Stack.Screen name="ExistingPatient" component={ExistingPatientScreen} />
      <Stack.Screen name="ViewPatient" component={ViewPatientScreen} />
      <Stack.Screen name="PatientDicom" component={PatientDicomImages} />
    </Stack.Navigator>
  );
};

export default Routes;
