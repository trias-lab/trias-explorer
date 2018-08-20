# trias-explorer
The lightweight trias block explorer

## Requirements
 - python: 3.4 or later.
 - Django: 1.9.7 or later.
 - django-webpack-loader: 0.2.4
 - react: 16.3.2
 - webpack: 2.7.0

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
