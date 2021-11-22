# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class Formula1Item(scrapy.Item):

    granPremio = scrapy.Field()
    dia = scrapy.Field()
    mes = scrapy.Field()
    ano = scrapy.Field()	
    nombre = scrapy.Field()
    apellido = scrapy.Field()
    iniciales = scrapy.Field()
    equipo = scrapy.Field()
