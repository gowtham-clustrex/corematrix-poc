export type RootStackParamList = {
  Login: undefined; // No parameters
  Home: undefined; // No parameters
  WebView: {url: string; title: string}; // Requires a 'url' parameter
  PdfViewer: {url: string}; // Requires a 'filePath' parameter
  NewPatient: undefined; // No parameters
  ExistingPatient: undefined; // Requires a 'patientId' parameter
  ViewPatient: undefined | {patientId: string}; // Requires a 'patientId' parameter
  PatientDicom: undefined; // Requires an array of 'images'
  TestScreen: {debugInfo?: string}; // Optional 'debugInfo' parameter
};
