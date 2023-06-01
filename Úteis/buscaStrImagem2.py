# Alguns arquivos são impossíveis de ser lidos diretamente extraindo o conteúdo de texto dos pdfs.
# Neste exemplo, o conteúdo de texto é extraído de todas as imagens de cada página do arquivo, que identifica a declaração e a data;

# Import das libs principais.
import PyPDF2 as pydf
import os
import shutil as sh
import re
import pytesseract as tseract
import pypdfium2 as pfium
from time import sleep

# Caminho do executável do Tesseract.
tseract.pytesseract.tesseract_cmd = "C:\\Users\\masilva\\AppData\\Local\\Programs\\Tesseract-OCR\\Tesseract.exe"

# Nome da declaração. Utilizado para renomear o arquivo e identificar seu diretório.
nomeDeclaracao = "Escrituração Serviços prestados"

# Lista com meses que definirá o caminho do diretório para onde as pastas võ ser movidas.
listMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

# Acessando o diretório com os arquivos e armazenando dentro de uma lista.
os.chdir(rf"Q:\Docs Inteligencia Corporativa\3. Uso interno\1. Pessoal\Matheus André\@proj-obrigacoes-tributarias\Arquivos de Amostra\Fiscal")
lista = os.listdir()

# Verificando arquivos .pdf
for arquivo in lista:
    # Tenta excluir uma imagem de nome 'pagina.jpg' previamente.
    try:
        os.remove("pagina.jpg")
    except: print()
    
    # Chave de pesquisa que identifica a empresa/declaração.
    chavePesquisa = re.compile(r"SERVIÇOS TOMADOS", flags = re.M | re.I)

    # Padrões Regex possíveis de data dentro dos documentos. Correponde à mês e ano.
    dataPdfRegex = re.compile(r"[\w\s\t\n\d]*\s([\w]*)\/(\d{4})\s", flags = re.M | re.I)

    # Vai ser exibida quando todo o arquivo for lido. Mostrará
    # se a chave de pesquisa foi encontrada ou não.
    resultadoBusca = str()

    # Busca e abre todos os arquivos .pdf.
    if ".pdf" in arquivo:

        # Primeiro é verificado se há imagens 'pagina.jpg' no diretório.
        try:
            os.remove("pagina.jpg")
        except: sleep(1)

        # Número de páginas do PDF.
        pdf = open(arquivo, "rb")
        numPaginas = len(pydf.PdfReader(pdf).pages)

        for i in range (0, numPaginas):

            # Salva imagem da primeira página do PDF.
            pfium.PdfDocument(arquivo)[i].render(scale = 2).to_pil().save(f"pagina.jpg")

            # Extrai o conteúdo de texto da imagem salva.
            pagina = tseract.image_to_string(f"pagina.jpg", lang = "por")

            # Se a chave de pesquisa for localizada dentro do texto extraído da imagem, os valores são extraídos.
            if chavePesquisa.findall(pagina):
                resultadoDataRegex = chavePesquisa.findall(pagina)

                resultadoBusca = "[!!!] [Encontrado] - " + f"[{arquivo}]" + f"{resultadoDataRegex}"

                pdf.close()

                os.remove(f"pagina.jpg")

                sleep(1)

                break

            else:
                resultadoBusca = "[Não identificado] - " + arquivo

                pdf.close()

                os.remove(f"pagina.jpg")
                
                sleep(1)

                continue

    print(resultadoBusca)