!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r=window.webpackJsonp;window.webpackJsonp=function(n,i,a){for(var u,s,l,f=0,c=[];f<n.length;f++)s=n[f],o[s]&&c.push(o[s][0]),o[s]=0;for(u in i)Object.prototype.hasOwnProperty.call(i,u)&&(t[u]=i[u]);for(r&&r(n,i,a);c.length;)c.shift()();if(a)for(f=0;f<a.length;f++)l=e(e.s=a[f]);return l};var n={},o={1:0};e.e=function(t){function r(){u.onerror=u.onload=null,clearTimeout(s);var e=o[t];0!==e&&(e&&e[1](new Error("Loading chunk "+t+" failed.")),o[t]=void 0)}var n=o[t];if(0===n)return new Promise(function(t){t()});if(n)return n[2];var i=new Promise(function(e,r){n=o[t]=[e,r]});n[2]=i;var a=document.getElementsByTagName("head")[0],u=document.createElement("script");u.type="text/javascript",u.charset="utf-8",u.async=!0,u.timeout=12e4,e.nc&&u.setAttribute("nonce",e.nc),u.src=e.p+""+t+"-1a271040cafac9668a97.js";var s=setTimeout(r,12e4);return u.onerror=u.onload=r,a.appendChild(u),i},e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/static/bundles/prod/",e.oe=function(t){throw console.error(t),t},e(e.s=521)}({0:function(t,e,r){"use strict";t.exports=r(472)},12:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},167:function(t,e,r){"use strict";function n(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var o=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(t){n[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var r,u,s=n(t),l=1;l<arguments.length;l++){r=Object(arguments[l]);for(var f in r)i.call(r,f)&&(s[f]=r[f]);if(o){u=o(r);for(var c=0;c<u.length;c++)a.call(r,u[c])&&(s[u[c]]=r[u[c]])}}return s}},219:function(t,e,r){"use strict";(function(t){!function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0;e&&e(t)}();var e;"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature,function(){function t(t){this.mode=s.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,r=this.data.length;e<r;e++){var n=[],o=this.data.charCodeAt(e);o>65536?(n[0]=240|(1835008&o)>>>18,n[1]=128|(258048&o)>>>12,n[2]=128|(4032&o)>>>6,n[3]=128|63&o):o>2048?(n[0]=224|(61440&o)>>>12,n[1]=128|(4032&o)>>>6,n[2]=128|63&o):o>128?(n[0]=192|(1984&o)>>>6,n[1]=128|63&o):n[0]=o,this.parsedData.push(n)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function r(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function n(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var n=0;n<t.length-r;n++)this.num[n]=t[n+r]}function o(t,e){this.totalCount=t,this.dataCount=e}function i(){this.buffer=[],this.length=0}function a(t,e){for(var r=1,n=u(t),o=0,i=d.length;o<=i;o++){var a=0;switch(e){case l.L:a=d[o][0];break;case l.M:a=d[o][1];break;case l.Q:a=d[o][2];break;case l.H:a=d[o][3]}if(n<=a)break;r++}if(r>d.length)throw new Error("Too long data");return r}function u(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}t.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,r=this.parsedData.length;e<r;e++)t.put(this.parsedData[e],8)}},r.prototype={addData:function(e){var r=new t(e);this.dataList.push(r),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++){this.modules[n]=new Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++)this.modules[n][o]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=r.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var n=-1;n<=7;n++)e+n<=-1||this.moduleCount<=e+n||(this.modules[t+r][e+n]=0<=r&&r<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=n&&n<=4)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var n=c.getLostPoint(this);(0==r||t>n)&&(t=n,e=r)}return e},createMovieClip:function(t,e,r){var n=t.createEmptyMovieClip(e,r);this.make();for(var o=0;o<this.modules.length;o++)for(var i=1*o,a=0;a<this.modules[o].length;a++){var u=1*a,s=this.modules[o][a];s&&(n.beginFill(0,100),n.moveTo(u,i),n.lineTo(u+1,i),n.lineTo(u+1,i+1),n.lineTo(u,i+1),n.endFill())}return n},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=c.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var n=t[e],o=t[r];if(null==this.modules[n][o])for(var i=-2;i<=2;i++)for(var a=-2;a<=2;a++)this.modules[n+i][o+a]=-2==i||2==i||-2==a||2==a||0==i&&0==a}},setupTypeNumber:function(t){for(var e=c.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var n=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=n}for(var r=0;r<18;r++){var n=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=n}},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,n=c.getBCHTypeInfo(r),o=0;o<15;o++){var i=!t&&1==(n>>o&1);o<6?this.modules[o][8]=i:o<8?this.modules[o+1][8]=i:this.modules[this.moduleCount-15+o][8]=i}for(var o=0;o<15;o++){var i=!t&&1==(n>>o&1);o<8?this.modules[8][this.moduleCount-o-1]=i:o<9?this.modules[8][15-o-1+1]=i:this.modules[8][15-o-1]=i}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,n=this.moduleCount-1,o=7,i=0,a=this.moduleCount-1;a>0;a-=2)for(6==a&&a--;;){for(var u=0;u<2;u++)if(null==this.modules[n][a-u]){var s=!1;i<t.length&&(s=1==(t[i]>>>o&1));var l=c.getMask(e,n,a-u);l&&(s=!s),this.modules[n][a-u]=s,-1==--o&&(i++,o=7)}if((n+=r)<0||this.moduleCount<=n){n-=r,r=-r;break}}}},r.PAD0=236,r.PAD1=17,r.createData=function(t,e,n){for(var a=o.getRSBlocks(t,e),u=new i,s=0;s<n.length;s++){var l=n[s];u.put(l.mode,4),u.put(l.getLength(),c.getLengthInBits(l.mode,t)),l.write(u)}for(var f=0,s=0;s<a.length;s++)f+=a[s].dataCount;if(u.getLengthInBits()>8*f)throw new Error("code length overflow. ("+u.getLengthInBits()+">"+8*f+")");for(u.getLengthInBits()+4<=8*f&&u.put(0,4);u.getLengthInBits()%8!=0;)u.putBit(!1);for(;!(u.getLengthInBits()>=8*f)&&(u.put(r.PAD0,8),!(u.getLengthInBits()>=8*f));)u.put(r.PAD1,8);return r.createBytes(u,a)},r.createBytes=function(t,e){for(var r=0,o=0,i=0,a=new Array(e.length),u=new Array(e.length),s=0;s<e.length;s++){var l=e[s].dataCount,f=e[s].totalCount-l;o=Math.max(o,l),i=Math.max(i,f),a[s]=new Array(l);for(var h=0;h<a[s].length;h++)a[s][h]=255&t.buffer[h+r];r+=l;var p=c.getErrorCorrectPolynomial(f),d=new n(a[s],p.getLength()-1),g=d.mod(p);u[s]=new Array(p.getLength()-1);for(var h=0;h<u[s].length;h++){var m=h+g.getLength()-u[s].length;u[s][h]=m>=0?g.get(m):0}}for(var v=0,h=0;h<e.length;h++)v+=e[h].totalCount;for(var y=new Array(v),_=0,h=0;h<o;h++)for(var s=0;s<e.length;s++)h<a[s].length&&(y[_++]=a[s][h]);for(var h=0;h<i;h++)for(var s=0;s<e.length;s++)h<u[s].length&&(y[_++]=u[s][h]);return y};for(var s={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},l={L:1,M:0,Q:3,H:2},f={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},c={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;c.getBCHDigit(e)-c.getBCHDigit(c.G15)>=0;)e^=c.G15<<c.getBCHDigit(e)-c.getBCHDigit(c.G15);return(t<<10|e)^c.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;c.getBCHDigit(e)-c.getBCHDigit(c.G18)>=0;)e^=c.G18<<c.getBCHDigit(e)-c.getBCHDigit(c.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return c.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case f.PATTERN000:return(e+r)%2==0;case f.PATTERN001:return e%2==0;case f.PATTERN010:return r%3==0;case f.PATTERN011:return(e+r)%3==0;case f.PATTERN100:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case f.PATTERN101:return e*r%2+e*r%3==0;case f.PATTERN110:return(e*r%2+e*r%3)%2==0;case f.PATTERN111:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new n([1],0),r=0;r<t;r++)e=e.multiply(new n([1,h.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case s.MODE_NUMBER:return 10;case s.MODE_ALPHA_NUM:return 9;case s.MODE_8BIT_BYTE:case s.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case s.MODE_NUMBER:return 12;case s.MODE_ALPHA_NUM:return 11;case s.MODE_8BIT_BYTE:return 16;case s.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case s.MODE_NUMBER:return 14;case s.MODE_ALPHA_NUM:return 13;case s.MODE_8BIT_BYTE:return 16;case s.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,n=0;n<e;n++)for(var o=0;o<e;o++){for(var i=0,a=t.isDark(n,o),u=-1;u<=1;u++)if(!(n+u<0||e<=n+u))for(var s=-1;s<=1;s++)o+s<0||e<=o+s||0==u&&0==s||a==t.isDark(n+u,o+s)&&i++;i>5&&(r+=3+i-5)}for(var n=0;n<e-1;n++)for(var o=0;o<e-1;o++){var l=0;t.isDark(n,o)&&l++,t.isDark(n+1,o)&&l++,t.isDark(n,o+1)&&l++,t.isDark(n+1,o+1)&&l++,0!=l&&4!=l||(r+=3)}for(var n=0;n<e;n++)for(var o=0;o<e-6;o++)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(r+=40);for(var o=0;o<e;o++)for(var n=0;n<e-6;n++)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(r+=40);for(var f=0,o=0;o<e;o++)for(var n=0;n<e;n++)t.isDark(n,o)&&f++;return r+=Math.abs(100*f/e/e-50)/5*10}},h={glog:function(t){if(t<1)throw new Error("glog("+t+")");return h.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return h.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},p=0;p<8;p++)h.EXP_TABLE[p]=1<<p;for(var p=8;p<256;p++)h.EXP_TABLE[p]=h.EXP_TABLE[p-4]^h.EXP_TABLE[p-5]^h.EXP_TABLE[p-6]^h.EXP_TABLE[p-8];for(var p=0;p<255;p++)h.LOG_TABLE[h.EXP_TABLE[p]]=p;n.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var o=0;o<t.getLength();o++)e[r+o]^=h.gexp(h.glog(this.get(r))+h.glog(t.get(o)));return new n(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=h.glog(this.get(0))-h.glog(t.get(0)),r=new Array(this.getLength()),o=0;o<this.getLength();o++)r[o]=this.get(o);for(var o=0;o<t.getLength();o++)r[o]^=h.gexp(h.glog(t.get(o))+e);return new n(r,0).mod(t)}},o.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],o.getRSBlocks=function(t,e){var r=o.getRsBlockTable(t,e);if(void 0==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var n=r.length/3,i=[],a=0;a<n;a++)for(var u=r[3*a+0],s=r[3*a+1],l=r[3*a+2],f=0;f<u;f++)i.push(new o(s,l));return i},o.getRsBlockTable=function(t,e){switch(e){case l.L:return o.RS_BLOCK_TABLE[4*(t-1)+0];case l.M:return o.RS_BLOCK_TABLE[4*(t-1)+1];case l.Q:return o.RS_BLOCK_TABLE[4*(t-1)+2];case l.H:return o.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},i.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var d=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],g=function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){function e(t,e){var r=document.createElementNS("http://www.w3.org/2000/svg",t);for(var n in e)e.hasOwnProperty(n)&&r.setAttribute(n,e[n]);return r}var r=this._htOption,n=this._el,o=t.getModuleCount();Math.floor(r.width/o),Math.floor(r.height/o),this.clear();var i=e("svg",{viewBox:"0 0 "+String(o)+" "+String(o),width:"100%",height:"100%",fill:r.colorLight});i.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),n.appendChild(i),i.appendChild(e("rect",{fill:r.colorLight,width:"100%",height:"100%"})),i.appendChild(e("rect",{fill:r.colorDark,width:"1",height:"1",id:"template"}));for(var a=0;a<o;a++)for(var u=0;u<o;u++)if(t.isDark(a,u)){var s=e("use",{x:String(u),y:String(a)});s.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),i.appendChild(s)}},t.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},t}(),m="svg"===document.documentElement.tagName.toLowerCase(),v=m?g:function(){return"undefined"!=typeof CanvasRenderingContext2D}()?function(){function t(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function e(t,e){var r=this;if(r._fFail=e,r._fSuccess=t,null===r._bSupportDataURI){var n=document.createElement("img"),o=function(){r._bSupportDataURI=!1,r._fFail&&r._fFail.call(r)},i=function(){r._bSupportDataURI=!0,r._fSuccess&&r._fSuccess.call(r)};return n.onabort=o,n.onerror=o,n.onload=i,void(n.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")}!0===r._bSupportDataURI&&r._fSuccess?r._fSuccess.call(r):!1===r._bSupportDataURI&&r._fFail&&r._fFail.call(r)}var r=function(t,e){this._bIsPainted=!1,this._htOption=e,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=e.width,this._elCanvas.height=e.height,t.appendChild(this._elCanvas),this._el=t,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.alt="Scan me!",this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return r.prototype.draw=function(t){var e=this._elImage,r=this._oContext,n=this._htOption,o=t.getModuleCount(),i=n.width/o,a=n.height/o,u=Math.round(i),s=Math.round(a);e.style.display="none",this.clear();for(var l=0;l<o;l++)for(var f=0;f<o;f++){var c=t.isDark(l,f),h=f*i,p=l*a;r.strokeStyle=c?n.colorDark:n.colorLight,r.lineWidth=1,r.fillStyle=c?n.colorDark:n.colorLight,r.fillRect(h,p,i,a),r.strokeRect(Math.floor(h)+.5,Math.floor(p)+.5,u,s),r.strokeRect(Math.ceil(h)-.5,Math.ceil(p)-.5,u,s)}this._bIsPainted=!0},r.prototype.makeImage=function(){this._bIsPainted&&e.call(this,t)},r.prototype.isPainted=function(){return this._bIsPainted},r.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},r.prototype.round=function(t){return t?Math.floor(1e3*t)/1e3:t},r}():function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){for(var e=this._htOption,r=this._el,n=t.getModuleCount(),o=Math.floor(e.width/n),i=Math.floor(e.height/n),a=['<table style="border:0;border-collapse:collapse;">'],u=0;u<n;u++){a.push("<tr>");for(var s=0;s<n;s++)a.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+o+"px;height:"+i+"px;background-color:"+(t.isDark(u,s)?e.colorDark:e.colorLight)+';"></td>');a.push("</tr>")}a.push("</table>"),r.innerHTML=a.join("");var l=r.childNodes[0],f=(e.width-l.offsetWidth)/2,c=(e.height-l.offsetHeight)/2;f>0&&c>0&&(l.style.margin=c+"px "+f+"px")},t.prototype.clear=function(){this._el.innerHTML=""},t}();e=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:l.H},"string"==typeof e&&(e={text:e}),e)for(var r in e)this._htOption[r]=e[r];"string"==typeof t&&(t=document.getElementById(t)),this._htOption.useSVG&&(v=g),this._el=t,this._oQRCode=null,this._oDrawing=new v(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},e.prototype.makeCode=function(t){this._oQRCode=new r(a(t,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this._el.title=t,this._oDrawing.draw(this._oQRCode),this.makeImage()},e.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&this._oDrawing.makeImage()},e.prototype.clear=function(){this._oDrawing.clear()},e.CorrectLevel=l,this.QRCode=e}.call(self),function(){var t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;t&&t.register(e,"QRCode","/Users/wangjiaxing/work-8lab/trias-explorer/html/js/qrcode.js")}(),function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0;e&&e(t)}()}).call(e,r(12)(t))},472:function(t,e,r){"use strict";function n(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,r=1;r<arguments.length;r++)e+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(t,e,r){this.props=t,this.context=e,this.refs=I,this.updater=r||S}function i(){}function a(t,e,r){this.props=t,this.context=e,this.refs=I,this.updater=r||S}function u(t,e,r){var n,o={},i=null,a=null;if(null!=e)for(n in void 0!==e.ref&&(a=e.ref),void 0!==e.key&&(i=""+e.key),e)j.call(e,n)&&!H.hasOwnProperty(n)&&(o[n]=e[n]);var u=arguments.length-2;if(1===u)o.children=r;else if(1<u){for(var s=Array(u),l=0;l<u;l++)s[l]=arguments[l+2];o.children=s}if(t&&t.defaultProps)for(n in u=t.defaultProps)void 0===o[n]&&(o[n]=u[n]);return{$$typeof:C,type:t,key:i,ref:a,props:o,_owner:x.current}}function s(t,e){return{$$typeof:C,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function l(t){return"object"==typeof t&&null!==t&&t.$$typeof===C}function f(t){var e={"=":"=0",":":"=2"};return"$"+(""+t).replace(/[=:]/g,function(t){return e[t]})}function c(t,e,r,n){if(G.length){var o=G.pop();return o.result=t,o.keyPrefix=e,o.func=r,o.context=n,o.count=0,o}return{result:t,keyPrefix:e,func:r,context:n,count:0}}function h(t){t.result=null,t.keyPrefix=null,t.func=null,t.context=null,t.count=0,10>G.length&&G.push(t)}function p(t,e,r,o){var i=typeof t;"undefined"!==i&&"boolean"!==i||(t=null);var a=!1;if(null===t)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case C:case E:a=!0}}if(a)return r(o,t,""===e?"."+g(t,0):e),1;if(a=0,e=""===e?".":e+":",Array.isArray(t))for(var u=0;u<t.length;u++){i=t[u];var s=e+g(i,u);a+=p(i,s,r,o)}else if(null===t||"object"!=typeof t?s=null:(s=M&&t[M]||t["@@iterator"],s="function"==typeof s?s:null),"function"==typeof s)for(t=s.call(t),u=0;!(i=t.next()).done;)i=i.value,s=e+g(i,u++),a+=p(i,s,r,o);else if("object"===i)throw r=""+t,Error(n(31,"[object Object]"===r?"object with keys {"+Object.keys(t).join(", ")+"}":r,""));return a}function d(t,e,r){return null==t?0:p(t,"",e,r)}function g(t,e){return"object"==typeof t&&null!==t&&null!=t.key?f(t.key):e.toString(36)}function m(t,e){t.func.call(t.context,e,t.count++)}function v(t,e,r){var n=t.result,o=t.keyPrefix;t=t.func.call(t.context,e,t.count++),Array.isArray(t)?y(t,n,r,function(t){return t}):null!=t&&(l(t)&&(t=s(t,o+(!t.key||e&&e.key===t.key?"":(""+t.key).replace(U,"$&/")+"/")+r)),n.push(t))}function y(t,e,r,n,o){var i="";null!=r&&(i=(""+r).replace(U,"$&/")+"/"),e=c(e,i,n,o),d(t,v,e),h(e)}function _(){var t=$.current;if(null===t)throw Error(n(321));return t}var w=r(167),b="function"==typeof Symbol&&Symbol.for,C=b?Symbol.for("react.element"):60103,E=b?Symbol.for("react.portal"):60106,A=b?Symbol.for("react.fragment"):60107,P=b?Symbol.for("react.strict_mode"):60108,k=b?Symbol.for("react.profiler"):60114,D=b?Symbol.for("react.provider"):60109,L=b?Symbol.for("react.context"):60110,T=b?Symbol.for("react.forward_ref"):60112,B=b?Symbol.for("react.suspense"):60113,O=b?Symbol.for("react.memo"):60115,R=b?Symbol.for("react.lazy"):60116,M="function"==typeof Symbol&&Symbol.iterator,S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},I={};o.prototype.isReactComponent={},o.prototype.setState=function(t,e){if("object"!=typeof t&&"function"!=typeof t&&null!=t)throw Error(n(85));this.updater.enqueueSetState(this,t,e,"setState")},o.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")},i.prototype=o.prototype;var N=a.prototype=new i;N.constructor=a,w(N,o.prototype),N.isPureReactComponent=!0;var x={current:null},j=Object.prototype.hasOwnProperty,H={key:!0,ref:!0,__self:!0,__source:!0},U=/\/+/g,G=[],$={current:null},F={ReactCurrentDispatcher:$,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:x,IsSomeRendererActing:{current:!1},assign:w};e.Children={map:function(t,e,r){if(null==t)return t;var n=[];return y(t,n,null,e,r),n},forEach:function(t,e,r){if(null==t)return t;e=c(null,null,e,r),d(t,m,e),h(e)},count:function(t){return d(t,function(){return null},null)},toArray:function(t){var e=[];return y(t,e,null,function(t){return t}),e},only:function(t){if(!l(t))throw Error(n(143));return t}},e.Component=o,e.Fragment=A,e.Profiler=k,e.PureComponent=a,e.StrictMode=P,e.Suspense=B,e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F,e.cloneElement=function(t,e,r){if(null===t||void 0===t)throw Error(n(267,t));var o=w({},t.props),i=t.key,a=t.ref,u=t._owner;if(null!=e){if(void 0!==e.ref&&(a=e.ref,u=x.current),void 0!==e.key&&(i=""+e.key),t.type&&t.type.defaultProps)var s=t.type.defaultProps;for(l in e)j.call(e,l)&&!H.hasOwnProperty(l)&&(o[l]=void 0===e[l]&&void 0!==s?s[l]:e[l])}var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){s=Array(l);for(var f=0;f<l;f++)s[f]=arguments[f+2];o.children=s}return{$$typeof:C,type:t.type,key:i,ref:a,props:o,_owner:u}},e.createContext=function(t,e){return void 0===e&&(e=null),t={$$typeof:L,_calculateChangedBits:e,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider={$$typeof:D,_context:t},t.Consumer=t},e.createElement=u,e.createFactory=function(t){var e=u.bind(null,t);return e.type=t,e},e.createRef=function(){return{current:null}},e.forwardRef=function(t){return{$$typeof:T,render:t}},e.isValidElement=l,e.lazy=function(t){return{$$typeof:R,_ctor:t,_status:-1,_result:null}},e.memo=function(t,e){return{$$typeof:O,type:t,compare:void 0===e?null:e}},e.useCallback=function(t,e){return _().useCallback(t,e)},e.useContext=function(t,e){return _().useContext(t,e)},e.useDebugValue=function(){},e.useEffect=function(t,e){return _().useEffect(t,e)},e.useImperativeHandle=function(t,e,r){return _().useImperativeHandle(t,e,r)},e.useLayoutEffect=function(t,e){return _().useLayoutEffect(t,e)},e.useMemo=function(t,e){return _().useMemo(t,e)},e.useReducer=function(t,e,r){return _().useReducer(t,e,r)},e.useRef=function(t){return _().useRef(t)},e.useState=function(t){return _().useState(t)},e.version="16.13.0"},521:function(t,e,r){r(0),t.exports=r(219)}});