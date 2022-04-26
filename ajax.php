<?php 
    if(isset($_POST['action']) )
    {
    	switch ($_POST['action']) 
        {
    		case 'getDropDownLists':
                $columns = array('godina', 'organ', 'mesto', /*'korisnik', */'sektor', /*'maticni',*/ 'tip');
                //$other = array('tip', 'tip_konkursa', 'sektor');
                $data = array();
                foreach($columns as $column)
                {
                    $endPoint = "https://birn-baza.herokuapp.com/$column/?sort_column=$column";
                    $json = file_get_contents($endPoint);
                    if(!$json){
                        echo "There is no connection with API: $endPoint";
                    } else {
                        $jsonDecoded = json_decode(file_get_contents($endPoint), true);
                        $flatten = new RecursiveIteratorIterator(new RecursiveArrayIterator($jsonDecoded));
                        $obj = iterator_to_array($flatten, false);
                        sort($obj);
                        $colTitle = str_replace('_', ' ', $column);
                        //$data[$column][] = '<option value="" selected>'.strtoupper($colTitle).'</option>';
                        foreach($obj as $o)
                        {
                            //$val = in_array($column, $other)? $o[$column] : $o;
                            $data[$column][] = '<option value="'.$o.'">'.$o.'</option>';
                        }
                    }
                }
                //add iznos
                $data['iznos'] = array(
                    '<option value="" selected>IZNOS</option>',
                    '<option value="0-100000">Do 100.000</option>',
                    '<option value="100000-500000">100.000 - 500.000</option>',
                    '<option value="500000-1000000">500.000 - 1.000.000</option>',
                    '<option value="1000000-5000000">1.000.000 - 5.000.000</option>',
                    '<option value="5000000-#">Preko 5.000.000</option>'
                );
                echo json_encode($data);
    		break;
            case 'autocomplete':
                $search = isset($_POST['search']) ? '?search='.$_POST['search'] : '';
                $column = isset($_POST['column']) ? $_POST['column'] : '';
                $endPoint = "https://birn-baza.herokuapp.com/".$column."/".$search;
                $json = file_get_contents($endPoint);
                if(!$json){
                    echo "There is no connection with API: $endPoint";
                } else {
                    $obj = json_decode(file_get_contents($endPoint), true);
                    sort($obj);
                    echo json_encode($obj);
                }            
            break;
            case 'additionalData':
                $mb = isset($_POST['mb']) ? $_POST['mb'] : '';
                $endPoint = "https://birn-baza.herokuapp.com/apr/?maticni=".$mb;
                $json = file_get_contents($endPoint);
                if(!$json){
                    echo "There is no connection with API: $endPoint";
                } else {
                    $obj = json_decode(file_get_contents($endPoint), true);
                    if( isset($obj[0]) ){
                        $additional = array();
                        foreach($obj[0] as $k => $v)
                        {
                            $additional[] = '<li><strong>'.$k.': </strong>'.$v.'</li>';
                        }
                        echo implode('',$additional);
                    } else {
                        echo "<li>Podaci nisu dostupni</li>";
                    }
                    
                }
            break;
    	}
    }
?>