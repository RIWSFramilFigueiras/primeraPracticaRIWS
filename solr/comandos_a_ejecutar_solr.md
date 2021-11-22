# Comandos Solr

rm server/logs/*.log

rm -Rf server/solr/formulaData/

bin/solr start

bin/solr create -c formulaData -d server/solr/configsets/formulaData_configs/conf

bin/post -c formulaData example/formulaData/formulaData-items.json

bin/solr stop

# Comando para crawlear

scrapy crawl formulaData

# Comando MongoDB

sudo mongod --dbpath data/ --logpath logs/formulaone.log
