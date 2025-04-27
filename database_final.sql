CREATE DATABASE IF NOT EXISTS backend_airsoft_marketplace;

CREATE TABLE felhasznalok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    jelszo VARCHAR(255) NOT NULL,
    telefonszam VARCHAR(255) NOT NULL,
    profilkep VARCHAR(255),
    szuldatum DATE,
    regisztracio_datuma DATE
);

CREATE TABLE fegyverek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(255) NOT NULL,
    tipus VARCHAR(255) NOT NULL,
    ar INT NOT NULL,
    leiras VARCHAR(255) NOT NULL,
    mechanika VARCHAR(255) NOT NULL,
    fps INT NOT NULL,
    fegyverek_img1 VARCHAR(255),
    fegyverek_img2 VARCHAR(255),
    fegyverek_img3 VARCHAR(255),
    suly INT NOT NULL,
    hossza INT NOT NULL,
    csohossz INT,
    tuzmod VARCHAR(255) NOT NULL,
    tulajdonos INT NOT NULL,
    eladva BOOLEAN DEFAULT 0,
    FOREIGN KEY (tulajdonos) REFERENCES felhasznalok(id)
);

CREATE TABLE kiegeszitok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(255) NOT NULL,
    tipus VARCHAR(255) NOT NULL,
    ar INT NOT NULL,
    leiras VARCHAR(255) NOT NULL,
    kiegeszitok_img1 VARCHAR(255),
    kiegeszitok_img2 VARCHAR(255),
    kiegeszitok_img3 VARCHAR(255),
    tulajdonos INT NOT NULL,
    eladva BOOLEAN DEFAULT 0,
    FOREIGN KEY (tulajdonos) REFERENCES felhasznalok(id)
);

CREATE TABLE kiszallitasok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kiszallitas_fajta VARCHAR(255) NOT NULL,
    kiszallitas_ara INT NOT NULL
);

CREATE TABLE rendelesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fegyverek_id INT NULL,
    kiegeszitok_id INT NULL,
    felhasznalok_id INT NOT NULL,
    keresztnev VARCHAR(255) NOT NULL,
    vezeteknev VARCHAR(255) NOT NULL,
    iranyitoszam INT NOT NULL,
    varos VARCHAR(255) NOT NULL,
    utca_hazszam VARCHAR(255) NOT NULL,
    telefonszam VARCHAR(255) NOT NULL,
    kiszallitasok_id INT NOT NULL,
    fizetendo INT NOT NULL,
    FOREIGN KEY (fegyverek_id) REFERENCES fegyverek(id),
    FOREIGN KEY (kiegeszitok_id) REFERENCES kiegeszitok(id),
    FOREIGN KEY (felhasznalok_id) REFERENCES felhasznalok(id),
    FOREIGN KEY (kiszallitasok_id) REFERENCES kiszallitasok(id)
);




INSERT INTO felhasznalok VALUES
(1,"Oldal Általi felhasznaló","oldalEmailCime@gmail.com","oldalaltalivagyok","00000000",NULL,"0000-00-00","0000-00-00"),
(2,"kovacsmartin05","kovacs.martin@szikszi-ozd.hu","kovacsmartinvagyok","+36307838365",NULL,"2005-11-19","0000-00-00"),
(3,"kovacsakos05","kovacs.akos@szikszi-ozd.hu","kovacsakosvagyok","+36303215320",NULL,"2005-12-14","0000-00-00");

