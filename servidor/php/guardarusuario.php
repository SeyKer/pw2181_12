<?php 
include 'conexiones.php';
function guardarusuario(){
	$respuesta=false;
	$usuario=GetSQLValueString($_POST["usuario"],"text");
	$nombre =GetSQLValueString($_POST["nombre"],"text");
	$clave  =GetSQLValueString(md5($_POST["clave"]),"text");

	$con=conecta();
	//$consulta="select usuario,nombre,clave from usuarios where usuario= '".$usuario."' limit 1";
	$consulta=sprintf("select usuario from usuarios where usuario = %s",$usuario);
	$resConsulta=mysqli_query($con,$consulta);
	$consultaGuarda = "";
	if(mysqli_num_rows($resConsulta)>0){
		$consultaGuarda=sprintf("update usuarios set nombre = %s, clave = %s where usuario = %s", $nombre,$clave,$usuario);
	 	}else{
	 		$consultaGuarda=sprintf("insert into usuarios values(default,%s,%s,%s)"),$usuario,$nombre,$clave);
	 	}
	 	mysqli_query($consultaGuarda);//Ejecuta la consulta
	 	if(mysqli_affected_rows($con)>0){//Cantidad de registros afectados
	 		$respuesta = true;
	 	}
    $salidaJSON = array('respuesta' => $respuesta);
    // var_dump($salidaJSON);
	print json_encode($salidaJSON);
}
	$opc=$_POST["opc"];
	switch ($opc) {
		case 'guardarUsuario':
			buscarusuario();
			valida();
			break;
		
		default:
			break;
	}
?>