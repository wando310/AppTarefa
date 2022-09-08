import React, { useState } from "react";

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animation from 'react-native-animatable'

const Home = ({ navigation }) => {

    const [task, setTask] = useState('')
    //adicionando lista no AssyncStorage
    const addList = async () => {

        const arrayId = ['ab', 'ba', 'cd', 'dc', 'e1', 'f3', '1f', '2s', '3d', '4y', '5u', '6h', '7r', '8y']

        const newId = []        
        for (let i = 0; i < arrayId.length; i++) {
            const randomid = Math.floor(Math.random() * arrayId.length)
            newId.push(arrayId[randomid])
        }

        const id = newId.toString()

        const taskList = {
            id,
            task
        }

        const response = await AsyncStorage.getItem('task')
        const previw = response ? JSON.parse(response) : []
        const data = [...previw, taskList]

        await AsyncStorage.setItem('task', JSON.stringify(data))

        getList()
        setTask('')

    }

    //pegando lista do AssyncStorage
    const [taskArray, setTaskArray] = useState([])
    const getList = async () => {
        const response = await AsyncStorage.getItem('task')
        const getTask = response ? JSON.parse(response) : {}

        setTaskArray(getTask)
    }

    //atualiza pagina
    getList()

    //removendo tarefa 
    const removeTask = async (id) => {

        const response = await AsyncStorage.getItem('task')
        const getTask = response ? JSON.parse(response) : []

        const data = Array.from(getTask)
        const newArray = []

        for (let i = 0; i < data.length; i++) {
            data[i].id !== id.toString() ? newArray.push({ id: data[i].id, task: data[i].task }) : ''
        }

        await AsyncStorage.setItem('task', JSON.stringify(newArray))
    }

    function renderTaskList({ item }) {
        return (
            <Animation.View animation='slideInLeft' duration={2000} key={item.id} style={styles.TaskList}>
                <Text  style={styles.TaskListlist}>{item.task}</Text>
                <TouchableOpacity onPress={() => removeTask(item.id)}>
                    <Image source={require('../../assets/trash.png')} />
                </TouchableOpacity>
            </Animation.View>
        )
    }

    const nextTasklist = () => {
        navigation.navigate('tasklist')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} >Lista de tarefas</Text>
            <Animation.Image animation='zoomIn' duration={2000} source={require('../../assets/logo_insert.png')} />
            <TouchableOpacity onPress={nextTasklist} style={styles.containerList}>
                <Text style={styles.list}>Veja sua lista</Text>
            </TouchableOpacity>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Insira tarefa aqui..."
                    value={task}
                    onChangeText={t => setTask(t)}
                />
                <TouchableOpacity onPress={addList}>
                    <Image source={require('../../assets/btnAdd.png')} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={taskArray}
                renderItem={renderTaskList}
                keyExtractor={item => item.id}
            />

        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor: '#1d7692'
    },
    title: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 15
    },
    list: {
        color: '#fff',
        fontWeight: '700'
    },
    input: {
        fontWeight: '700'
    },
    containerList: {
        backgroundColor: '#9734B9',
        padding: 2,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 40,
        marginTop: 20,
        marginLeft: 230
    },
    containerInput: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10
    },
    containerTaskList: {
        width: '80%',
        marginTop: 20,
    },
    TaskList: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#7618E1',
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        alignItems: 'center',
        margin: 2,
        marginLeft: 35
    },
    TaskListlist: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700'
    },
})