<?php

    require "./bibliotecas/PHPMailer/Exception.php";
    require "./bibliotecas/PHPMailer/OAuth.php";
    require "./bibliotecas/PHPMailer/POP3.php";
    require "./bibliotecas/PHPMailer/SMTP.php";
    require "./bibliotecas/PHPMailer/PHPMailer.php";

    use  PHPMailer\PHPMailer\PHPMailer ;
    use  PHPMailer\PHPMailer\SMTP ;
    use  PHPMailer\PHPMailer\Exception ;



    class Mensagem{
        private $para = null;
        private $assunto = null;
        private $mensagem = null;
        public $status = ['codigo_status' => null, 'descricao_status'=> ''];

        public function __get($atributo){
            return $this->$atributo;
        }

        public function __set($atributo, $valor){
            $this->$atributo = $valor;
        }

        public function mensagemValida(){
            if (empty($this->para) || empty($this->assunto) || empty($this->mensagem)){
                return false;
            }

            return true;
        }
    }

    $mensagem = new Mensagem();
    $mensagem->__set('para', $_POST['para']);
    $mensagem->__set('assunto', $_POST['assunto']);
    $mensagem->__set('mensagem', $_POST['mensagem']);


    //print_r($mensagem);

    if(!$mensagem->mensagemValida()){
        echo 'Mensagem Inválida';
        header('Location: index.php');
    }

    //Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = false;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'leonardoholanda803@gmail.com';                     //SMTP username
    $mail->Password   = 'Digite sua senha do gmail';                               //SMTP password
    $mail->SMTPSecure = 'PHPMailer::ENCRYPTION_SMTPS';            //Enable implicit TLS encryption
    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('leonardoholanda803@gmail.com', 'Leonardo');
    $mail->addAddress($mensagem->__get('para'));     //Add a recipient
    //$mail->addAddress('ellen@example.com');               //Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $mensagem->__get('assunto');
    $mail->Body    = $mensagem->__get('mensagem');
    //$mail->AltBody = ('mensagem sem suporte a marcação html');

    $mail->send();
    $mensagem->status['codigo_status'] = 1;
    $mensagem->status['descricao_status'] =  'E-mail enviado com sucesso.';
    
} catch (Exception $e) {

    $mensagem->status['codigo_status'] = 2;
    $mensagem->status['descricao_status'] =  'Não foi possivel enviar este e-mail. Por favor tente mais tarde.' . $mail->ErrorInfo;

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>E-mail</title>
</head>
<body>
    <div class="container">
        <div class="py-3 text-center">
			<img class="d-block mx-auto mb-2" src="logo.png" alt="" width="72" height="72">
			<h2>Send Mail</h2>
			<p class="lead">Seu app de envio de e-mails particular!</p>
		</div>

        <div class="row">
            <div class="col-md-12">
                <?php if($mensagem->status['codigo_status'] == 1){ ?>
                    <div class="container">
                        <h1 class="display-4 text-sucess">Sucesso</h1>
                        <p><?= $mensagem->status['descricao_status'] ?></p>
                        <a href="index.php" class="btn btn-success btn-lg mt-5 text-white">Voltar</a>
                    </div>
                <?php } ?>

                <?php if($mensagem->status['codigo_status'] == 2){ ?>
                    <h1 class="display-4 text-danger">Ops</h1>
                        <p><?= $mensagem->status['descricao_status'] ?></p>
                        <a href="index.php" class="btn btn-danger btn-lg mt-5 text-white">Voltar</a>
                <?php } ?>
                
            </div>
        </div>


    </div>
</body>
</html>