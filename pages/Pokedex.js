import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

const Pokedex = ({navigation}) => {
  const renderItem = ({item}) => {
    const handlePress = item => {
      navigation.navigate('Details', {details: item});
    };
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Image
          style={{height: 60, width: 60}}
          source={{uri: item?.sprites?.front_default}}></Image>
        <Text style={{padding: 1}}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  const [loader, setLoader] = useState();
  const [offset, setOffset] = useState(0);
  const [pokeList, setPokeList] = useState([]);

  const getPokeList = async () => {
    let list = [];
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`,
      );
      for (let i = 0; i < 10; i++) {
        const data = await axios.get(`${res?.data?.results[i]?.url}`);
        list = [...list, data?.data];
      }
      console.log('list', list, list.length);
      if (list.length === 10) setPokeList([...pokeList, ...list]);
      list = [];
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    getPokeList();
  }, [offset]);
  console.log('pokeList', pokeList);

  return (
    <>
      <FlatList
        // style={{marginBottom: 60}}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (pokeList.length >= 10) setOffset(offset + 10);
          // getPokeList();
        }}
        extraData={offset}
        data={pokeList}
        maxToRenderPerBatch={10}
        renderItem={renderItem}></FlatList>
      {loader && <Text>loading...</Text>}
    </>
  );
};

export default Pokedex;
