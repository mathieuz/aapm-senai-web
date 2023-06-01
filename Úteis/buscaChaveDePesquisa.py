# Essa é a parte do script em que os arquivos (.pdf) são identificados dentro de uma pasta específica. Cada PDF é percorrido e lido em todas as páginas possíveis, até que o valor referente a chave de pesquisa da declaração ser encontrada.

# Import das libs principais.
import PyPDF2 as pydf
import os
import re

# Acessando o diretório com os arquivos e armazenando dentro de uma lista.
os.chdir(rf"Q:\Docs Inteligencia Corporativa\3. Uso interno\1. Pessoal\Matheus André\@proj-obrigacoes-tributarias\Arquivos de Amostra\Fiscal")
lista = os.listdir()

# Verificando arquivos .pdf
for arquivo in lista:
    # Chave de pesquisa que identifica a empresa/declaração.
    chavePesquisa = re.compile(r"GISS", flags = re.M | re.I)
    dataPdfRegex = re.compile(r"[\s\t\n\d\w]*Mês/Ano:\s*(\w{3})\s*(\d{4})", flags = re.M | re.I)

    # Vai ser exibida quando todo o arquivo for lido. Mostrará
    # se a chave de pesquisa foi encontrada ou não.
    resultadoBusca = str()

    # Busca e abre todos os arquivos .pdf.
    if ".pdf" in arquivo:
        abrirArquivo = open(arquivo, "rb")
        arquivoPdf = pydf.PdfReader(abrirArquivo).pages

        # Percorre toda página de um PDF. Ele sai do loop a partir do 
        # momento em que uma combinação é encontrada.
        for i in range (0, len(arquivoPdf)):
            pagina = arquivoPdf[i].extract_text()
            
            if chavePesquisa.findall(pagina):
                resultadoBusca = "[!!!] [Encontrado] - " + str(chavePesquisa.findall(pagina)) + f" [{arquivo}] - [{dataPdfRegex.findall(pagina)}]"
                break

            else:
                resultadoBusca = "[Não identificado] - " + arquivo
                continue

    print(resultadoBusca)