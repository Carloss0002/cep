import { useRef, useState } from 'react';
import  api  from './src/services/api'
import { StyleSheet, 
          Text, 
          View, 
          TextInput, 
          TouchableOpacity, 
          SafeAreaView, 
          Keyboard, 
          ActivityIndicator } from 'react-native';

export default function App() {
  const [cep, setCep] = useState("")
  const [cepUSer, setCepUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  function limpar(){
    setCep('')
    setCepUser(null)
    inputRef.current.focus()
  }
  async function buscar(){
    setLoading(true)
     if(cep.length == ''){
       alert('CEP inválido')
       setCep('')
       setLoading(false)
       return;
      } else {
        await api.get(`/${cep}/json`)
        .then(response=>{
          setCepUser(response.data)
          setLoading(false)
          Keyboard.dismiss()
        })
        .catch(error=>console.log(error))
      }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 00000000"
          maxLength={8}
          value={cep}
          onChangeText={setCep}
          keyboardType={'number-pad'}
          autoFocus={true}
          ref={inputRef}
        />
        <View style={styles.areaBtn}>
            <TouchableOpacity style={[styles.btn, {backgroundColor: '#1d75cd'}]}>
              <Text 
                style={styles.btnText}
                onPress={buscar}
              >
                Buscar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.btn, {backgroundColor: '#FF0000'}]}
              onPress={limpar}
            >
              <Text style={styles.btnText}>Limpar</Text>
            </TouchableOpacity>
        </View>
      </View>
      {
        loading &&
        <View style={styles.loading}>
          <ActivityIndicator color={'#FF0000'} size={40}/>
        </View>
      }
      {
      cepUSer !== null &&
      <View style={styles.resultado}>
        <Text style={styles.itemText}>CEP: {cepUSer.cep}</Text>
        <Text style={styles.itemText}>Logradouro: {cepUSer.logradouro}</Text>
        <Text style={styles.itemText}>Bairro: {cepUSer.bairro}</Text>
        <Text style={styles.itemText}>Cidade: {cepUSer.localidade}</Text>
        <Text style={styles.itemText}>Estado: {cepUSer.uf}</Text>
      </View>  
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 30
  },
  text:{
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15
  },
  input:{
     backgroundColor: '#FFF',
     borderWidth: 1,
     borderColor: "#DDD",
     borderRadius: 5,
     width: '90%',
     padding: 10
  },
  areaBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-evenly',
    width: '100%'
  },
  btn:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  btnText:{
    color: '#FFF'
  },
  loading:{
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
  }, 
  resultado:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText:{
    color: '#FFF',
    fontSize: 22
  }
});
