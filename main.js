/*
REGRAS DO JOGO

nivel min 1 e max 100
    sempre q ele tiver 100% de algo, perde nível
    se sustentar menos de 50% a cada minuto, ganha 1 nível.

evoluindo: a cada 25%, ele muda a aparência e fica mais dificil
    -depois determino a dificuldade

status: a cada segundo os status aumentam
    <25 - 2/s
    <50 - 5/s
    <75 - 10/s
    <100 - 20/s

botoes: necessidades
    comer = fome -20, estomago + 10, sono + 5
    coco = estomago -50, fome + 10, sono + 0
    dormir = sono - 50, fome + 20, estomago + 10
    ----------------------------------
quando digitar o nome e clicar começar, inicia o jogo

*/

//ELEMENTOS DOM
let $popup = document.querySelector('#pop-up');
let $gameOver = document.querySelector('#game-over')

let $nome = document.querySelector('#nome');
let $showNome = document.querySelector('#show-nome');
let $nivel = document.querySelector('#nivel');
let $baby = document.querySelector('#baby');

let $fome = document.querySelector('#fome');
let $estomago = document.querySelector('#estomago');
let $sono = document.querySelector('#sono');
let fome = 0
let estomago = 0
let sono = 0

let $comer = document.querySelector('#comer');
let $coco = document.querySelector('#coco');
let $dormir = document.querySelector('#dormir');

//FUNCOES
function aumentaNecessidade() {
    let count = 0;
    setInterval(() => {
        fome++
        if (fome < 0) {
            fome = 0;
        } else if (fome >= 100) {
            fome = 100;
        }
        $fome.innerText = fome;

        estomago++
        if (estomago < 0) {
            estomago = 0;
        } else if (estomago >= 100) {
            estomago = 100;
        }
        $estomago.innerText = estomago;

        sono++
        if (sono < 0) {
            sono = 0;
        } else if (sono >= 100) {
            estomago = 100;
        }
        $sono.innerText = sono;
    }, 1000)
}

function saciaNecessidade() {
    $comer.addEventListener('click', () => {
        fome -= 20
        estomago += 10
        sono += 5
    })
    $coco.addEventListener('click', () => {
        estomago -= 50
        fome += 10
        sono += 5
    })
    $dormir.addEventListener('click', () => {
        sono -= 50
        fome += 20
        estomago += 10
    })
}

function setNivel() {}

function setEstado() {
    setInterval(() => {
        if ($fome.innerText >= 0 || $estomago.innerText >= 0 || $sono.innerText >= 0) {
            $baby.innerText = '😊'
        }
        
        if ($fome.innerText >= 25 || $estomago.innerText >= 25 || $sono.innerText >= 25) {
            $baby.innerText = '🙂'
        }
        
        if ($fome.innerText >= 50 || $estomago.innerText >= 50 || $sono.innerText >= 50) {
            $baby.innerText = '😐'
        }

        if ($fome.innerText >= 75 || $estomago.innerText >= 75 || $sono.innerText >= 75) {
            $baby.innerText = '😭'
        }

        if ($fome.innerText >= 100 || $estomago.innerText >= 100 || $sono.innerText >= 100) {
            gameOver()
        }
    }, 1000)
}

function jogando() {
    aumentaNecessidade()
    setEstado()
    saciaNecessidade()
}

function gameOver() {
    $gameOver.classList.remove('inicio-off')
    $gameOver.classList.add('inicio-on')
    document.querySelector('#replay').addEventListener('click', ()=> location.reload())
}

function iniciaJogo() {
    document.querySelector('#btn-play').addEventListener('click', () => {
        if ($nome.value.length == 0) {
            alert('tente novamente');
        } else {
            $showNome.innerText = $nome.value;
            $popup.classList.remove('inicio-on');
            $popup.classList.add('inicio-off');
            $baby.innerText = "😊";
            jogando();
        }

    })
}
document.querySelector('h1').load(iniciaJogo());