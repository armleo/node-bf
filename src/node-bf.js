var fs = require("fs"), //requiers
	fork = require("child_process").fork;
	
	
//reading code from file
var p = fs.readFileSync(process.argv[2]).toString().split("");



var pc=0,x=[],xc=0,result=["function putchar(v){process.stdout.write(String.fromCharCode(v))};\nfunction getchar(){while(!input){} return input.charCodeAt(0);};var x=Uint8Array(32768),xc=0,input;for(i = 0; i<32767; i++) x[i]=0;"];
for(var i = 0; i<32767; i++) x[i]=0;

function count(v)
{
	var a=0;
	while(p[pc]==v)
	{
		++a;
		++pc;
	}
	--pc;
	return a;
}

for(pc = 0; pc < p.length;++pc) {
	switch(p[pc])
	{
	case "[":
		if(p[pc+1]=="-"&&p[pc+2]=="]")
		{
			result.push("x[xc]=0;");
			pc+=2;
		}
		else
			result.push("while(x[xc]!=0){");
		break;
	case "]":
		result.push("}");
		break;
	case ">":
		result.push("xc+="+count(">")+";");
		break;
	case "<":
		result.push("xc-="+count("<")+";");
		break;
	case "+":
		result.push("x[xc]+="+count("+")+";");
		break;
	case "-":
		result.push("x[xc]-="+count("-")+";");
		break;
	case ".":
		result.push("putchar(x[xc]);");
		break;
	case ",":
		result.push("x[xc]=getchar();");
		break;
	}
}

fs.writeFileSync("../tmp/compiled.js",result.join("\n"))
fork(__dirname + "/../tmp/compiled.js");