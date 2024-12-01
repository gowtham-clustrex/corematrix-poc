/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import WebView from 'react-native-webview';

const BaseWebView: React.FC<StackScreenProps<{}>> = props => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      // headerShown: false,
      headerTitle: props.route.params.title
        ? props.route.params.title
        : 'WebView',
    });
  }, [props.navigation]);
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
