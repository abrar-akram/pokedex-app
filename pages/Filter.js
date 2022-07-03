import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

function Filter({route, navigation}) {
  const renderItem = ({item}) => {
    const handlePress = item => {
      navigation.navigate('Details', {details: item});
    };
    return (
      <TouchableOpacity
        onPress={() => {
          setFilter(`${selectedFilterName}/${item?.name}`);
          navigation.navigate('Pokedex');
        }}>
        {/* <View> */}
        <Text style={{padding: 1, fontSize: 24}}>{item.name}</Text>
        {/* {item.types.map((el, i) => (
            <Text index={i}>{el.type?.name}</Text>
          ))}
        </View>
        <Image
          style={{height: 60, width: 60}}
          source={{uri: item?.sprites?.front_default}}></Image> */}
      </TouchableOpacity>
    );
  };

  const setFilter = route.params.setFilter;

  const [offset, setOffset] = useState(0);
  const [selectedFilterList, setSelectedFilterList] = useState([]);
  const [selectedFilterName, setSelectedFilterName] = useState('ability');
  const [selectedFilter, setSelectedFilter] = useState();

  const getFilters = async () => {
    let list = [];
    try {
      console.log(selectedFilterName);
      const res = await axios.get(
        `https://pokeapi.co/api/v2/${selectedFilterName}/?limit=10&offset=${offset}`,
      );
      list = res?.data?.results;
      console.log('filter data', res);
      setSelectedFilterList([...selectedFilterList, ...list]);
    } catch (err) {
      console.log('get filter error', err);
    }
  };

  useEffect(() => {
    getFilters();
  }, [offset, selectedFilterName]);

  console.log('filter data', selectedFilterList);

  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View>
        <TouchableOpacity
          onPress={() => {
            if (selectedFilterName !== 'ability') {
              setOffset(0);
              setSelectedFilterList([]);
              setSelectedFilterName('ability');
            }
          }}>
          <Text>Ability</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            if (selectedFilterName !== 'characteristic') {
              setOffset(0);
              setSelectedFilterList([]);
              setSelectedFilterName('characteristic');
            }
          }}>
          <Text>Characterisrcs</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            if (selectedFilterName !== 'egg-group') {
              setOffset(0);
              setSelectedFilterList([]);
              setSelectedFilterName('egg-group');
            }
          }}>
          <Text>Egg Group</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (selectedFilterName !== 'pokemon-habitat') {
              setOffset(0);
              setSelectedFilterList([]);
              setSelectedFilterName('pokemon-habitat');
            }
          }}>
          <Text>Habitat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (selectedFilterName !== 'gender') {
              setOffset(0);
              setSelectedFilterList([]);
              setSelectedFilterName('gender');
            }
          }}>
          <Text>Gender</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        // style={{marginBottom: 60}}
        extraData={(offset, selectedFilterName)}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setOffset(offset + 10);
          // getPokeList();
        }}
        data={selectedFilterList?.length > 0 && selectedFilterList}
        maxToRenderPerBatch={10}
        renderItem={renderItem}></FlatList>
    </View>
  );
}

export default Filter;
