//Não foi possível fazer todas as requisições, acaba dando erro
// Estava pegando o response.data.numbers.length para verificar se haviam dados
import Axios from "axios";
import express from 'express';
import fetch from "node-fetch";
const PORT = process.env.PORT || 3001;
const app = express();


const requireData = async () => {
  //1. Extract
  let page = 1;
  let requestUnion1 = [];
  let requestUnion2 = [];
  let request = []; 
    while(page <= 10000){ 
      const result1 = await Axios.get(`http://challenge.dienekes.com.br/api/numbers?page=${page}`);
      let result2 = result1.data.numbers;
      var arrayToString = JSON.stringify(Object.assign({}, result2));  // convert array to string
      var stringToJsonObject = JSON.parse(arrayToString);  // convert string to json object
      
      request[page] = await stringToJsonObject;
      requestUnion1 = [...request];
      page++;
    }
 
    for (let i = 1; i < requestUnion1.length; i++) {
      for (let index = 0; index < 100; index++) {
        let reune = requestUnion1[i][index];
        requestUnion2.push(reune);
      }
    }
    return requestUnion2;
}

const transformData = async () => {
  
  //2. Transform
  let vector = await requireData();;
  let aux;
  for (let i = 0; i < 100; i++){
    for (let j = i + 1; j < 100; j++){
      if(vector[i] > vector[j]){
        aux = vector[i];
        vector[i] = vector[j];
        vector[j] = aux;
      }
    }  
  }
  return vector;
}





//3. Load
app.get("/", async (req, res) => {
  let brasil = await transformData();
  res.send(brasil)
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
