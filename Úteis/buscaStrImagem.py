# Alguns arquivos são impossíveis de ser lidos diretamente extraindo o conteúdo de texto dos pdfs.
# Neste exemplo, o conteúdo de texto é extraído da primeira imagem de cada arquivo, que identifica a declaração e a data;

# Import das libs principais.
import PyPDF2 as pydf
import os
import shutil as sh
import re
import pytesseract as tseract
import pypdfium2 as pfium

# Caminho do executável do Tesseract.
tseract.pytesseract.tesseract_cmd = "C:\\Users\\masilva\\AppData\\Local\\Programs\\Tesseract-OCR\\Tesseract.exe"

# Nome da declaração. Utilizado para renomear o arquivo e identificar seu diretório.
nomeDeclaracao = "Escrituração Serviços prestados"

# Lista com meses que definirá o caminho do diretório para onde as pastas võ ser movidas.
listMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

# Acessando o diretório com os arquivos e armazenando dentro de uma lista.
os.chdir("Q:\\Docs Inteligencia Corporativa\\3. Uso interno\\1. Pessoal\\Matheus André\\[deletar]")
lista = os.listdir()

# Verificando arquivos .pdf
for arquivo in lista:
    # Chave de pesquisa que identifica a empresa/declaração.
    chavePesquisa = re.compile(r"SERVIÇOS TOMADOS|SERVIÇOS PRESTADOS", flags = re.M | re.I)

    # Padrões Regex possíveis de data dentro dos documentos. Correponde à mês e ano.
    dataPdfRegex = re.compile(r"[\w\s\t\n\d]*\s([\w]*)\/(\d{4})\s", flags = re.M | re.I)

    # Vai ser exibida quando todo o arquivo for lido. Mostrará
    # se a chave de pesquisa foi encontrada ou não.
    resultadoBusca = str()

    # Busca e abre todos os arquivos .pdf.
    if ".pdf" in arquivo:
        # Salva imagem da primeira página do PDF.
        pfium.PdfDocument(arquivo)[0].render(scale = 2).to_pil().save("pagina.jpg")

        # Extrai o conteúdo de texto da imagem salva.
        pagina = tseract.image_to_string("pagina.jpg", lang = "por")

        # Se a chave de pesquisa for localizada dentro do texto extraído da imagem, os valores são extraídos.
        if chavePesquisa.findall(pagina):
            resultadoDataRegex = chavePesquisa.findall(pagina)

            resultadoBusca = "[!!!] [Encontrado] - " + f"[{arquivo}]" + f"{resultadoDataRegex}"

            os.remove("pagina.jpg")

        else:
            resultadoBusca = "[Não identificado] - " + arquivo

            os.remove("pagina.jpg")


    print(resultadoBusca)