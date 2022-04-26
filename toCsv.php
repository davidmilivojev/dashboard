<?php
	$endPoint = "https://birn-baza.herokuapp.com/projekti/?limit=1000";

	//apply filters to endPoint
	$columns = array('godina','organ','mesto','sektor','maticni','tip','korisnik','zastupnik');
	foreach($columns as $col)
	{
	    if(isset($_GET[$col]) && !empty($_GET[$col])){
	        $endPoint .= '&'.$col.'='.str_replace(' ', '%20', $_GET[$col]);
	    }
	}
	//prepare filter IZNOS
	if(isset($_GET['iznos']) && !empty($_GET['iznos']))
	{
	    $token = explode('-',$_GET['iznos']);
	    //first
	    if($token[0] == 0) {
	        $endPoint .= '&min_iznos=0&max_iznos='.$token[1];
	    } elseif($token[1] == '#') {
	        $endPoint .= '&min_iznos='.$token[0];
	    } else {
	        $endPoint .= '&min_iznos='.$token[0].'&max_iznos='.$token[1];
	    }
	}
	
	function getData($endPoint, &$DD = array())
	{
		//echo"endPoint: $endPoint <br>";
		$data = file_get_contents($endPoint);

		if(!$data){
	    	//echo "There is no connection with API";
	    	echo "Nema konekcije sa API";
		} else {
		    $dataDecoded = json_decode($data, true);
		    //$res = $dataDecoded['results'];

		    $DD[] = $dataDecoded['results'];
		    //echo "next: ". $dataDecoded['next'] ."<br>";
		    if(!empty($dataDecoded['next']) ) {
		    	//echo"<pre>",print_r($DD),"</pre>";
		    	getData($dataDecoded['next'],$DD);
		    }
		}
		return $DD;
	}
	$DATA = getData($endPoint);
	//flatten array 
	$obj = array();
	$excludeColumns = array('id','tip','konkurs','korisnik_new');
	foreach($DATA as $k => $D)
	{
		foreach($D as $O){
			foreach($excludeColumns as $ec)
			{
				if( isset($O[$ec]) ) unset($O[$ec]);
			}
			//zastupnik is array. We need to flatten it
			$zastupnik = array();
			if( isset($O['zastupnik']) ){
				foreach($O['zastupnik'] as $Z){
					$zastupnik[] = $Z['ime'];
				}
			}
			$O['zastupnik'] = implode(', ',$zastupnik);
			$obj[] = $O;
		}
	}

    $filename = "projekti_" . date('Y-m-d') . ".xls";
    //create a file pointer
    function array2csv(array &$array)
	{
		if (count($array) == 0) {
		 	return null;
		}
		ob_start();
		$df = fopen("php://output", 'w');
		fputcsv($df, array_keys(reset($array)));
		foreach ($array as $row) {
		  	fputcsv($df, $row);
		}
		fclose($df);
		return ob_get_clean();
	}
	function filterData(&$str){ 
	    $str = preg_replace("/\t/", "\\t", $str); 
	    $str = preg_replace("/\r?\n/", "\\n", $str); 
	    if(strstr($str, '"')) $str = '"' . str_replace('"', '""', $str) . '"'; 
	}
	function array2xls($data){
		foreach($data as $k => $row) { 
		    if($k == 0) { 
		        // display column names as first row 
		        echo implode("\t", array_keys($row)) . "\n"; 
		        $flag = true; 
		    } 
		    // filter data 
		    array_walk($row, 'filterData'); 
		    echo implode("\t", array_values($row)) . "\n"; 
		} 
	}
	function download_send_headers($filename) {
	    // disable caching
	    $now = gmdate("D, d M Y H:i:s");
	    header("Expires: Tue, 03 Jul 2001 06:00:00 GMT");
	    header("Cache-Control: max-age=0, no-cache, must-revalidate, proxy-revalidate");
	    header("Last-Modified: {$now} GMT");
	    header('Content-Encoding: UTF-8'); // will, change to UTF-8!
	    // force download  
	    header("Content-Type: application/force-download");
	    header("Content-Type: application/octet-stream");
	    header("Content-Type: application/download");
	    header("Content-Type: application/vnd.ms-excel;charset=utf-8");
	    // disposition / encoding on response body
	    //header("Content-Disposition: attachment;filename={$filename}");
	    header("Content-Transfer-Encoding: binary");
	    header("Content-Disposition: attachment; filename=$filename");
	}
	download_send_headers($filename);
	echo array2xls($obj);
	die();
	//echo"<pre>OBJ: ",print_r($obj),"</pre>";
 ?>                  