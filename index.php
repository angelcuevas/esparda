<!DOCTYPE >
<html>
	<head>
		
	<meta charset="utf-8">
		
		<link rel="stylesheet" type="text/css" href="jquery.mobile/jquery.mobile-1.4.5.css">
		<SCRIPT TYPE="text/javascript" src="jquery.mobile/jquery-1.7.2.min"></SCRIPT>
		<SCRIPT TYPE="text/javascript" src="jquery.mobile/jquery.mobile-1.4.5.js"></SCRIPT>
		<!--<SCRIPT TYPE="text/javascript" src="phonegap-1.4.1.js"></SCRIPT>-->
		<style type="text/css">
			.ui-f
				{
					background-color:#D37D00;
					
					text-align: center;
				}
			.ui-fondo{

			
				background-repeat: no-repeat;
				background-size: cover;
				


			}
			.imgfija{    box-shadow: 0px 4px 7px black;
			width:100%;}
			.boton1{ 
    background-color: rgb(36, 36, 36);
    text-shadow: none;
    color: #FF0E48;
}
		</style>
	</head>

	<body>
		<div data-role="page" id="principal">
			<!- -----------Panel 1 izquierda--------->
			<div data-role="panel" data-display="overlay" data-position="left" id="panel1">
				<button data-icon="delete" style="width:10px;" data-icompos="no-text" data-rel="close" data-theme="b"></button>
				<div data-role="header" class="ui-f" data-theme="f"> <h1 >Sedes</h1> </div>
				<div data-role="content">
					<ul data-role="listview"> 
						<li> <a href="#"> Capital</a></li>
						<li> <a href="#"> Catuna</a></li>
						<li> <a href="#"> Chamical</a></li>
						<li> <a href="#"> Aimogasta</a></li>
					</ul>
				</div>
				<div data-role="footer" class="ui-f" data-theme="f">
					<br>

				</div>
			</div>
			
			<div data-role="header" class="ui-b" data-theme="b">
				<h1>San Francisco SA</h1>
				<a href="#panel1" data-role="button" data-icon="bars" data-icompos="no-text" data-theme="b"></a>
				<a href="#" data-role="button" data-icon="back" data-rel="back" data-iconpos="notext"></a>
			</div>
			<div data-role="content" class="ui-fondo" data-theme="fondo">
			<div> <img class="imgfija" src="image/cole.png" /> </div>
			
				<div data-role="collapsible" class="boton1"> <h4> Recorridos</h4>

					<ul data-role="listview">
						<li> <a href="#linea1">Linea 1</a></li>
						<li> <a href="">Linea2</a></li>
						<li> <a href="#popup1" data-rel="popup" data-transition="popup">Linea 3</a></li>
						<li> <a href="">Linea 4</a></li>
					</ul>
				</div>
				<div data-role="popup" id="popup1" data-theme="b">
					<h1> Esta hdhsd </h1>
			</div>
			<div data-role="footer"  data-id="fijo" data-position="fixed">
				<div data-role="navbar">
					<ul>
						<li><a href="#" data-icon="carat-l"></a></li>
						<li><a href="#" data-icon="user"></a></li>
						<li><a href="#" data-icon="carat-r"></a></li>
					</ul>
				</div>
			</div>
		</div>
		
</div>

	<div data-role="page" id="linea1">
			<!- -----------Panel 1 izquierda--------->
			<div data-role="panel" data-display="overlay" data-position="left" id="panel1">
				<button data-icon="delete" style="width:10px;" data-icompos="no-text" data-rel="close" data-theme="b"></button>
				<div data-role="header" class="ui-b" data-theme="b"> <h1 >Menu</h1> </div>
				<div data-role="content">
					<ul data-role="listview"> 
						<li> <a href="#"> Inicio</a></li>
						<li> <a href="#"> ms</a></li>
						<li> <a href="#"> ms</a></li>
						<li> <a href="#"> sk</a></li>
					</ul>
				</div>
				<div data-role="footer" class="ui-f" data-theme="f">
					<br>

				</div>
			</div>
			
			<div data-role="header" class="ui-b" data-theme="b">
				<h1>Bienvenidos</h1>
				<a href="#panel1" data-role="button" data-icon="bars" data-icompos="no-text" data-theme="b"></a>
				<a href="#" data-role="button" data-icon="back" data-rel="back" data-iconpos="notext"></a>
			</div>
			<div data-role="content" class="ui-fondo" data-theme="fondo">
				<iframe src="https://www.google.com/maps/d/embed?mid=zqt9CJFySD1s.kEV-Ku_qjJ1M&hl=es" width="100%" height="480"></iframe>
			</div>
			<div data-role="footer"  data-id="fijo" data-position="fixed">
				<div data-role="navbar">
					<ul>
						<li><a href="#" data-icon="carat-l"></a></li>
						<li><a href="#" data-icon="user"></a></li>
						<li><a href="#" data-icon="carat-r"></a></li>
					</ul>
				</div>
			</div>
		</div>
		
</div>
		
		
	</body>

</html>