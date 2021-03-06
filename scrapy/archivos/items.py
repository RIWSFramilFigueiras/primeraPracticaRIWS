# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class Formula1VictoryItem(scrapy.Item):

    granPremio = scrapy.Field()
    fecha = scrapy.Field()
    nombre = scrapy.Field()
    apellido = scrapy.Field()
    iniciales = scrapy.Field()
    equipo = scrapy.Field()

class Formula1FastestLapItem(scrapy.Item):

    granPremio_fl = scrapy.Field()
    nombre_fl = scrapy.Field()
    apellido_fl = scrapy.Field()
    equipo_fl = scrapy.Field()
    tiempo_fl = scrapy.Field()
    iniciales_fl = scrapy.Field()
    ano = scrapy.Field()
