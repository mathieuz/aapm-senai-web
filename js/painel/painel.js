/* Controle de paginação e linkagem das páginas no contexto do menu lateral do painel */

//Capturando o contexto da tag do iframe.
const iframe = document.getElementById("iframePainel")

//Capturando todos os itens da classe 'linkNav' do menu lateral do painel.
let arrayLinkNav = document.getElementsByClassName("linkNav")

//Capturando todos os itens da classe 'spanLinkNav'. São os valores passados dentro do switch para a dinamização de páginas.
let spanLinkNav = document.getElementsByClassName("spanLinkNav")

//Todos os elementos de link receberão um event-listener. O valor passado, dependendo do que o usuário escolher, vai determinar a página de seção conforme o link clicado dentro do switch.

for (let i = 0; i < arrayLinkNav.length; i++){
    document.getElementsByClassName("linkNav")[i].addEventListener("click", function routerPainel(){
        var linkSecao = spanLinkNav[i].innerHTML.toLowerCase()

        switch (linkSecao){
            case "alunos":
                iframe.src = "html/painel/todos-os-alunos.html"
            break

            case "cadastrar aluno":
                iframe.src = "html/painel/cadastrar-aluno.html"
            break

            case "solicitações":
                iframe.src = "html/painel/solicitacoes.html"
            break

            case "newsletter":
                iframe.src = "html/painel/newsletter.html"
            break

            case "últimos logins":
                iframe.src = "..."
            break
        }
    })
}