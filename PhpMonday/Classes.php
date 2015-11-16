<?php

class driver {

	private $wheels;

	protected $idDriver = '';

	function __construct()
	{
		$this->idDriver = rand() ;
		$wheels = [new Wheel(),new Wheel(),new Wheel(),new Wheel()]
	}


	function printObject()
	{

		echo $this->idDriver;
		echo "\n";



	}
	
	function accelerate()
	{

		echo $this->idDriver;
		echo "\n";



	}
	

}


class Wheel {

	protected $idWheel = '';

	function __construct()
	{
		$this->idWheel = rand() ;
	}


	function printObject()
	{

		echo $this->idWheel;
		echo "\n";


	}
	

}



$WheelObject = new Wheel ();

$WheelObject->printObject();


?>