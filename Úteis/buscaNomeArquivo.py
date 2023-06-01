# Forma de identificação pelo nome do arquivo (alguns arquivos possuem o nome da declaração no nome do arquivo, e não explicitamente dentro do conteúdo do pdf em si.)

# Import das libs principais.
import PyPDF2 as pydf
import os

# Acessando o diretório com os arquivos e armazenando dentro de uma lista.
os.chdir("Q:\\Docs Inteligencia Corporativa\\3. Uso interno\\1. Pessoal\\Matheus André\\[deletar]")
lista = os.listdir()

# Verificando arquivos .pdf
for arquivo in lista:

    # Vai ser exibida quando todo o arquivo for lido. Mostrará
    # se a chave de pesquisa foi encontrada ou não.
    resultadoBusca = str()

    # Busca o nome da declaração no nome do arquivo.
    if "Dipam".lower() in arquivo.lower():
        resultadoBusca = "[!!!] [Encontrado] - " + f" [{arquivo}]"

    else:
        resultadoBusca = "[Não identificado] - " + arquivo

    print(resultadoBusca)