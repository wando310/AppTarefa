import React, { useState, useEffect, useCallback } from "react";

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animation from 'react-native-animatable'

const Tasklist = ({ navigation }) => {

    const [listTask, setListTask] = useState([])    
    const getList = async () => {
        const task = await AsyncStorage.getItem('task')
        setListTask(JSON.parse(task))
    }
    
    //atualizando lista
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

    //Pesquisa tarefa
    const [ searchTasks, setSearchTasks ] = useState('')
    const [ arreyList, setArrayList ] = useState(listTask)    

    useEffect(() =>{
        if(searchTasks === ''){
            setArrayList(listTask)
        }else{
            setArrayList(
                listTask.filter( item => {
                    if(item.task.indexOf(searchTasks) > -1){
                        return true
                    }else{
                        return false
                    }
                })
            )
        }
    },[searchTasks])
   

    function renderItems({ item }) {
        return (
            <Animation.View animation='slideInLeft' duration={2000} key={item.id} style={styles.TaskList}>
                <Text style={styles.TaskListlist}>{item.task}</Text>
                <TouchableOpacity onPress={() => removeTask(item.id)}>
                    <Image source={require('../../assets/trash.png')} />
                </TouchableOpacity>
            </Animation.View>
        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={styles.containerBack}>
                <Image source={require('../../assets/arrow.png')} />
                <Text style={styles.backtext}>Voltar</Text>
            </TouchableOpacity>
            <View style={styles.containerInput}>
                <TextInput
                    placeholder="Pesquisar tarefa aqui..."
                    value={ searchTasks }
                    onChangeText={ t => setSearchTasks(t) }
                />
                <TouchableOpacity>
                    <Image source={require('../../assets/lupa.png')} />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Lista de tarefas</Text>

            <FlatList
                data={arreyList}
                renderItem={renderItems}
                keyExtractor={item => item.id}
            />

        </View>
    )
}

export default Tasklist;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#1D7692',
        paddingLeft: 40,
        paddingRight: 40,
    },
    TaskList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#00A1FE',
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        alignItems: 'center',
        margin: 3
    },
    TaskListlist: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700'
    },
    containerBack: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backtext: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 10,
        fontStyle: 'italic'
    },
    containerInput: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 50,
        padding: 7,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 60

    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        fontStyle: 'italic',
        marginTop: 30,
        marginBottom: 10
    }
})