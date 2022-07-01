import React, {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import axios from 'axios';

const Search = ({navigation}) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    const name = query?.toLowerCase();
    try {
      const res = await axios.get(`https://pokeapi.co/api/v1/pokemon/${query}`);
      navigation.navigate('Details', {details: res.data});
      console.log('res', res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>What Pokemon are you looking for?</Text>
      <TextInput
        onSubmitEditing={() => handleSearch()}
        onChangeText={setQuery}></TextInput>
      <Button title="Pokedex" onPress={() => navigation.navigate('Pokedex')} />
    </View>
  );
};
export default Search;
