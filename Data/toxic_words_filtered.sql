CREATE TABLE toxic_words_filtered (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_word VARCHAR(100),
    normalized_word VARCHAR(100),
    toxicity FLOAT
);

INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('fuck', 'fuck', 0.863);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('dumb', 'dumb', 0.5922);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('bullied', 'bullied', 0.2546);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('rape', 'rape', 0.4575);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('nigger', 'nigger', 0.7189);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('gay', 'gay', 0.5717);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('bully', 'bully', 0.3775);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('ass', 'ass', 0.6343);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('black', 'black', 0.2741);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('muslims', 'muslims', 0.1138);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('muslim', 'muslim', 0.1374);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('white', 'white', 0.1141);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('bitch', 'bitch', 0.8988);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('idiot', 'idiot', 0.846);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('fucking', 'fucking', 0.846);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('bullies', 'bullies', 0.3271);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('shit', 'shit', 0.7857);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('idiots', 'idiots', 0.8205);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('hate', 'hate', 0.2959);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('niggers', 'niggers', 0.6864);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('bullying', 'bullying', 0.2546);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('terrorism', 'terrorism', 0.1941);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('sexist', 'sexist', 0.3902);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('racist', 'racist', 0.4619);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('bad', 'bad', 0.1555);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('racism', 'racism', 0.2648);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('isis', 'isis', 0.1538);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('terrorist', 'terrorist', 0.3923);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('stupid', 'stupid', 0.7701);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('terrorists', 'terrorists', 0.3433);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('disgusting', 'disgusting', 0.4402);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('jihad', 'jihad', 0.1052);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('negro', 'negro', 0.6028);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('mad', 'mad', 0.2904);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('ugly', 'ugly', 0.5076);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('bitches', 'bitches', 0.846);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('kill', 'kill', 0.4269);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('nigga', 'nigga', 0.66);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('feminazi', 'feminazi', 0.505);
INSERT INTO toxic_words_filtered (original_word, normalized_word, toxicity) VALUES ('hell', 'hell', 0.324);
