# trias_script
区块链浏览器trias-explorer的脚本服务，用于获取区块相关信息

## Requirements
 - python: 3.7 or later.

## log files
 - sudo mkdir /var/log/trias
 - sudo touch /var/log/trias/explorer.log
 - sudo chmod 777 /var/log/trias/explorer.log

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

Then, start the django server: 

`python3 main.py`

