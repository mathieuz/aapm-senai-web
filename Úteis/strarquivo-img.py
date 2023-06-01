# Verificando conteúdo de string de arquivos pdf à partir de imagem.

import PyPDF2 as pydf
import re
import pypdfium2 as pfium
import pytesseract as tseract
import os

tseract.pytesseract.tesseract_cmd = "C:\\Users\\masilva\\AppData\\Local\\Programs\\Tesseract-OCR\\Tesseract.exe"

chavePesquisa = re.compile(r"D C T F  MENSAL", flags = re.M | re.I)
regexData = re.compile(r"EXERCÍCIO[\s\t]*(\w{4,9})/(\d{4})", flags = re.M | re.I)

DIRETORIO_ARQUIVO = rf"Q:\Docs Inteligencia Corporativa\3. Uso interno\1. Pessoal\Matheus André\@proj-obrigacoes-tributarias\Arquivos de Amostra\Fiscal\DCTF Mensal 2.pdf"

arquivo = open(DIRETORIO_ARQUIVO, "rb")
arquivoPdf = pydf.PdfReader(arquivo)
numPaginas = len(arquivoPdf.pages)

pfium.PdfDocument(arquivo)[0].render(scale = 2).to_pil().save("pagina.jpg")
pagina = tseract.image_to_string("pagina.jpg", lang = "por")

print(pagina)
print("\n\n\n\n" + str(regexData.findall(pagina)))
print("\n\n\n\n" + str(chavePesquisa.findall(pagina)))
print(f"\n\n\n\nQuantidade de Páginas: {numPaginas}")

arquivo.close()

os.remove("pagina.jpg")