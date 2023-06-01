import pypdfium2 as pfium           # Converte PDF para imagem.
import pytesseract as tseract       # Lê e extrai texto de imagem.
import re                           # Regex.

declaracaoRegex = re.compile(r"(SERVIGOS TOMADOS|SERVICOS TOMADOS|SERVI¢OS TOMADOS)", flags = re.M | re.I)
dataRegex = re.compile(r"[\w\s\t\n\d]*\s([\w]*)\/(\d{4})\s", flags = re.M | re.I)

# Caminho do executável do Tesseract.
tseract.pytesseract.tesseract_cmd = "C:\\Users\\masilva\\AppData\\Local\\Programs\\Tesseract-OCR\\Tesseract.exe"

# Carrega a página.
pdfDoc = pfium.PdfDocument("Q:\\Docs Inteligencia Corporativa\\3. Uso interno\\1. Pessoal\Matheus André\\[deletar]\\https___wwwx.gissonline.com.br_interna_default.pdf")

# Salva a primeira página do PDF como JPG.
pdfDoc[0].render(scale = 2).to_pil().save("pagina.jpg")

# Extrai o texto da imagem como string.
strPdf = tseract.image_to_string("./pagina.jpg")

print(strPdf + "\n\n\n\n")

print(declaracaoRegex.findall(strPdf))
print(dataRegex.findall(strPdf))