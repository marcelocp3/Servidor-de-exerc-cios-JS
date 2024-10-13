const axios = require("axios");

// Função para obter o token
function get_token() {
  return axios
    .post(
      "https://tecweb-js.insper-comp.com.br/token",
      { username: "marcelocp3" }, 
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )
    .then((response) => response.data.accessToken);
}

// Função para obter a lista de exercícios
function get_exercises(token) {
  return axios
    .get("https://tecweb-js.insper-comp.com.br/exercicio", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`, 
      }
    })
    .then((response) => response.data);
}

// Função para enviar as respostas
function submit_answer(token, slug , answer) {
  return axios
    .post(
      `https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, 
      { resposta: answer }, 
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
    );
}

async function main(){
  // Obtendo e mostrando token
  let token = await get_token();
  console.log("Token:", token);

  // Obtendo e mostrando lista de exercícios
  let exercises = await get_exercises(token);
  console.log(exercises);

  //Ex1
  const a = exercises['soma']['entrada']['a'];
  const b = exercises['soma']['entrada']['b'];
  const resultado_1 = soma(a, b); 
  await submit_answer(token,"soma",resultado_1);

  //Ex2
  const str = exercises['tamanho-string']['entrada']['string'];
  const resultado_2 = tamanho_string(str); 
  await submit_answer(token,"tamanho-string",resultado_2);

  //Ex3
  const email = exercises['nome-do-usuario']['entrada']['email'];
  const resultado_3 = nome_usuario(email); 
  await submit_answer(token,"nome-do-usuario",resultado_3);

  //Ex4
  const v = exercises['jaca-wars']['entrada']['v'];
  const theta = exercises['jaca-wars']['entrada']['theta'];
  const resultado_4 = jaca_wars(v,theta); 
  await submit_answer(token,"jaca-wars",resultado_4);

  //Ex5
  const ano = exercises['ano-bissexto']['entrada']['ano'];
  const resultado_5 = bissexto(ano); 
  await submit_answer(token,"ano-bissexto",resultado_5);

  //Ex 6
  const raio = exercises['volume-da-pizza']['entrada']['z'];
  const altura = exercises['volume-da-pizza']['entrada']['a'];
  const resultado_6 = volume(raio,altura); 
  await submit_answer(token,"volume-da-pizza",resultado_6);
    
  //Ex 7
  const s0 = exercises['mru']['entrada']['s0'];
  const vel = exercises['mru']['entrada']['v'];
  const t = exercises['mru']['entrada']['t'];
  const resultado_7 = mru(s0,vel,t);   
  await submit_answer(token,"mru",resultado_7);

  //Ex 8
  const stri = exercises['inverte-string']['entrada']['string'];
  const resultado_8 = inverte(stri); 
  await submit_answer(token,"inverte-string",resultado_8);

  //Ex 9
  const objeto = exercises['soma-valores']['entrada']['objeto'];
  const resultado_9 = soma_valores(objeto); 
  await submit_answer(token,"soma-valores",resultado_9);

  //Ex 10
  const n = exercises['n-esimo-primo']['entrada']['n'];
  const resultado_10 = n_primo(n); 
  await submit_answer(token,"n-esimo-primo",resultado_10);

  // Ex 11
  const strings = exercises['maior-prefixo-comum']['entrada']['strings'];
  const resultado_11 = maior_prefixo_comum(strings);
  await submit_answer(token, "maior-prefixo-comum", resultado_11);
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
