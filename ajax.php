<?php 
    if(isset($_POST['action']) )
    {
    	switch ($_POST['action']) 
        {
    		case 'getDropDownLists':
                $columns = array('godina', 'organ', 'mesto', 'korisnik', 'sektor', 'tip_konkursa', 'tip');
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
                        $data[$column][] = '<option value="" selected>'.strtoupper($colTitle).'</option>';
                        foreach($obj as $o)
                        {
                            //$val = in_array($column, $other)? $o[$column] : $o;
                            $data[$column][] = '<option value="'.$o.'">'.$o.'</option>';
                        }
                    }
                }
                /*//another end points
                
                foreach($other as $ep => $col)
                {
                    $endPoint = "https://birn-baza.herokuapp.com/$ep/";
                    $json = file_get_contents($endPoint);
                    if(!$json){
                        echo "There is no connection with API: $endPoint";
                    } else {
                        $obj = json_decode($json, true);
                        $colTitle = str_replace('_', ' ', $col);
                        $data[$col][] = '<option value="" selected>'.strtoupper($colTitle).'</option>';
                        foreach($obj as $o)
                        {
                            $data[$col][] = '<option value="'.$o[$col].'">'.$o[$col].'</option>';
                        }
                    }
                }*/
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
    	}
    }
?>