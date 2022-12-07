import { useState } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, FlatList, TextInput } from 'react-native';
import TodoItem from './components/TodoItem';

let textInput = '';

export default function App() {
  const [state, setState] = useState({
    total: 0,
    checked: 0,
    todos: []
  });

  function deleteDoto(key, checked) {
    console.log(checked);
    setState({
      todos: state.todos.filter((i) => i.key !== key),
      checked: state.checked + (checked ? -1 : 0),
      total: state.total - 1
    });
  }

  function addTodo(text) {
    setState({
      todos: [...state.todos, { key: Math.random(), text: text, checked: false }],
      checked: state.checked,
      total: state.total + 1,
    });
  }

  function checkTodo(key, checked) {
    setState({
      todos: state.todos.map((i) => {
        if (i.key === key) {
          i.checked = !i.checked;
        }

        return i;
      }),
      checked: state.checked + (checked ? -1 : 1),
      total: state.total,
    });
  }

  function addTodoClick() {
    addTodo(textInput);
  }

  function renderTodo(todo) {
    return (
      <TodoItem
        text={todo.item.text}
        checked={todo.item.checked}
        onCheck={() => checkTodo(todo.item.key, todo.item.checked)}
        onPress={() => deleteDoto(todo.item.key, todo.item.checked)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My DOTO App</Text>
      <View style={styles.statusbar}>
        <Text style={{ fontSize: 17 }}>Item count: {state.total}</Text>
        <Text style={{ fontSize: 17 }}>Unchecked count: {state.total - state.checked}</Text>
      </View>

      <TextInput style={styles.input} placeholder='Todo ...' onChangeText={text => textInput = text} />
      <Button style={styles.addtodobutton} title='Add TODO' onPress={addTodoClick} />

      <FlatList style={styles.list}
        data={state.todos}
        renderItem={renderTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statusbar: {
    justifyContent: 'flex-start',
    Items: 'center',
    alignSelf: 'stretch',
    height: 60,
    padding: 10,
    margin: 5
  },

  addtodobutton: {
    margin: 5
  },

  list: {
    flex: 15,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    marginTop: 5,
  },

  container: {
    flex: 1,

    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingTop: StatusBar.currentHeight,
  },

  input: {
    alignSelf: 'stretch',
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    height: 40,
    borderWidth: 1,
    borderColor: 'black'
  },

  header: {
    fontSize: 30
  }
});
