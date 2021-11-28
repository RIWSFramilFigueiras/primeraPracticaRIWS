# Documentación práctica RIWS - MUEI

## Scrapy

### Activar el python environment

Se activa el entorno python en donde están las dependencias necesarias para Scrapy.

```bash
source scrapy-env/bin/activate
```


### Descubrir los datos necesarios mediante Scrapy shell

Se abre la shell de Scrapy, la cual se utilizará para, antes de desarrollar cualquier código, saber con precisión que partes de la página se necesitan de cara a obtener los datos necesarios.

Se ejecuta el siguiente comando:

```bash
scrapy shell
```


### Hacer un fetch de la página inicial

Posteriormente se ordena a la terminar realizar un crawleado de la página. El comando necesario es el siguiente:

```py
fetch('https://www.formula1.com/en/results.html')
```

### Conseguir acceso a la tabla y, concretamente, al body de la misma, mediante el uso de xpath

Una vez se ha crawleado la página, gracias a la herramiente inspeccionar elemento se investiga cómo cojer la tabla de resultados de los Grandes Premios de Fórmula 1. Al final, se descubre que dicha tabla tiene un estilo CSS resultsarchive-table, por lo que, usando el lenguaje de programación xpath, se guarda dicha tabla en una variable.

```python
table = response.xpath('//*[@class="resultsarchive-table"]//tbody')
```

## Conseguir acceso a las filas de la tabla

Una vez se tiene la tabla, lo interesante es conseguir las filas. Para ello, se buscan los elementos tr de la misma.

```py
rows = table.xpath('//tr')
```


## Conseguir acceso a la primera fila de la tabla útil (que sea un gran premio y no el nombre de la columna)

Ahora, para descubrir donde están los datos interesantes, se coje la primera de las filas que contienen datos:

```
row = rows[1]
```

## Extraer los campos para ver dónde se sitúan los datos importantes

Ahora se realizan búsquedas en los diferentes elementos td. Se obtiene lo siguiente:

```py
## Columna 0 no tiene información relevante
>>> row.xpath('td//text()')[0].extract()
'\n                    '
## Columna 1 contiene el Gran Premio
>>> row.xpath('td//text()')[1].extract()
'\n                        Bahrain\n                    '
>>> row.xpath('td//text()')[2].extract()
'\n                '
## Columna 3 contiene la fecha
>>> row.xpath('td//text()')[3].extract()
'28 Mar 2021'
>>> row.xpath('td//text()')[4].extract()
'\n                    '
## Columna 5 contiene el nombre del piloto
>>> row.xpath('td//text()')[5].extract()
'Lewis'
>>> row.xpath('td//text()')[6].extract()
'\n                    '
## Columna 7 contiene el apellido del piloto
>>> row.xpath('td//text()')[7].extract()
'Hamilton'
>>> row.xpath('td//text()')[8].extract()
'\n                    '
## Columna 9 contiene las iniciales del piloto
>>> row.xpath('td//text()')[9].extract()
'HAM'
>>> row.xpath('td//text()')[10].extract()
'\n                '
## Columna 11 contiene la escudería
>>> row.xpath('td//text()')[11].extract()
'Mercedes'
## Columna 12 contiene las vueltas del gran premio
>>> row.xpath('td//text()')[12].extract()
'56'

```

## Hacer un bucle que imprima unos cuantos resultados (nótese que se añade strip para quitar espacios precedentes y posteriores)

Como paso previo a la programación del spider, se desarrolla un bucle en python que hace lo propio pero con todas las filas de la tabla, además se añade la función strip para eliminar espacios antes y después:

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

Al lanzar el siguiente comando se obtienen satisfactoriamente los datos buscados, todos los grandes premios desde 1950 hasta 2021 y los datos de los pilotos y escuderias ganadoras.

```bash
scrapy crawl --output -:json formula-one
```

## Conexión con la base de datos MongoDB

Para conseguir conectar Scrapy con mongoDb, se siguen los siguientes pasos:

## Añadir la cadena de conexión a la configuración del spider

En el archivo de configuración en donde se sitúa el spider de Scrapy, se define la cadena de conexión y el nombre que tendrá la base de datos en donde irán los datos crawleados. Las lineas son las siguientes:

```conf
MONGO_URI = 'mongodb://localhost:27017'
MONGO_DATABASE = 'formulaData'
```

### Creación de un item

Un item es un objeto de Python al estilo clave valor. Se utiliza para convertir los datos desestructurados de la página web a datos estructurado gracias a este tipo de dato. El Spider configurado anteriormente pasará a devolver ahora un item. En este caso, el item necesario para los datos de los Grandes Premios de Fórmula 1 es el siguiente:

