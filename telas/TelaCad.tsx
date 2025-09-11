import { useState, useEffect } from "react";
import {View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native'
import Cliente from '../components/Cliente';
import api from '../components/Api';


import { useNavigation } from "@react-navigation/native";

export default function TelaCad() {
    
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [saldo, setSaldo] = useState('');
        return(
            <>
                <View style={styles.container}>
                    <Text> Cadastro de Cliente </Text>

                    <View style={styles.bloco}>
                        <TextInput
                            placeholder="Digite seu nome"
                            value={nome}
                            onChangeText={(value)=> setNome(value)}
                        />
                        <TextInput
                            placeholder="Digite seu CPF"
                            value={cpf}
                            onChangeText={(value)=> setCpf(value)}
                        />
                        <TextInput
                            placeholder="Digite seu saldo"
                            value={saldo}
                            onChangeText={(value)=> setSaldo(value)}
                        />

                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.txtBtn} onPress={async ()=> {
                                try{
                                    const resp = await api.post('clientes', {
                                        nome: nome,
                                        cpf: cpf,
                                        saldo: saldo
                                    });

                                    alert(JSON.stringify(resp.data.message));
                                    navigation.navigate('ListarClientes' as never);
                                }catch{
                                    alert("DEUU B.O!!!")
                                }
                            }}

                            >Cadastrar</Text>
                        </TouchableOpacity>
                        
                    </View>

                </View>
            </>
            
        )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

})