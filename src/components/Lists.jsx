import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

const Lists = () => {
  const [list, setList] = useState({ title: '' });
  const [lists, setLists] = useState([]);

  const handleAddList = () => {
    if (list.title.trim() !== '') {
      setLists([...lists, list]);
      setList({ title: '' });
    }
  };

  const onPressActionOptions = (index) => {
    const update = () => {
      if (lists[index].isCompleted) {
        return '未完了に戻す';
      } else {
        return '完了しました';
      }
    };

    Alert.alert(`${lists[index].title}`, '', [
      {
        text: update(),
        style: 'cancel',
        onPress: () => handleUpdateList(index),
      },
      {
        text: '削除します',
        style: 'destructive',
        onPress: () => onPressRemoveAlert(index),
      },
      {
        text: 'キャンセル',
        style: 'cancel',
      },
    ]);
  };

  const handleUpdateList = (index) => {
    setLists((prevLists) => {
      return prevLists.map((item, i) => {
        if (i === index) {
          return { ...item, isCompleted: !item.isCompleted };
        } else {
          return item;
        }
      });
    });
  };

  const handleRemoveList = (index) => {
    const newLists = [...lists];
    newLists.splice(index, 1);
    setLists(newLists);
  };

  const onPressRemoveAlert = (index) => {
    Alert.alert(`${lists[index].title}`, `を本当に削除しますか？`, [
      {
        text: 'いいえ',
        style: 'cancel',
      },
      { text: 'はい', onPress: () => handleRemoveList(index) },
    ]);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.listItem}>
        <View style={styles.listItemList}>
          <TouchableOpacity>
            <Text style={lists[index].isCompleted ? styles.doneListItem : styles.inputListItem}>
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => onPressActionOptions(index)}>
            <Icon style={styles.actionButton} name="more-horiz" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="タスクの追加"
            value={list.title}
            returnKeyType="done"
            onSubmitEditing={handleAddList}
            onChangeText={(text) => setList({ title: text, isCompleted: false })}
          />
        </View>
        <FlatList data={lists} renderItem={renderItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'skyblue',
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 10,
  },
  editText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'right',
  },
  main: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemList: {
    flex: 1,
  },
  doneListItem: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  inputListItem: {
    flexGrow: 1,
    width: '100%',
  },
  actionButton: {
    padding: 10,
  },
});

export default Lists;