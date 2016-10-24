DROP TABLE IF EXISTS dimension2;
DROP TABLE IF EXISTS dimension3;
DROP TABLE IF EXISTS Fabrications;
DROP TABLE IF EXISTS Models;

CREATE TABLE dimension2(
  id INTEGER,
  name TEXT,
  route TEXT,
  who TEXT,
  role TEXT,
  software TEXT,
  description TEXT,
  links TEXT
);

CREATE TABLE dimension3(
  id INTEGER,
  name TEXT,
  route TEXT,
  who TEXT,
  role TEXT,
  software TEXT,
  description TEXT,
  links TEXT
);

CREATE TABLE Fabrications(
  id INTEGER,
  name TEXT,
  route TEXT,
  who TEXT,
  role TEXT,
  software TEXT,
  description TEXT,
  links TEXT
);

CREATE TABLE Models(
  id INTEGER,
  name TEXT,
  route TEXT,
  who TEXT,
  role TEXT,
  software TEXT,
  description TEXT,
  links TEXT
);