```python
import scrapy

class Formula1Item(scrapy.Item):

    granPremio = scrapy.Field()
    fecha = scrapy.Field()
    nombre = scrapy.Field()
    apellido = scrapy.Field()
    iniciales = scrapy.Field()
    equipo = scrapy.Field()
```
Se separa el día, mes y el año recuperados de www.formula1.com para su posteríor formateado al formato pdate de Solr. Esto tendrá su impacto en el spider final.

### Creación del item pipeline

El item pipeline sirve para procesar el item que sale del spider gracias a una serie de componentes que se ejecutan de manera secuencial.

En este caso, el pipeline recoje del archivo de configuración la cadena de conexión de la base de datos y, posteriormente, se conecta a la base de datos, crea el conjunto de items en ella y los inserta uno a uno.

El pipeline es el siguiente:

```python
import pymongo
from itemadapter import ItemAdapter



class Formula1Pipeline:
    collection_name = 'formulaData-items'

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE', 'items')
        )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        self.db[self.collection_name].insert_one(ItemAdapter(item).asdict())
        return item
```

Con todos estos cambios, el spider queda ahora tal que así:

```py
import scrapy

# Se importan los items definidos
from formula1.items import Formula1Item

def transforMonth(monthStr):
    if monthStr == 'Jan':
        return "01"
    elif monthStr == 'Feb':
        return "02"
    elif monthStr == 'Mar':
        return "03"
    elif monthStr == 'Apr':
        return "04"
    elif monthStr == 'May':
        return "05"
    elif monthStr == 'Jun':
        return "06"
    elif monthStr == 'Jul':
        return "07"
    elif monthStr == 'Aug':
        return "08"
    elif monthStr == 'Sep':
        return "09"
    elif monthStr == 'Oct':
        return "10"
    elif monthStr == 'Nov':
        return "11"
    elif monthStr == 'Dec':
        return "12"
    else:
        return "01"

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
            mesNumero = transforMonth(mes)

            # Transormar fecha a formato YYYY-MM-DDThh:mm:ssZ
            formattedDate = ano+"-"+mesNumero+"-"+dia+"T"+"00:00:00Z"

            formulaItem['fecha'] = formattedDate  
            formulaItem['nombre'] = row.xpath('td//text()')[5].extract().strip()
            formulaItem['apellido'] = row.xpath('td//text()')[7].extract().strip()
            formulaItem['iniciales'] = row.xpath('td//text()')[9].extract().strip()
            formulaItem['equipo'] = row.xpath('td//text()')[11].extract().strip()
            
            yield formulaItem
```

## Comprobación

Finalmente, gracias a la utilidad MongoCompass, se comprueba que luego de la ejecución del Spider, los datos se guardan satisfactoriamente en la base de datos.

Por ejemplo, se presenta uno de los elementos, correspondiente al primer Gran Premio de Fórmula 1 de la historia, tal y como se almacena en BBDD:

```json
{"_id":{"$oid":"619bd576b72c90d3b0b5755d"},"granPremio":"Great Britain","dia":"13","mes":"May","ano":"1950","nombre":"Nino","apellido":"Farina","iniciales":"FAR","equipo":"Alfa Romeo"}
```

# Solr

A continuación, se debe de modificar el esquema de Solr para que pueda trabajar con los datos que le van a llegar desde MongoDB.

Para ello se insertan los siguientes valores en el esquema:

```xml
<!--  Tipos de datos para tabla de resultados de Grandes Premios de Fórmula 1 1950-2021 Formula1.com -->
<field name="granPremio" type="text_general" indexed="true" stored="true" multiValued="false"/>
<field name="fecha" type="pdate" indexed="true" stored="true" multiValued="false"/>
<field name="nombre" type="text_general" indexed="true" stored="true" multiValued="false"/>
<field name="apellido" type="text_general" indexed="true" stored="true" multiValued="false"/>
<field name="iniciales" type="text_general" indexed="true" stored="true" multiValued="false"/>
<field name="equipo" type="text_general" indexed="true" stored="true" multiValued="false"/>
<!--  Tipos de datos para tabla de resultados de Grandes Premios de Fórmula 1 1950-2021 Formula1.com -->
```

Todos los tipos de datos se definen de tipo text_general a excepción del día y el año en el que se produce la victoria del Gran Premio, los cuales son de tipo numérico y se configuran con el tipo de dato pint.

Todos los tipos serán marcados con indexed y stored a true.

* Name: todos los tipos tienen el mismo parámetro name que nombre tienen en BBDD y, transitivamente, en el index que se configura de scrapy.
* Indexed: parámetro que hace que el tipo de dato sea indexado y que, por tanto, se pueda buscar por el en una query. Es esencial que, por tanto, todos los tipos de datos declarados lo sean.
* Stored: parámetro que configura si el tipo de dato puede o no ser recuperado. En este caso también nos interesa que siempre se recupere.
* Multivalued: En este caso, ningún tipo de dato será multivaluado.