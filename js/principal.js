document.querySelector("#mudaLayout").addEventListener("click", function(){
	var mural = document.querySelector(".mural");
	mural.classList.toggle("mural--linhas");
	if (mural.classList.contains("mural--linhas")){
		this.textContent = "Blocos";
	} else {
		this.textContent = "Linhas";
	}
}); 

function removeCartao(){
	var cartao = document.querySelector("#cartao_" + this.dataset.ref);
	cartao.classList.add("cartao--some");
	setTimeout(function(){
		cartao.remove();
	},500);
}
	var botoes = document.querySelectorAll(".opcoesDoCartao-remove");
	for (var i=0;i < botoes.length; i++){
		botoes[i].addEventListener("click",removeCartao);
	};

var contador = $(".cartao").length;

$(".novoCartao").submit(function(event) {
	event.preventDefault();
	var campoConteudo = $(".novoCartao-conteudo");
	var conteudo = campoConteudo.val().trim();
	adicionaCartao(conteudo);
	campoConteudo.val("");
	
});



function adicionaCartao(conteudo, cor){
		
										/*.replace(/\n/g, "<br>");*/
		if (conteudo){
		contador++;

		var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
										.attr("data-ref", contador)
										.text("Remover")
										.click(removeCartao);

		var opcoes = $("<div>").addClass("opcoesDoCartao")
								.append(botaoRemove);

		var tipoCartao = decideTipoCartao(conteudo);

		var conteudoTag = $("<p>").addClass("cartao-conteudo")
								.append(conteudo);

		$("<div>").addClass("cartao")
					.attr("id", "cartao_" + contador)
					.addClass(tipoCartao)
					.append(opcoes)
					.append(conteudoTag)
					.css("background-color", cor)
					.prependTo(".mural");

	}
};

function decideTipoCartao(conteudo){
	var quebras = conteudo.split("<br").length;
	var totalDeLetras = conteudo.replace(/<br>/g, " ").length;
	var ultimoMaior = "";

	conteudo.replace(/<br>/g, " ")
			 .split(" ")
			 .forEach(function(palavra){
			 	if (palavra.length > ultimoMaior.length){
			 		ultimoMaior = palavra;
			 	}
			 });
	var tamMaior = ultimoMaior.length;
	var tipoCartao = "cartao--textoPequeno";
	if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55){
		tipoCartao = "cartao--textoGrande";
	} else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 75){
		tipoCartao = "cartao--textoMedio";
	}
	return tipoCartao;
}


$("#busca").on("input", function(){
	var busca = $(this).val().trim();

	if (busca.length){
		$(".cartao").hide().filter(function(){
			return $(this).find(".cartao-conteudo")
							.text()
							.match(new RegExp(busca, "i"));
		}).show();
	} else {
		$(".cartao").show();

	}
});

$("#ajuda").click(function(){
	$.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
		function(res){
			console.log(res);

			res.instrucoes.forEach(function(instrucao){
				adicionaCartao(instrucao.conteudo, instrucao.cor);
			});
		}
	);
});