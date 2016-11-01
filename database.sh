sqlite3 db/akmy-web.db < db/schema.sql
sqlite3
sqlite> .open akmy-web.db
sqlite> .tables
Fabrications  Models        dimension2    dimension3
sqlite> .separator "|"
sqlite> .import csv/Dimension2.csv dimension2
sqlite> .import csv/Dimension3.csv dimension3
sqlite> .import csv/Models.csv Models
sqlite> .import csv/Fabrications.csv Fabrications

# reseting db

rm akmy-web.db
touch akmy-web.db
sqlite3 akmy-web.db < schema.sql
node seed.js
