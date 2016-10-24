var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('akmy-web.db');
db.run("
  INSERT INTO dimension2 (name, who, role, software, description, links)
  VALUES
  ('Boffo','http://www.boffo-ny.org/', 'Graphic Designer', 'Ai, Id, Psd', 'For each of the 7 artists participating in the Fire Island Art Camp, I designed 4 posters and postcards to advertise the artist's lecture, two film screenings and residency performance. Each poster were hung around the boardwalk for a two week period and the postcards were distributed to all the households in the area. ', 'http://www.boffo-ny.org/#pp2p17/archive, http://www.boffo-ny.org/#pp0p5/gallery-index, http://artforum.com/diary/id=48058, http://nyti.ms/2bHR6G8'), ('SHELLS','Commissioned','Graphic Designer','3d scanner, Psd','A pair of friends share a ritual of collecting and exchanging rocks, shells, twigs.. It is a way to share experiences in tangible form. The task was to unravel that story through the image of the shell, in which pictures of it's native habitat was embedded into the 3d scan of the gift.','https://goo.gl/maps/MbmKNQmBw3r'), (?,?,?,?,?,?), (?,?,?,?,?,?)",

	'','',
	'', '',
	'', '',
	function(err){
		if (err){
			throw err;
		}
	}
);
