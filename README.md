## License
GPL (see [LICENSE](http://www.gnu.org/licenses/gpl.html))

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
sudo mkdir /var/log/trias
sudo touch /var/log/trias/explorer.log
sudo touch /var/log/trias/request.log
sudo chmod 777 /var/log/trias/explorer.log
sudo chmod 777 /var/log/trias/request.log

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
