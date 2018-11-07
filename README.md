## License
GPLv3 (see [LICENSE](https://github.com/trias-lab/trias-explorer/blob/master/LICENSE))

# trias-explorer
trias-explorer is a Trias blockchain explorer built with Python, Django and React.    
It must connect to Trias public chain nodes to collect information. You can use it to browse blocks, transactions, and accounts.

## Requirements
 - python: 3.4 or later.
 - Django: 1.9.7 or later.
 - django-webpack-loader: 0.2.4
 - react: 16.3.2
 - webpack: 2.7.0
 - requests
 - apscheduler

## log files
 - sudo mkdir /var/log/trias
 - sudo touch /var/log/trias/explorer.log
 - sudo touch /var/log/trias/request.log
 - sudo chmod 777 /var/log/trias/explorer.log
 - sudo chmod 777 /var/log/trias/request.log

## change config file
config file path is conf/conf.json
 - replace eth_ip value with trias public chain node's ip. for example "192.168.1.1"
 - replace eth_port value with trias public chain node's rpc port number. for example "8545"
 - replace mysql_ip value with your mysql database server's ip. for example "192.168.1.1"
 - replace mysql_port value with your mysql database server's port number. for example "3306"
 - replace mysql_user value with your mysql user name. for example "user"
 - replace mysql_password value with your mysql user password. for example "pass"
 - replace mysql_database value with your mysql database name. for example "db"

## Contributions
Install dependencies: 

```
pip3 install -r requirements.txt
```
```
npm install
```

Next,
- Development mode, run `webpack-dev-server`: 
  
  `npm start`
  
- Production mode, run `webpack`: 
  
  `npm run build`

Then, start the django server: 

`python3 manage.py runserver`

Finally, open http://localhost:8000 .
