var timerId = null;
function iniciaJogo(){

    var url = window.location.search;
    var nivel_jogo = url.replace("?", "");
    var tempo_segundos = 0;
    
    if(nivel_jogo == 1){
        tempo_segundos = 120;
    }
    if(nivel_jogo == 2){
        tempo_segundos = 60;
    }
    if(nivel_jogo == 3){
        tempo_segundos = 30;    
    }
    
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    var qtde_baloes = 69;
    var qtde_passaros = 10
    cria_baloes(qtde_baloes);
    criaPassaros(qtde_passaros);

    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos + 1);
}

function cria_baloes(qtde_baloes){
    for (var i = 1; i <= qtde_baloes; i++) {
        var balao = document.createElement('img');
        balao.src = 'imagens/balao_azul_pequeno.png';

        balao.id = 'b'+i;

        balao.onclick = function(){
            estourar(this);
        };

        document.getElementById('cenario').appendChild(balao);
        
    }
}

function contagem_tempo(segundos){

    segundos = segundos - 1;

    if(segundos == -1){
        clearTimeout(timerId);
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout("contagem_tempo("+segundos+")",1000);
}

function game_over(){
    remove_eventos_passaros();
    remove_eventos_baloes();{
    alert ('Fim de jogo');
}
}
function estourar(e){
    var id_balao = e.id;
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png'
    som();
    document.getElementById(id_balao).setAttribute("onclick","")

    pontuacao(-1);
}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao; 

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);

}

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        alert("Venceu");
        parar_jogo();
    }
}
function parar_jogo(){
    clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; //contador para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';    
        i++; //faz a iteração da variávei i
    }
}

function som(){
    var audio1 = new Audio();
    audio1.src = "sounds/pop-sound.mp3";
    audio1.play();
}
function som2(){
    var audio2 = new Audio();
    audio2.src = "sounds/Shooting-bird.mp3";
    audio2.play();
}
function criaPassaros(qtde_passaros){
    for (let i=1; i<= qtde_passaros; i++){
        let passaro = document.createElement('img');
        passaro.src = 'imagens/bird-game.png';
        passaro.style.margin = '9px';

        passaro.id = 'p'+i;
        passaro.onclick = function(){
            mataPassaros(this);
        };
        document.getElementById('cenario').appendChild(passaro);

    }
}
function mataPassaros(e){
    var id_passaro = e.id;
    document.getElementById(id_passaro).src = 'imagens/bird-shooted-game.png';
    document.getElementById(id_passaro).setAttribute('onclick','');
    som2();

    pontuacao(+1);
}
function remove_eventos_passaros() {
    var i = 1; //contador para recuperar balões por id
    
    //percorre o elemento de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('p'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('p'+i).onclick = '';    
        i++; //faz a iteração da variávei i
    }
}