var coresButoes = ["vermelho", "azul", "verde", "amarelo"];
var padroesJogo = [];
var padraoCliquesUsuario = [];
var iniciado = false;
var nivel = 0;

$(document).keydown(function() {
    if (!iniciado) {
  
      $("#titulo-nivel").text("Nivel " + nivel);
      proximaSequencia();
      iniciado = true;
    }
});

$(".btn").click(function () {
    var corEscolhidaDoUsuario = $(this).attr("id");

    padraoCliquesUsuario.push(corEscolhidaDoUsuario);
    tocarSom(corEscolhidaDoUsuario);
    animacaoAoPresssionar(corEscolhidaDoUsuario);
    checaResposta(padraoCliquesUsuario.length-1);
});

function checaResposta(nivelAtual) {

  if (padroesJogo[nivelAtual] === padraoCliquesUsuario[nivelAtual]) {

    console.log("Venceu!");

    if (padraoCliquesUsuario.length === padroesJogo.length){

      setTimeout(function () {
        proximaSequencia();
      }, 1000);

    }

  } else {
    
    console.log("Perdeu!");

    tocarSom("errado");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#titulo-nivel").text("Game Over, Pressiona qualquer tecla para reiniciar!");

    jogarNovamente();
  }

}

function proximaSequencia() {

    nivel++;

    $("#titulo-nivel").text("Nivel " + nivel);
    
    var numeroAleatorio = Math.floor(Math.random() * 4);
    var corAleatoriaEscolhida = coresButoes[numeroAleatorio];
    
    padroesJogo.push(corAleatoriaEscolhida);
    
    $("#" + corAleatoriaEscolhida).fadeIn(100).fadeOut(100).fadeIn(100);
    tocarSom(corAleatoriaEscolhida)
}

function tocarSom(nome) {
    var audio = new Audio("./sons/" + nome + ".mp3");
    audio.play();
}

function animacaoAoPresssionar(corAtual) {
    $("#" + corAtual).addClass("pressionado");
  
    setTimeout(function () {
      $("#" + corAtual).removeClass("pressionado");
    }, 100);
  }

  function jogarNovamente() {
  
    nivel = 0;
    padroesJogo = [];
    iniciado = false;
  }