INSERT INTO fegyverek VALUES
(1,"Delta Armory M4 AR15 RIS Charlie airsoft fegyver Full Tan","Delta Armory AR15 - M4",43642,"A külső kidolgozás sem marad el a belső minőségétől, a fegyver tartós ABS Polimerből készült, aminek sokkal jobb tulajdonságai vannak az egyszerű műanyaghoz képest.","Elektromos",380,"fegyverek/fegyver1_1.jpeg","fegyverek/fegyver1_2.jpeg","fegyverek/fegyver1_3.jpeg",2550,800,375,"Semi és Full-auto",1,0),
(2,"CyberGun AK 47 Kalashnikov manuális airsoft fegyver","CyberGun AK 47 Kalashnikov",13789,"A Cybergun által gyártott híres puska airsoft replikája. Könnyű műanyag fekete kivitel fautánzattal különösen alkalmas kezdő játékosoknak.","Rugós",260,"fegyverek/fegyver2_1.jpg","fegyverek/fegyver2_3.jpeg","fegyverek/fegyver2_3.jpeg",2250,870,NULL,"Semi",1,0),
(3,"Airsoft fegyver Remington M700 Green Gas Double Bell","Double Bell Remington M700",108254,"A Green Gas működő Remington M700 Airsoft puska ideális élményt nyújt minden tapasztalt airsoft játékosnak. A fegyvert a Double Bell gyártja.","Gázos",390,"fegyverek/fegyver3_1.jpg","fegyverek/fegyver3_2.jpg","fegyverek/fegyver3_3.jpg",3430,1180,665,"Semi",1,0),
(4,"Glock 17 gen.3 Metal Version Co2 airsoft pisztoly","Umarex Glock 17 gen.3",59865,"Glock 17 a gyártótól Umarex. Ez a Glock 17 valósághű visszarúgáshatást biztosít. A fegyver hossza 205 mm, a belső cső hossza 100 mm. A fegyver fix Hop-Up funkcióval rendelkezik.","Gázos",459,"fegyverek/fegyver4_1.jpg","fegyverek/fegyver4_2.jpg","fegyverek/fegyver4_2.jpg",640,205,100,"Semi",1,0),
(5,"CyberGun PT92 HPA Dual Tone manuális airsoft pisztoly","CyberGun PT92 HPA Dual Tone",10620,"PT92 HPA Dual Tone manuális airsoft pisztoly a CyberGun-tól. A fegyver fémből és műanyagból készült, ennek a modellnek a teljesítménye 0,5 J. A kaliber 6 mm.","Rugós",232,"fegyverek/fegyver5_1.jpg","fegyverek/fegyver5_2.jpg","fegyverek/fegyver5_3.jpg",500,215,NULL,"Semi",1,0),
(6,"CYMA AEP CM128S airsoft pisztoly","CYMA AEP CM128S",40681,"Elektromos airsoft fegyver. A fegyver tartós polimerből és fémből készült. A fém alkatrészek közé tartozik a szán és a kis elemek, például a csavarok és a tár alkatrészei.","Elektromos",200,"fegyverek/fegyver6_1.jpg","fegyverek/fegyver6_2.jpg","fegyverek/fegyver6_3.jpg",780,230,NULL,"Semi",1,1);


INSERT INTO kiegeszitok VALUES
(1,"Guerilla Tactical Jump taktikai mellény","Guerilla Tactical",14645,"A mellény könnyű, nylon anyagból készült, 2 részből áll, tartalmaz első és hátsó ballisztikai panel imitációkat.","kiegeszitok/kieg1_1.jpg","kiegeszitok/kieg1_2.jpg","kiegeszitok/kieg1_3.jpg",1,0),
(2,"Protective maszk Guardian glass v.2 Guerilla Tactical","Guerilla Tactical",5567,"Airsoft maszk Guardian v.2 a Guerilla Tactical-tól ABS műanyagból. A maszk egy védőszemüvegből, egy arcot és nyakat védő részből, valamint egy homlokot védő részből áll.","kiegeszitok/kieg2_1.jpg","kiegeszitok/kieg2_2.jpg","kiegeszitok/kieg2_3.jpg",1,0),
(3,"Fast type Air Flow airsoft sisak Delta Armory Tan","Delta Armory",19955,"Airsoft sisak Fast típusú Air Flow a Delta Armory gyártótól. A sisak tartós és erős ABS műanyagból készült.","kiegeszitok/kieg3_1.jpg","kiegeszitok/kieg3_2.jpg","kiegeszitok/kieg3_3.jpg",1,0);

insert into kiszallitasok VALUES
(1,"Foxpost autómata",500),
(2,"GLS autómata",500),
(3,"Packet autómata/csomagátvevő pont",500),
(4,"GLS házhozszállítás",1190);

INSERT INTO rendelesek VALUES
(1, NULL, 6, 3, "Ákos", "Kovács", 3623, "Borsodszentgyörgy", "Szentgyörgy út 13", "+36303215320", 4, 41871);