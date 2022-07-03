import React, {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Search = ({navigation}) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    const name = query?.toLowerCase();
    try {
      const res = await axios.get(`https://pokeapi.co/api/v1/pokemon/${name}`);
      navigation.navigate('Details', {details: res?.data});
      console.log('res', res?.data);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Enter a valid name',
      });
      console.log('search error', err);
    }
  };

  return (
    <>
      <Toast></Toast>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: 20,
          height: '100%',
          alignContent: 'space-around',
          justifyContent: 'space-evenly',
        }}>
        <View>
          <Text>What Pokemon are you looking for?</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#0b276c',
              padding: 4,
              marginVertical: 10,
            }}
            onSubmitEditing={() => handleSearch()}
            onChangeText={setQuery}></TextInput>
        </View>
        <View>
          <Button
            title="Pokedex"
            onPress={() => navigation.navigate('Pokedex')}
          />
          <View style={{marginTop: 16}}>
            <Button
              title="Bookmarks"
              onPress={() => navigation.navigate('Bookmarks')}
            />
          </View>
        </View>
      </View>
    </>
  );
};
export default Search;
