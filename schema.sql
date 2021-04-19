DROP TABLE IF EXISTS tips;

CREATE TABLE tips (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT
);

INSERT INTO tips (title,description) 
VALUES (' Wake Up Early To Avoid Crowds', 'Rise before sunrise to have the best attractions 
all to yourself while avoiding large tourist crowds.
 It’s also a magical time for photos due to soft diffused light, 
 and it’s usually easier to interact with locals getting ready for their day.');

INSERT INTO tips (title,description)
VALUES ('Observe Daily Life Around You', 'If you really want to get a feel for the pulse of a place, one of my favorite travel tips is to spend a few hours sitting in a park or on a busy street corner by yourself just watching day to day life happen in front of you.
Slow down your train of thought and pay close attention to the details around you. The smells, the colors, human interactions, and sounds. It’s a kind of meditation — and you’ll see stuff you never noticed before.');

INSERT INTO tips (title,description)
VALUES ('Slow Down To Enjoy Your Trip', 'Please don’t try to cram 6 countries into 6 weeks of travel. All the good stuff happens when you really take the time to explore. You’ll learn about activities that aren’t in your guidebook and meet people who are eager to show you around.');

INSERT INTO tips (title,description)
VALUES ('Take Lots Of Epic Travel Photos', 'Pay attention to this travel tip. You may only see these places & meet these people once in your lifetime. Remember them forever with plenty of photos! Don’t worry about looking like a “tourist”. Great photos are the ultimate souvenirs.');

INSERT INTO tips (title,description)
VALUES ('Get Your Vaccinations', 'Getting sick in a foreign country is never fun, and some countries have a higher risk of certain diseases than your own. Do your research and learn which travel vaccinations you might need for the areas you’re planning to visit, and make sure to get your shots well before you leave on your trip.');

INSERT INTO tips (title,description)
VALUES ('Stash Extra Cash For Emergencies', 'To cover yourself in an emergency, make sure to stash some extra cash in a few different places. I recommend at least a couple hundred dollars worth. If you lose your wallet, your card stops working, or the ATMs run out of money, you’ll be glad you did.');

INSERT INTO tips (title,description)
VALUES ('Eat Away From Tourist Attractions', 'Restaurants that are conveniently next to popular tourist attractions are ALWAYS overpriced. If you want to save money on food, try walking a few blocks away to eat at a normal restaurant, not one geared for tourists with inflated prices.');

INSERT INTO tips (title,description)
VALUES ('Bring An Extra Camera Battery', 'There’s nothing worse than being in the middle of a perfect photo opportunity, but powerless to capture it because of a dead camera battery!');

INSERT INTO tips (title,description)
VALUES ('Carry Spare Passport Photos', 'Obtaining visas for certain countries can be a real pain, and some can require multiple passport sized photos. Have you ever tried to find a place that shoots passport photos in Tajikistan? It’s not easy!');

INSERT INTO tips (title,description)
VALUES ('Pack Less Stuff In Your Backpack', 'You don’t need 1/2 the gear you think you do to travel anywhere. We’ve all done it. It’s a right of passage for travelers to slowly become better at packing less.');



DROP TABLE IF EXISTS places;
CREATE TABLE places (
  placeName Text PRIMARY KEY,
  place Text,
  Adress Text,
  photo Text,
  rating DECIMAL(2,1)
);
