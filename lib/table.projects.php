<?php
$start = isset($_POST['start']) ? $_POST['start'] : 25;
$length = isset($_POST['length']) ? $_POST['length'] : 25;
$draw = isset($_POST['draw']) ? $_POST['draw'] : 1;
$orderCol = isset($_POST['order'][0]['column'])? $_POST['order'][0]['column'] : 0;
$sort = isset($_POST['order'][0]['dir'])? $_POST['order'][0]['dir'] : 0;
$endPoint = "https://birn-baza.herokuapp.com/projekti/?limit=$length&offset=$start";

//apply filters
$columnsFilter = array('godina','organ','mesto','sektor','maticni','tip','korisnik','zastupnik');
foreach($columnsFilter as $col)
{
    if(isset($_POST[$col]) && !empty($_POST[$col])){
        $string = str_replace(' ', '+', $_POST[$col]);
        //do not implode for columns whicha are not multiple
        $colVal = ($col !='maticni' && $col !='korisnik' && $col != 'zastupnik') ? implode(',',$string) : $string;
        $endPoint .= '&'.$col.'='.$colVal;
    }
}
//prepare filter IZNOS
if(isset($_POST['iznos']) && !empty($_POST['iznos']))
{
    $token = explode('-',$_POST['iznos']);
    //first
    if($token[0] == 0) {
        $endPoint .= '&min_iznos=0&max_iznos='.$token[1];
    } elseif($token[1] == '#') {
        $endPoint .= '&min_iznos='.$token[0];
    } else {
        $endPoint .= '&min_iznos='.$token[0].'&max_iznos='.$token[1];
    }
}
$columnsTable = array('naziv_konkursa','godina','mesto','organ','sektor','naziv','korisnik','zastupnik','tip','maticni','iznos');
$sortDir = ($sort == 'asc') ? 'sort_column' : 'sort_column_reverse';
$endPoint .= '&'.$sortDir.'='.$columnsTable[$orderCol];

$json = file_get_contents($endPoint);
if(!$json){
    //echo "There is no connection with API";
    $data['data'] = array();
    $data['total'] = 0;
} else {
    $obj = json_decode($json, true);

    if(isset($obj['results']))
    {    
        $data['data'] = $obj['results'];
        $data['total'] = isset($obj['count'])? $obj['count'] : count($obj['results']);
    }
    else
    {
        $data['data'] = array();
        $data['total'] = 0;
    }
}

#prepare data for output;

$DATA = array(
    'draw' => $draw,
    'data' => $data['data'],
    'recordsTotal' => $data['total'],
    'recordsFiltered' => $data['total'],
    'endPoint' => $endPoint
);
echo json_encode($DATA);
