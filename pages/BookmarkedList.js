import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

import {BookmarkStore} from '../store/bookmarks';

function BookmarkedList() {
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
  const bookmarks = BookmarkStore.useState(s => s.bookmarks);

  console.log('store', bookmarks);
  return (
    <View>
      <FlatList
        // style={{marginBottom: 60}}

        data={bookmarks?.length > 0 && bookmarks}
        maxToRenderPerBatch={10}
        renderItem={renderItem}></FlatList>
    </View>
  );
}

export default BookmarkedList;
