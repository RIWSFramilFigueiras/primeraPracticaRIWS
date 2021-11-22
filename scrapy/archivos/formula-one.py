import scrapy

# Se importan los items definidos
from formula1.items import Formula1Item

class FormulaOneSpider(scrapy.Spider):
    # Nombre del spider
    name = 'formula-one'
    # Dominios permitidos
    allowed_domains = ['https://www.formula1.com/en/results.html']
    # URL por la que empieza a scrapear
    start_urls = ['https://www.formula1.com/en/results.html']

    # Función que se encarga de generar las peticiones
    def start_requests(self):
        # La url estará parametrizada por año, para así conseguir los resultados desde 1950 hasta 2021
        url = 'https://www.formula1.com/en/results.html/%d/races.html'
        for year in range(1950,2021):
            yield scrapy.Request(url=url % year , callback=self.parse)

    # Se recogen los datos que nos interesan para la práctica
    def parse(self, response):
        
        formulaItem = Formula1Item()

        for row in response.xpath('//*[@class="resultsarchive-table"]//tbody//tr'):

            formulaItem['granPremio'] = row.xpath('td//text()')[1].extract().strip()
            
			# Procesamiento de la fecha
            fechaStr = row.xpath('td//text()')[3].extract().strip()
            fechaList = fechaStr.split()
            dia = fechaList[0]
            mes = fechaList[1]
            ano = fechaList[2]
            formulaItem['dia'] = dia
            formulaItem['mes'] = mes
            formulaItem['ano'] = ano
                                    
            formulaItem['nombre'] = row.xpath('td//text()')[5].extract().strip()
            formulaItem['apellido'] = row.xpath('td//text()')[7].extract().strip()
            formulaItem['iniciales'] = row.xpath('td//text()')[9].extract().strip()
            formulaItem['equipo'] = row.xpath('td//text()')[11].extract().strip()
            
            yield formulaItem