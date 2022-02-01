
//dicionário de cores
var engine = { 
  "cores": ['green', 'purple', 'pink', 'red', 'yellow', 'orange', 'grey', 'black', 'white', 'blue', 'brown'],
  "hexadecimais":{
    "green": "#03fc03",
    "purple": "#ca03fc",
    "pink": "#fc037f",
    "red": "#fc030b",
    "yellow": "#fce303",
    "orange": "#fc6603",
    "grey": "#696766",
    "black": "#000000",
    "white": "#ffffff",
    "blue": "#1134d1",
    "brown": "#544138",
  },
  "moedas": 0 // contador de moedas

}

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');

// função para sortear uma cor

function sortearcor(){
  var indexCorsorteada = Math.floor(Math.random() * engine.cores.length);
  var legendaCorDaCaixa = document.getElementById('cor-na-caixa');
  var nomeCorSorteada = engine.cores[indexCorsorteada];

  legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase(); // alterando o texto dinamicamente


  return engine.hexadecimais[nomeCorSorteada];
  
}

// Função sortear cor na caixa

function aplicarCorNaCaixa(nomeDaCor){
  var caixaDasCores = document.getElementById('cor-atual');
  caixaDasCores.style.backgroundColor = nomeDaCor;
  caixaDasCores.style.backgroundImage = "url('/img/caixa-fechada.png')";
  caixaDasCores.style.backgroundSize = "100%";

}

// função para mostrar a pontuação e tocar um som

function atualizaPontuacao(valor){
  var pontuacao = document.getElementById('pontuacao-atual');

  engine.moedas += valor;

  if(valor < 0){
    audioErrou.play();
  } else {
    audioMoeda.play();
  }

  pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(sortearcor())


// API de reconhecimento de voz

var btnGravador =  document.getElementById('btn-responder');
var transcricaoAudio = '';
var respostaCorreta = '';

if(window.SpeechRecognition || window.webkitSpeechRecognition){
  var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  var gravador = new SpeechAPI();

  gravador.continuos = false;
  gravador.lang = 'en-US';



  gravador.onstart = function(){
    btnGravador.innerText = 'Estou ouvindo';
    btnGravador.style.backgroundColor = 'white';
    btnGravador.style.color = 'black';

  }

  gravador.onend = function(){
    btnGravador.innerText = 'responder';
    btnGravador.style.backgroundColor = 'transparent';
    btnGravador.style.color = 'white';
  }

  gravador.onresult = function(event){
    transcricaoAudio = event.results[0][0].transcript.toUpperCase();
    respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();
    
    if(transcricaoAudio === respostaCorreta){
      atualizaPontuacao(1);
      
    } else {
      atualizaPontuacao(-1);
      alert(`O Mario entendeu ( ${transcricaoAudio = event.results[0][0].transcript.toUpperCase()} ), tente novamente!`);
    }

    aplicarCorNaCaixa(sortearcor());

  }


} else {
  alert('O navegador não tem suporte');
}


btnGravador.addEventListener('click', function(e){
  gravador.start();
});



































































