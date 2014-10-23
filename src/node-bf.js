var fs = require("fs"), //requiers
	fork = require("child_process").fork
//reading code from file
var p = fs.readFileSync(process.argv[2]).toString();
p=p.replace(/\+\+\+\+\+\+/g,"z").replace(/\-\-\-\-\-\-/g,"Z").replace(/\>\>\>\>\>\>/g,"k").replace(/\+\+\+\+/g,"E").replace(/\-\-\-\-/g,"F").replace(/\<\<\<\</g,"G").replace(/\>\>\>\>/g,"H").replace(/\+\+\+/g,"e").replace(/\-\-\-/g,"f").replace(/\<\<\</g,"g").replace(/\>\>\>/g,"h").replace(/\+\+/g,"a").replace(/\-\-/g,"b").replace(/\<\</g,"c").replace(/\>\>/g,"d");

var pc=0,tomove=["function putchar(v){process.stdout.write(String.fromCharCode(v))};var x=[],xc=0;for(i = 0; i<32767; i++) x[i]=0;"];

switcher={
	">"	:	'++xc',
	"+" :	'++x[xc]',
	"-"	: 	'--x[xc]',
	"<"	:	'--xc',
	"."	:	'putchar(x[xc])',
	"[" :	'while(x[xc]!=0){',
	"]" : 	'}',
	";"	:	'break',
	"@"	:	'x[xc]=0',
	":"	:	'xc=0',
	"a"	:	'x[xc]+=2',
	"b"	:	'x[xc]-=2',
	"c"	:	'xc-=2',
	"d"	:	'xc+=2',
	"e"	:	'x[xc]+=3',
	"f"	:	'x[xc]-=3',
	"g"	:	'xc-=3',
	"h"	:	'xc+=3',
	"E"	:	'x[xc]+=4',
	"F"	:	'x[xc]-=4',
	"G"	:	'xc-=4',
	"H"	:	'xc+=4',
	"K"	:	'xc-=6',
	"k"	:	'xc+=6',
	"Z"	:	'x[xc]-=6',
	"z"	:	'x[xc]+=6',
	","	:	'x[xc]=getchar()'
}
for(pc = 0; pc < p.length; pc++) {
	tomove.push(switcher[p[pc]])
}
delete p,pc;
fs.writeFileSync("tmp/compiled.js",(tomove).join(";").replace(/\;\;\;/g,";").replace(/\;\;/g,";"))
fork(__dirname + "/tmp/compiled.js");

