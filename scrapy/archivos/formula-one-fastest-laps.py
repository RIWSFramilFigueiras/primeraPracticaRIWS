import scrapy

# Se importan los items definidos
from formula1.items import Formula1FastestLapItem


class FormulaOneFastestLapsSpider(scrapy.Spider):
    # Nombre del spider
    name = 'formula-one-fastest-laps'
    # Dominios permitidos
    allowed_domains = ['https://www.formula1.com/en/results.html']
    # URL por la que empieza a scrapear
    start_urls = ['https://www.formula1.com/en/results.html']

    # Función que se encarga de generar las peticiones
    def start_requests(self):
        # La url estará parametrizada por año, para así conseguir los resultados desde 1950 hasta 2021
        url = 'https://www.formula1.com/en/results.html/%d/fastest-laps.html'
        for year in range(1950,2021):
            yield scrapy.Request(url=url % year , callback=self.parse)

    # Se recogen los datos que nos interesan para la práctica
    def parse(self, response):
        
        formulaItem = Formula1FastestLapItem()

        for row in response.xpath('//*[@class="resultsarchive-table"]//tbody//tr'):

            granPremio = row.xpath('td//text()')[0].extract().strip()
            nombrePiloto = row.xpath('td//text()')[2].extract().strip()
            apellidoPiloto = row.xpath('td//text()')[4].extract().strip()
            equipo = row.xpath('td//text()')[8].extract().strip()
            iniciales = row.xpath('td//text()')[6].extract().strip()
            tiempo = row.xpath('td//text()')[9].extract().strip()

            formulaItem['granPremio_fl'] = granPremio
            formulaItem['nombre_fl'] = nombrePiloto
            formulaItem['apellido_fl'] = apellidoPiloto
            formulaItem['equipo_fl'] = equipo
            formulaItem['iniciales_fl'] = iniciales
            formulaItem['tiempo_fl'] = tiempo
            
            yield formulaItem
    

