# Angular
Projet M1 MIAGE 22-23 (back+front)

Please see /front and /back for the respective READMEs.

# Setup

## Terminal no. 0 (project as a whole, DB)

```
cd ~
git clone https://github.com/raversa001/Angular.git 

cd Angular

sudo mysql -u root
CREATE DATABASE IF NOT EXISTS Angular;
USE Angular;
source angular.sql;
```

## Terminal no. 1 (front end)
```
cd Angular
cd front
npm i
npm start
```

### Terminal no. 2 (back end)
```
cd Angular
cd back
npm i
npm start
```

Make sure to keep both terminals open at all time.