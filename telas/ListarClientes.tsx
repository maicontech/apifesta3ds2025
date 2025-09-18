import { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import Cliente from '../components/Cliente';

import api from '../components/Api';

import { useNavigation } from '@react-navigation/native';

export default function ListarClientes() {

  const navigation = useNavigation();

    const [clientes, setCliente] = useState<any[]>([]);

    async function buscaClientes(){
        const response = await api.get('clientes');
        setCliente(response.data);
    }
    async function excluirCliente(id:number){
      try{
        await api.delete(`clientes/${id}`);
        Alert.alert('Sucesso', 'Cliente excluido com sucesso!');
        setCliente(clientes.filter(c => c.id !== id));
      } catch (error) {
        Alert.alert('Erro', 'Não foi possivel excluir o cliente.');
      }
    }

    useEffect(
        ()=>{
            buscaClientes();
        }
    );
 return (
    <>
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('TelaCad' as never)}>
                <Text style={styles.txtBtn}>Cadastrar Cliente</Text>
            </TouchableOpacity>      

            <FlatList 
                data={clientes}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=><Cliente nome={item.nome} 
                cpf={item.cpf} saldo={item.saldo} id={item.id}
                onDelete={excluirCliente}/>}
                style={styles.lista}
            />
        </View>       
    </>   
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
  },
  titulo:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:20
  },
  btn:{
    backgroundColor:'#669988',
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:20,
    padding:20,
    borderRadius:20
  },
  txtBtn:{
    textAlign:'center',
    fontSize:20
  },
  bloco:{
    width:'100%'
  },
  lista:{
    width:'80%',
    height:'70%',
    margin:'10%'
  }
});