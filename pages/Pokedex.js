import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

const Pokedex = ({navigation}) => {
  const renderItem = ({item}) => {
    const handlePress = item => {
      navigation.navigate('Details', {details: item});
    };
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'green',
          display: 'flex',
          flexDirection: 'row',
          marginVertical: 12,
        }}
        onPress={() => handlePress(item)}>
        <View>
          <Text style={{padding: 1, fontSize: 24}}>{item?.name}</Text>
          {item.types.map((el, i) => (
            <Text index={i}>{el.type?.name}</Text>
          ))}
        </View>
        <Image
          style={{height: 60, width: 60}}
          source={{uri: item?.sprites?.front_default}}></Image>
      </TouchableOpacity>
    );
  };

  const [loader, setLoader] = useState();
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState(0);
  const [pokeList, setPokeList] = useState([]);

  const getPokeList = async () => {
    let list = [];
    setLoader(true);
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/${
          filter || `pokemon?limit=10&offset=${offset}`
        }`,
      );
      if (filter) {
        for (
          let i = 0;
          i < res?.data?.pokemon_species.length > 0
            ? res?.data?.pokemon_species.length
            : res?.data?.pokemon.length;
          i++
        ) {
          const data = await axios.get(
            `${
              res?.data?.pokemon_species.length > 0
                ? res?.data?.pokemon_species[i]?.url
                : res?.data?.pokemon[i]?.pokemon?.url
            }`,
            console.log('list2', data),
          );
          list = [...list, data?.data];
        }
        setPokeList(list);
        setLoader(false);
      } else {
        for (let i = 0; i < 10; i++) {
          const data = await axios.get(`${res?.data?.results[i]?.url}`);
          list = [...list, data?.data];
        }
        if (list?.length === 10) setPokeList([...pokeList, ...list]);
      }
      list = [];
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleFilterPress = item => {
    navigation.navigate('Filter', {setFilter: setFilter});
  };

  useEffect(() => {
    getPokeList();
  }, [offset, filter]);
  console.log(
    'pokeList',
    pokeList,
    `https://pokeapi.co/api/v2/${
      filter || 'pokemon'
    }?limit=10&offset=${offset}`,
  );

  return (
    <View style={{display: 'flex'}}>
      <TouchableOpacity
        style={{display: 'flex', alignItems: 'flex-end'}}
        onPress={() => handleFilterPress()}>
        <Text style={{paddingVertical: 20, fontSize: 20}}>Filter</Text>
      </TouchableOpacity>
      <FlatList
        // style={{marginBottom: 60}}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (pokeList?.length >= 10) setOffset(offset + 10);
          // getPokeList();
        }}
        extraData={(offset, filter)}
        data={pokeList?.length > 0 && pokeList}
        maxToRenderPerBatch={10}
        renderItem={renderItem}></FlatList>
      {loader && <Text>loading...</Text>}
    </View>
  );
};

export default Pokedex;
