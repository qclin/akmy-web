DROP TABLE IF EXISTS dimension2;

CREATE TABLE dimension2(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  route TEXT,
  who TEXT,
  role TEXT,
  software TEXT,
  description TEXT,
  links TEXT
);

DROP TABLE IF EXISTS dimension3;

CREATE TABLE dimension3(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  route TEXT,
  who TEXT,
  role TEXT,
  software TEXT,
  description TEXT,
  links TEXT
);

DROP TABLE IF EXISTS Fabrications;

CREATE TABLE Fabrications(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  route TEXT,
  who TEXT,
  role TEXT,
  software TEXT,
  description TEXT,
  links TEXT
);

DROP TABLE IF EXISTS Models;

CREATE TABLE Models(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  route TEXT,
  who TEXT,
  role TEXT,
  software TEXT,
  description TEXT,
  links TEXT
);
