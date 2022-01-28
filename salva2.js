//Não foi possível fazer todas as requisições, acaba dando erro
// Estava pegando o response.data.numbers.length para verificar se haviam dados
import Axios from "axios";
import express from 'express';
const PORT = process.env.PORT || 3001;
const app = express();

const requireData = async () => {
  let page = 1;
  let todosjuntos = [];
  let todos = []; 
  /*for (let index = 1; index <= 20; index++) {
    result1Mock.push(index);
  };*/
  
    
    while(page <= 2){ 
        const result1 = await Axios.get(`http://challenge.dienekes.com.br/api/numbers?page=${page}`);
     
        console.log("+++++++++++++++++++++++++++++",result1.data.numbers);
      let result2 = result1.data.numbers;
      var arrayToString = JSON.stringify(Object.assign({}, result2));  // convert array to string
      var stringToJsonObject = JSON.parse(arrayToString);  // convert string to json object
      //console.log("9999999999999999999",stringToJsonObject);
      
      
        todos[page] = await stringToJsonObject;
        todosjuntos = [...todos];
        
        page++;
       
    }
    console.log("============================================", todosjuntos);
    //while (response ) {
      
      //response.data.numbers.length 
    //}
    
}
requireData();
/*
  async function groupData() {
    const dados = requireData();
    console.log("****************",dados);
    return dados;
  }
  console.log(groupData());
   
  /*
Axios.get('/get', (req,res) => {
  const dados = requireData();
  console.log("", dados);
  res.send(dados);
})
*/


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
