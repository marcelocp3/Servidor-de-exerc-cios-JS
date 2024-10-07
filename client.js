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

// Função para submeter a resposta do exercício
function submit_answer(slug, token, answer) {
  return axios
    .post(
      `https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, // URL do exercício
      { resposta: answer }, // Resposta no corpo da requisição
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Token de autenticação
        }
      }
    )
    .then((response) => {
      console.log("Resposta submetida com sucesso:", response.data);
    })
    .catch((error) => {
      console.error("Erro ao submeter a resposta:", error);
    });
}

// Função principal
async function main() {
  try {
    // Obtenção do token
    let token = await get_token();
    console.log("Token:", token);

    // Exemplo do primeiro exercício
    const slug = 'soma'; // Slug do exercício
    const resultado = soma(6661, 1573); // Resolvendo o exercício

    console.log(`O resultado de a + b é: ${resultado}`);

    // Submetendo a resposta do exercício
    await submit_answer(slug, token, resultado);
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Função para somar valores (exercício 1)
function soma(a, b) {
  return a + b;
}

main();
