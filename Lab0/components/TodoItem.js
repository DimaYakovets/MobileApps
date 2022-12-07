import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native"

export default function TodoItem(props) {
    return (
        <View style={styles.todoItem}>
            <Text style={props.checked ? styles.todoItem__text_crossed : styles.todoItem__text}>{props.text}</Text>
            <TouchableOpacity style={styles.todoItem__check} onPress={props.onCheck}>
                <Text style={styles.todoItem__check_label}>{props.checked ? '+' : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.todoItem__delete} onPress={props.onPress}>
                <Text style={styles.todoItem__delete_label}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    todoItem: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: 'center'
    },

    todoItem__text: {
        flex: 8,
        margin: 5,
        fontSize: 17
    },

    todoItem__text_crossed: {
        flex: 8,
        margin: 5,
        fontSize: 17,
        textDecorationLine: 'line-through',
        color: '#aaa'
    },

    todoItem__check: {
        justifyContent: 'flex-end',
        backgroundColor: 'green',
        fontStyle: 'bold',
        margin: 5,
        padding: 5,
        height: 35,
        width: 35
    },

    todoItem__delete: {
        backgroundColor: 'red',
        margin: 5,
        padding: 5
    },

    todoItem__check_label: {
        fontSize: 20,
        padding: 0,
        textAlign: 'center',
        textAlignVertical: 'top',
        color: 'white'
    },
    todoItem__delete_label: {
        fontSize: 17,
        color: 'white'
    },

});
