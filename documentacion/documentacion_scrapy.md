# Comandos necesarios para extraer info. de la tabla

## Activar el python environment

source 

## Abrir la consola de scrapy

scrapy shell

## Hacer un fetch de la página inicial

fetch('https://www.formula1.com/en/results.html')

## Conseguir acceso a la tabla y, concretamente, al body de la misma, mediante el uso de xpath

table = response.xpath('//*[@class="resultsarchive-table"]//tbody')

## Conseguir acceso a las filas de la tabla (los resultados de las carreras), buscando por el elemento tr mediante xpath

rows = table.xpath('//tr')

## Conseguir acceso a la primera fila de la tabla útil (que sea un gran premio y no el nombre de la columna)

row = rows[1]

## Extraer el primero de los campos/columnas mediante el selector td de xpath

row.xpath('td//text()')[0].extract()

salida:

```
--> Columna 0 no tiene información relevante
>>> row.xpath('td//text()')[0].extract()
'\n                    '
--> Columna 1 contiene el Gran Premio
>>> row.xpath('td//text()')[1].extract()
'\n                        Bahrain\n                    '
>>> row.xpath('td//text()')[2].extract()
'\n                '
--> Columna 3 contiene la fecha
>>> row.xpath('td//text()')[3].extract()
'28 Mar 2021'
>>> row.xpath('td//text()')[4].extract()
'\n                    '
--> Columna 5 contiene el nombre del piloto
>>> row.xpath('td//text()')[5].extract()
'Lewis'
>>> row.xpath('td//text()')[6].extract()
'\n                    '
--> Columna 7 contiene el apellido del piloto
>>> row.xpath('td//text()')[7].extract()
'Hamilton'
>>> row.xpath('td//text()')[8].extract()
'\n                    '
--> Columna 9 contiene las iniciales del piloto
>>> row.xpath('td//text()')[9].extract()
'HAM'
>>> row.xpath('td//text()')[10].extract()
'\n                '
--> Columna 11 contiene la escudería
>>> row.xpath('td//text()')[11].extract()
'Mercedes'
--> Columna 12 contiene las vueltas del gran premio
>>> row.xpath('td//text()')[12].extract()
'56'

```

## Hacer un bucle que imprima unos cuantos resultados (nótese que se añade strip para quitar espacios precedentes y posteriores)

``` python
for row in response.xpath('//*[@class="resultsarchive-table"]//tbody//tr'):
    resultados = {
        'Gran premio' : row.xpath('td//text()')[1].extract().strip(),
        'Fecha': row.xpath('td//text()')[3].extract().strip(),
        'Nombre' : row.xpath('td//text()')[5].extract().strip(),
        'Apellido' : row.xpath('td//text()')[7].extract().strip(),
        'Iniciales' : row.xpath('td//text()')[9].extract().strip(),
        'Equipo' : row.xpath('td//text()')[11].extract().strip(),
    }
    print(resultados)
```

El resultado es el siguiente:

