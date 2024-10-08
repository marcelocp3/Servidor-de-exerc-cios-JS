const axios = require("axios");

// Função para obter o token
function get_token() {
  return axios
    .post(
      "https://tecweb-js.insper-comp.com.br/token",
      { username: "marcelocp3" }, // Substitua pelo seu nome de usuário Insper, se necessário
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )
    .then((response) => response.data.accessToken)
    .catch((error) => {
      console.error("Erro ao obter o token:", error);
    });
}

// Função para obter a lista de exercícios
function get_exercises(token) {
  return axios
    .get("https://tecweb-js.insper-comp.com.br/exercicio", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Incluímos o token no header Authorization
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao obter a lista de exercícios:", error);
    });
}

function submit_answer(token, slug , answer) {
  return axios
    .post(
      `https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, // URL do exercício
      { resposta: answer }, // Corpo da requisição no formato JSON { resposta: valor }
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Token de autenticação
        }
      }
    );
}

async function main(){
  try {
    // Obtemos o token
    let token = await get_token();
    console.log("Token:", token);
    // Utilizamos o token para obter a lista de exercícios

    let exercises = await get_exercises(token);
    console.log(exercises);

    // const a = exercises['soma']['entrada']['a'];
    // const b = exercises['soma']['entrada']['b'];

    // console.log(a);
    // console.log(b);

    // const str = exercises['tamanho-string']['entrada']['string'];

    const email = exercises['nome-do-usuario']['entrada']['email'];



    const resultado = nome_usuario(email); // Resolvendo o exercício
    
    console.log(`O resultado é: ${resultado}`);
    // Submetendo a resposta do exercício com o token e o resultado
    await submit_answer(token,'nome-do-usuario',resultado);

  } catch (error) {
    console.error("Erro:", error);
  };

}

function soma_valores(a, b) {
  return a + b;
}

function tamanho_string(str){
  return str.length;
}

function nome_usuario(email){
  return email.split('@')[0];
}



main();
