

var height = 0
var width = 0
var vidas = 1
var tempo = 15

var criaZumbiTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
	//1500
	criaZumbiTempo = 1500
} else if(nivel === 'dificil') {
	//1000
	criaZumbiTempo = 1000
} else if (nivel === 'chucknorris') {
	//750
	criaZumbiTempo = 750
}

function ajustaTamanhoPalcoJogo() {
	height = window.innerHeight
	width = window.innerWidth

	console.log(width, height)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaZumbi)
		window.location.href = 'winner.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}
	
}, 1000)


function posicaoRandom() {


	//remover o zumbi anterior (caso exista)
	if(document.getElementById('zumbi')) {
		document.getElementById('zumbi').remove()

		//console.log('elemento selecionado foi: v' + vidas)
		if(vidas > 3) {

			window.location.href = 'game_over.html'
		} else {
			document.getElementById('v' + vidas).src = "img/coracao_vazio.png"

			vidas++
		}
	}

	var posicaoX = Math.floor(Math.random() * width) - 90
	var posicaoY = Math.floor(Math.random() * height) - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//criar o elemento html
	var zumbi = document.createElement('img')
	zumbi.src = 'img/zumbi.png'
	zumbi.className = tamanhoRandom() + ' ' + ladoRandom()
	zumbi.style.left = posicaoX + 'px'
	zumbi.style.top = posicaoY + 'px'
	zumbi.style.position = 'absolute'
	zumbi.id = 'zumbi'
	zumbi.onclick = function() {
		this.remove()
	}

	document.body.appendChild(zumbi)

}

function tamanhoRandom() {
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) {
		case 0:
			return 'zumbi1'
		
		case 1:
			return 'zumbi2'

		case 2:
			return 'zumbi3'
	}
}

function ladoRandom() {
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'

	}
}


