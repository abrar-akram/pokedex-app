import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';

function PokemonDetails({route, navigation}) {
  const pokemon = route.params.details;
  console.log('pokemon', pokemon);
  return (
    <View>
      <Text>{pokemon?.name}</Text>
      {pokemon.types.map((el, i) => (
        <Text index={i}>{el.type?.name}</Text>
      ))}
      <Image
        style={{height: 60, width: 60}}
        source={{uri: pokemon?.sprites?.front_default}}
      />
    </View>
  );
}

export default PokemonDetails;
