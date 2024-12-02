/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect} from 'react';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../types/screenTypeStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const BaseWebView: React.FC<
  NativeStackScreenProps<RootStackParamList>
> = props => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      // headerShown: false,
      headerTitle: props.route.params.title
        ? props.route.params.title
        : 'WebView',
    });
  }, [props.navigation, props.route.params.title]);
  console.log(props.route.params);

  return (
    <WebView
      source={{
        uri: props.route.params.url,
      }}
      style={{
        flex: 1,
      }}
    />
  );
};

export default BaseWebView;
