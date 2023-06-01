# Verificando conteúdo de string de arquivos pdf.

import PyPDF2 as pydf
import re

chavePesquisa = re.compile(r"GISS", flags = re.M | re.I)
regexData = re.compile(r"Referência:[\s\t\n]*(\w{4,9}) DE (\d{4})")

DIRETORIO_ARQUIVO = rf"Q:\Docs Inteligencia Corporativa\3. Uso interno\1. Pessoal\Matheus André\@proj-obrigacoes-tributarias\Arquivos de Amostra\Fiscal\default.pdf"

arquivo = open(DIRETORIO_ARQUIVO, "rb")

arquivoPdf = pydf.PdfReader(arquivo)

pagina = arquivoPdf.pages[0].extract_text()
numPaginas = len(arquivoPdf.pages)

print(pagina)

print("\n\n\n\n" + str(regexData.findall(pagina)))
print("\n\n\n\n" + str(chavePesquisa.findall(pagina)))
print(f"\n\n\n\nQuantidade de Páginas: {numPaginas}")