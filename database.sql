create database NCKH;
use NCKH;
CREATE TABLE  RFID_LOG (
    dtime DATETIME,
    namecard VARCHAR(50),
    idcard  VARCHAR(20)
);

CREATE TABLE  DHT22 (
    dtime DATETIME,
    temp FLOAT,
    hum FLOAT
);

CREATE TABLE BOUND (
	temp_upper INT,
	temp_lower INT,
	hum_upper INT,
	hum_lower INT,
	dtime DATETIME
	);

INSERT INTO DHT22 VALUES (now(), 35, 80);

INSERT INTO DHT22 VALUES (now(), 30, 90);

INSERT INTO DHT22 VALUES (now(), 37, 60);
SELECT * FROM DHT22;