{'Gran premio': 'Bahrain', 'Fecha': '28 Mar 2021', 'Nombre': 'Lewis', 'Apellido': 'Hamilton', 'Iniciales': 'HAM', 'Equipo': 'Mercedes'}
{'Gran premio': 'Emilia Romagna', 'Fecha': '18 Apr 2021', 'Nombre': 'Max', 'Apellido': 'Verstappen', 'Iniciales': 'VER', 'Equipo': 'Red Bull Racing Honda'}
{'Gran premio': 'Portugal', 'Fecha': '02 May 2021', 'Nombre': 'Lewis', 'Apellido': 'Hamilton', 'Iniciales': 'HAM', 'Equipo': 'Mercedes'}
{'Gran premio': 'Spain', 'Fecha': '09 May 2021', 'Nombre': 'Lewis', 'Apellido': 'Hamilton', 'Iniciales': 'HAM', 'Equipo': 'Mercedes'}
{'Gran premio': 'Monaco', 'Fecha': '23 May 2021', 'Nombre': 'Max', 'Apellido': 'Verstappen', 'Iniciales': 'VER', 'Equipo': 'Red Bull Racing Honda'}
{'Gran premio': 'Azerbaijan', 'Fecha': '06 Jun 2021', 'Nombre': 'Sergio', 'Apellido': 'Perez', 'Iniciales': 'PER', 'Equipo': 'Red Bull Racing Honda'}
{'Gran premio': 'France', 'Fecha': '20 Jun 2021', 'Nombre': 'Max', 'Apellido': 'Verstappen', 'Iniciales': 'VER', 'Equipo': 'Red Bull Racing Honda'}
{'Gran premio': 'Styria', 'Fecha': '27 Jun 2021', 'Nombre': 'Max', 'Apellido': 'Verstappen', 'Iniciales': 'VER', 'Equipo': 'Red Bull Racing Honda'}
{'Gran premio': 'Austria', 'Fecha': '04 Jul 2021', 'Nombre': 'Max', 'Apellido': 'Verstappen', 'Iniciales': 'VER', 'Equipo': 'Red Bull Racing Honda'}
{'Gran premio': 'Great Britain', 'Fecha': '18 Jul 2021', 'Nombre': 'Lewis', 'Apellido': 'Hamilton', 'Iniciales': 'HAM', 'Equipo': 'Mercedes'}
{'Gran premio': 'Hungary', 'Fecha': '01 Aug 2021', 'Nombre': 'Esteban', 'Apellido': 'Ocon', 'Iniciales': 'OCO', 'Equipo': 'Alpine Renault'}
{'Gran premio': 'Belgium', 'Fecha': '29 Aug 2021', 'Nombre': 'Max', 'Apellido': 'Verstappen', 'Iniciales': 'VER', 'Equipo': 'Red Bull Racing Honda'}
{'Gran premio': 'Netherlands', 'Fecha': '05 Sep 2021', 'Nombre': 'Max', 'Apellido': 'Verstappen', 'Iniciales': 'VER', 'Equipo': 'Red Bull Racing Honda'}
{'Gran premio': 'Italy', 'Fecha': '12 Sep 2021', 'Nombre': 'Daniel', 'Apellido': 'Ricciardo', 'Iniciales': 'RIC', 'Equipo': 'McLaren Mercedes'}
{'Gran premio': 'Russia', 'Fecha': '26 Sep 2021', 'Nombre': 'Lewis', 'Apellido': 'Hamilton', 'Iniciales': 'HAM', 'Equipo': 'Mercedes'}
{'Gran premio': 'Turkey', 'Fecha': '10 Oct 2021', 'Nombre': 'Valtteri', 'Apellido': 'Bottas', 'Iniciales': 'BOT', 'Equipo': 'Mercedes'}
{'Gran premio': 'United States', 'Fecha': '24 Oct 2021', 'Nombre': 'Max', 'Apellido': 'Verstappen', 'Iniciales': 'VER', 'Equipo': 'Red Bull Racing Honda'}
{'Gran premio': 'Mexico', 'Fecha': '07 Nov 2021', 'Nombre': 'Max', 'Apellido': 'Verstappen', 'Iniciales': 'VER', 'Equipo': 'Red Bull Racing Honda'}
{'Gran premio': 'Brazil', 'Fecha': '14 Nov 2021', 'Nombre': 'Lewis', 'Apellido': 'Hamilton', 'Iniciales': 'HAM', 'Equipo': 'Mercedes'}
{'Gran premio': 'Qatar', 'Fecha': '21 Nov 2021', 'Nombre': 'Lewis', 'Apellido': 'Hamilton', 'Iniciales': 'HAM', 'Equipo': 'Mercedes'}

Por lo tanto, una vez visto que los datos son alcanzables, se procede a crear un spider.

## Construccion del spider 

El spider es como sigue:

```python
import scrapy

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
        for row in response.xpath('//*[@class="resultsarchive-table"]//tbody//tr'):
            yield {
                'Gran premio' : row.xpath('td//text()')[1].extract().strip(),
                'Fecha': row.xpath('td//text()')[3].extract().strip(),
                'Nombre' : row.xpath('td//text()')[5].extract().strip(),
                'Apellido' : row.xpath('td//text()')[7].extract().strip(),
                'Iniciales' : row.xpath('td//text()')[9].extract().strip(),
                'Equipo' : row.xpath('td//text()')[11].extract().strip(),
            }
```

Lanzar el siguiente comando:
```bash
scrapy crawl --output -:json formula-one
```

Resultado:

