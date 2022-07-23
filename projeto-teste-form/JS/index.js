
    // validador CPF
    function is_cpf (c) {

if((c = c.replace(/[^\d]/g,"")).length != 11)
  return false

if (c == "00000000000")
  return false;

var r;
var s = 0;

for (i=1; i<=9; i++)
  s = s + parseInt(c[i-1]) * (11 - i);

r = (s * 10) % 11;

if ((r == 10) || (r == 11))
  r = 0;

if (r != parseInt(c[9]))
  return false;

s = 0;

for (i = 1; i <= 10; i++)
  s = s + parseInt(c[i-1]) * (12 - i);

r = (s * 10) % 11;

if ((r == 10) || (r == 11))
  r = 0;

if (r != parseInt(c[10]))
  return false;

return true;
}

function fMasc(objeto,mascara) {
obj=objeto
masc=mascara
setTimeout("fMascEx()",1)
}

function fMascEx() {
obj.value=masc(obj.value)
}

function mCPF(cpf){
cpf=cpf.replace(/\D/g,"")
cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
return cpf
}

cpfCheck = function (el) {
  document.getElementById('cpfResponse').innerHTML = is_cpf(el.value)? '<span style="color:#00bbd8">válido</span>' : '<span style="color:#920e78">inválido</span>';
  if(el.value=='') document.getElementById('cpfResponse').innerHTML = '';
}

      // Validação de Data de Nascimento
    function validardataDeNascimento(data){

dataAtual= new Date();

data=new Date(data);

if (data<dataAtual){
    console.log("Data Válida");
    return true;
} else {
    alert("Data Inválida");
    return false;
}
}

      //Validar se todo o formúlario está preenchido
        document.getElementById("botao").disabled = true;
        document.getElementById("input").addEventListener("input", function(event){

  
        var conteudo = document.getElementById("input").value;

    
        if (conteudo !== null && conteudo !== '' && senha !== senha1) {

        
        document.getElementById("botao").disabled = false;
        } else {
        document.getElementById("botao").disabled = true;
      }

});           

      //Validação de Senhas
      function validarSenha(senha, senha1)
{
      var senha = document.getElementById("senha").value;
      var senha1 = document.getElementById("senha1").value;
		
         if (senha != "" && senha1 != "" && senha === senha1)
        {
    	      console.log('Senhas iguais');
        }
        else
        {
      	    alert('Senhas diferentes');
        }
}

      //Cadastro Enviado
      function cadastroEnviado(){
        alert('Cadastro Enviado')
        return
      }
      