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
          Authorization: `Bearer ${token}`, // Obtenção do Token de autenticação
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
    // Imprime a lista de exercícios
    console.log(exercises);

    // Valores passados para o Ex1
    const a = exercises['soma']['entrada']['a'];
    const b = exercises['soma']['entrada']['b'];
    const resultado_1 = soma(a, b); // Resolvendo o exercício
    await submit_answer(token,"soma",resultado_1);

    // Valor passados para o Ex2
    const str = exercises['tamanho-string']['entrada']['string'];
    const resultado_2 = tamanho_string(str); // Resolvendo o exercício
    await submit_answer(token,"tamanho-string",resultado_2);

    // Valores passados para o Ex3
    const email = exercises['nome-do-usuario']['entrada']['email'];
    const resultado_3 = nome_usuario(email); // Resolvendo o exercício
    await submit_answer(token,"nome-do-usuario",resultado_3);

    // Valores passados para o Ex4
    const v = exercises['jaca-wars']['entrada']['v'];
    const theta = exercises['jaca-wars']['entrada']['theta'];
    const resultado_4 = jaca_wars(v,theta); // Resolvendo o exercício
    console.log(v);
    console.log(theta);
    console.log(resultado_4);
    await submit_answer(token,"jaca-wars",resultado_4);

    // Valor passados para o Ex5
    const ano = exercises['ano-bissexto']['entrada']['ano'];
    const resultado_5 = bissexto(ano); // Resolvendo o exercício
    await submit_answer(token,"ano-bissexto",resultado_5);

    // Valores passados para o Ex 6
    const raio = exercises['volume-da-pizza']['entrada']['z'];
    const altura = exercises['volume-da-pizza']['entrada']['a'];
    const resultado_6 = volume(raio,altura); // Resolvendo o exercício
    await submit_answer(token,"volume-da-pizza",resultado_6);
    
    // Valores passados para o Ex 7
    const s0 = exercises['mru']['entrada']['s0'];
    const vel = exercises['mru']['entrada']['v'];
    const t = exercises['mru']['entrada']['t'];
    const resultado_7 = mru(s0,vel,t); // Resolvendo o exercício  
    await submit_answer(token,"mru",resultado_7);

    // Valores passados para o Ex 8
    const stri = exercises['inverte-string']['entrada']['string'];
    const resultado_8 = inverte(stri); // Resolvendo o exercício
    await submit_answer(token,"inverte-string",resultado_8);

    // Valores passados para o Ex 9
    const objeto = exercises['soma-valores']['entrada']['objeto'];
    const resultado_9 = soma_valores(objeto); // Resolvendo o exercício
    submit_answer(token,"soma-valores",resultado_9);

    // Valores passados para o Ex 10
    const n = exercises['n-esimo-primo']['entrada']['n'];
    const resultado_10 = n_primo(n); // Resolvendo o exercício
    await submit_answer(token,"n-esimo-primo",resultado_10);

  } catch (error) {
    console.error("Erro:", error);
  };

}

function soma(a, b) {
  return a + b;
}

function tamanho_string(str){
  return str.length;
}

function nome_usuario(email){
  return email.split('@')[0];
}

function jaca_wars(v, theta){
  theta_rad = theta * Math.PI / 180;
  dist = (v**2 * Math.sin(2*theta_rad))/9.8;

  const alvo = 100;
  const raio = 2;

  if (dist < alvo - raio) {
    return -1;
  }
  if (dist > alvo + raio) {
    return 1;
  } 
  if (alvo-raio<=dist && dist<=alvo+raio){  
    return 0;
  }
}

function bissexto(ano){
  if (ano % 400 == 0){
    return true;
  } else if (ano % 100 == 0){
    return false;
  } else if (ano % 4 == 0){
    return true;
  } else {
    return false;
  }
}

function volume(raio,altura){
  area = Math.PI * raio**2 * altura;
  return Math.round(area);
}

function mru(s0,vel,t){
  return s0 + vel*t;
}

function inverte(stri){
  return stri.split('').reverse().join('');
}

function soma_valores(objeto) {
  let soma = 0;

  for (let key in objeto) {
    if (objeto.hasOwnProperty(key)) {
      soma += objeto[key];
    }
  }

  return soma;
}


function n_primo(n) {
  let count = 0;
  let num = 1;

  const isPrimo = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  while (count < n) {
    num++;
    if (isPrimo(num)) {
      count++;
    }
  }

  return num;
}




main();
