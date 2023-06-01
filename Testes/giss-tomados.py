# [!] Modelo base dos arquivos-fonte das declarações onde os textos são extraídos da imagem das páginas de um PDF. [!] #

### Todos os imports ###
import PyPDF2 as pydf
import os
import shutil as sh
import re
import pytesseract as tseract
import pypdfium2 as pfium
from time import sleep

### Caminho do executável do Tesseract. ###
tseract.pytesseract.tesseract_cmd = "C:\\Users\\masilva\\AppData\\Local\\Programs\\Tesseract-OCR\\Tesseract.exe"

### Nome da Declaração. Consta nos nomes de diretório da declaração. ###
NOME_DECLARACAO = "ISS Serv. Tomados"

### Regexes de busca nos arquivos (chave de pesquisa e todas as datas possíveis encontradas) ###
CHAVE_DE_PESQUISA = re.compile(r"SERVIÇOS TOMADOS", flags = re.M | re.I)
DATA_REGEX = re.compile(r"EXERCÍCIO[\s\t]*(\w{4,9})/(\d{4})", flags = re.M | re.I)

### Listas e variáveis importantes. ###
listMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

### Diretório com todos os arquivos à serem analisados. ###
DIRETORIO_ARQUIVOS = rf"Q:\Docs Inteligencia Corporativa\3. Uso interno\1. Pessoal\Matheus André\@proj-obrigacoes-tributarias\Arquivos de Amostra\Fiscal"

###
###
###

# Acessando o diretório com os arquivos à serem analisados.
os.chdir(DIRETORIO_ARQUIVOS)

# Listando todos os arquivos na pasta.
for arquivo in os.listdir():

    # Tenta excluir imagens de nome 'pagina.jpg' e 'paginaData.jpg' previamente.
    # Cada imagem se refere à uma página de um .pdf aberto.
    try:
        os.remove("pagina.jpg")
        os.remove("paginaData.jpg")
    except: print()

    # Verificando todos os arquivos .pdf
    if "geraLivro_091F5FC71DD8B71D243EFF0180AA2B28.pdf" in arquivo:
        abrirArquivo = open(arquivo, "rb")
        arquivoPdf = pydf.PdfReader(abrirArquivo).pages

        # Percorre todas as páginas, 'i' se refere ao índice atual da página.
        for i in range (0, len(arquivoPdf)):
            
            # Salva a imagem da página indicada pelo índice atual.
            pfium.PdfDocument(arquivo)[i].render(scale = 2).to_pil().save("pagina.jpg")

            # Extrai o conteúdo de texto da imagem salva.
            textoPagina = tseract.image_to_string("pagina.jpg", lang = "por")

            # Se a chave de pesquisa foi encontrada na página do PDF aberto,
            # o arquivo foi identificado como sendo da declaração.
            if CHAVE_DE_PESQUISA.findall(textoPagina):
                print(f"[!!!] ENCONTRADO - {arquivo} - [{CHAVE_DE_PESQUISA.findall(textoPagina)}] - [{DATA_REGEX.findall(textoPagina)}]")

                # Loop de repetição que busca em todas as páginas possíveis a data referente a declaração.
                for j in range (0, len(arquivoPdf)):

                    # Salva a página para extrair o texto e buscar a data referente.
                    pfium.PdfDocument(arquivo)[j].render(scale = 2).to_pil().save("paginaData.png")

                    # Extrai o conteúdo de texto da imagem salva.
                    textoPagina = tseract.image_to_string("paginaData.png", lang = "por")

                    sleep(1)

                    if DATA_REGEX.findall(textoPagina):
                        # Capturando o regex de mês e ano na página específica.
                        mesData = DATA_REGEX.findall(textoPagina)[0][0]
                        anoData = DATA_REGEX.findall(textoPagina)[0][1]

                        # Verifica se o valor referente ao mês não é um número.
                        if (str(mesData).isdigit() == False):

                            # Verifica se os três primeiros caracteres correspondem aos três
                            # primeiros caracteres das strings da lista de meses.
                            for i in range (0, listMeses.__len__()):
                                if mesData[0:3].lower() == listMeses[i][0:3].lower():
                                    mesData = i + 1

                                    if mesData <= 9:
                                        mesData = f"0{mesData}"

                        break
                    
                # Fechando o arquivo .pdf para modificação.
                abrirArquivo.close()

                # Definindo o nome do diretório de destino referente ao mês encontrado no PDF.
                mesDiretorio = f"{mesData} - {listMeses[int(mesData) - 1]}"

                # Reordenando numericamente todos os arquivos da pasta de destino
                # para evitar conflitos de nome (se algum arquivo de lá foi removido)
                os.chdir(rf"{DIRETORIO_ARQUIVOS}\Paranoá - Declarações {anoData}\Paranoá - {NOME_DECLARACAO} - {anoData}\{mesDiretorio}")
                arquivos = os.listdir()

                for i in range (0, arquivos.__len__()):
                    indiceParenteses = arquivos[i].index("(")
                    novoNumArquivo = arquivos[i][0:indiceParenteses + 1]
                    novoNumArquivo += f"{i + 1}).pdf"
                    os.rename(arquivos[i], novoNumArquivo)

                os.chdir(DIRETORIO_ARQUIVOS)

                # numArquivos: recebe o número de arquivos dentro do diretório de destino.
                numArquivo = os.listdir(rf"{DIRETORIO_ARQUIVOS}\Paranoá - Declarações {anoData}\Paranoá - {NOME_DECLARACAO} - {anoData}\{mesDiretorio}")

                # Novo nome do arquivo: composto por nome da declaração; mês; ano, e o valor de comprimento
                # da pasta + 1. Isso evita que os conflitos de arquivos com mesmo nome sejam evitados.
                novoNomeArquivo = f"{NOME_DECLARACAO} - {mesData} {anoData} ({numArquivo.__len__() + 1}).pdf"

                # Renomeando arquivo e movendo em seguida para a pasta referente a sua declaração, mês e ano.
                os.rename(arquivo, novoNomeArquivo)

                sh.move(f"{DIRETORIO_ARQUIVOS}\\{novoNomeArquivo}", f"{DIRETORIO_ARQUIVOS}\\Paranoá - Declarações {anoData}\\Paranoá -  {NOME_DECLARACAO} - {anoData}\\{mesDiretorio}")

                # Deleta as imagens das páginas do PDF.
                os.remove("pagina.jpg")
                os.remove("paginaData.png")

                sleep(1)

                break

            else:
                # Caso a chave de pesquisa não for encontrada, passa para o próximo arquivo.
                print(f"Não encontrado - {arquivo}")

                continue