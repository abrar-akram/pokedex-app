import React, {useEffect, useState} from 'react';
import {Text, View, Button, Image} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {BookmarkStore} from '../store/bookmarks';

function PokemonDetails({route, navigation}) {
  const pokemon = route.params.details;
  const bookmarks = BookmarkStore.useState(s => s.bookmarks);
  const [exists, setExists] = useState(false);

  const checkExists = () => {
    bookmarks?.map(el =>
      el?.id === pokemon?.id ? setExists(true) : setExists(false),
    );
  };

  useEffect(() => {
    checkExists();
  }, [bookmarks, exists]);

  console.log('store', bookmarks);
  console.log('pokemon', pokemon);
  return (
    <View>
      {exists ? (
        <Button
          title="Remove from Bookmarks"
          onPress={() => {
            setExists(false);
            BookmarkStore.update(s => {
              s.bookmarks = bookmarks?.filter(el => el.id !== pokemon?.id);
            });
          }}
        />
      ) : (
        <Button
          title="Save as Bookmark"
          onPress={() =>
            BookmarkStore.update(s => {
              s.bookmarks = [...s.bookmarks, pokemon];
            })
          }
        />
      )}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>{pokemon?.name}</Text>
        <Text>#{pokemon?.id}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Type:</Text>
        {pokemon.types.map((el, i) => (
          <Text index={i}>{el.type?.name}</Text>
        ))}
      </View>
      <Image
        style={{
          height: 160,
          width: 160,
        }}
        source={{uri: pokemon?.sprites?.front_default}}
      />
    </View>
  );
}

export default PokemonDetails;
