import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import axios from 'axios';

const renderItem = ({item}) => {
  return (
    <View>
      <Image
        style={{height: 60, width: 60}}
        source={{uri: item?.sprites?.front_default}}></Image>
      <Text style={{padding: 1}}>{item?.name}</Text>
    </View>
  );
};

const Pokedex = () => {
  const [offset, setOffset] = useState(10);
  const [pokeList, setPokeList] = useState([]);

  const getPokeList = async () => {
    try {
      let list = [];
      for (let i = 1; i <= offset; i++) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        // const data = await axios.get(`${res?.data?.results?.url}`);
        // res?.data?.results?.map(() => setPokeList([...pokeList, [data]]));
        // console.log('pokelist', res);
        list = [...list, res?.data];
      }
      setPokeList(list);
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    getPokeList();
  }, [offset]);

  console.log(pokeList);

  return (
    <FlatList
      onEndReachedThreshold={0.5}
      onEndReached={() => setOffset(offset + 10)}
      extraData={offset}
      data={pokeList}
      renderItem={renderItem}></FlatList>
  );
};

export default Pokedex;
