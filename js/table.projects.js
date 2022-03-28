(function($){
    $(document).ready(function() {
        var JSN;
        var table = $("#projects").DataTable(
        {
            "dom":"Blfrtip",
            "lengthMenu":[ [25,50,100,200,500,-1],[25,50, 100, 200,500, "All"] ],
            "serverSide":true,
            "processing":true,
            "searching": false,
            "ajax":{
                "url":"./lib/table.projects.php",
                "type":"POST",
                "pages": 5,
                "data": function ( d ) {
                    d.godina = $('#godina').val();
                    d.mesto = $('#mesto').val();
                    d.organ = $('#organ').val();
                    d.sektor = $('#sektor').val();
                    d.tip_konkursa = $('#tip_konkursa').val();
                    d.korisnik = $('#korisnik').val();
                    d.tip = $('#tip').val();
                    d.iznos = $('#iznos').val();
                }
            },                   
            "columns":
            [
                {
                    "data": "naziv_konkursa"
                },
                {
                    "data": "godina"
                },
                {
                    "data": "mesto"
                },
                {
                    "data": "organ"
                },
                {
                	"data": "sektor"
                },
                {
                	"data": "tip_konkursa"
                },
                {
                	"data": "naziv"
                },
                {
                	"data": "korisnik"
                },
                {
                	"data": "tip"
                },
                {
                    "data": "iznos",
                    "className": 'dt-body-right',
                    render: $.fn.dataTable.render.number(',', '.', 2, '')
                }
            ]        
        });
        //apply filter on table projects
        $('#godina,#organ,#mesto,#sektor,#tip_konkursa,#tip,#iznos,#korisnik ').on('change', function(){
        	table.ajax.reload();
        })
        //export to CSV
        $('body').on('click', '#exportCsv', function(){
            var godina = $('#godina').val();
            var mesto = $('#mesto').val();
            var organ = $('#organ').val();
            var sektor = $('#sektor').val();
            var tip_konkursa = $('#tip_konkursa').val();
            var korisnik = $('#korisnik').val();
            var tip = $('#tip').val();
            var iznos = $('#iznos').val();
            var loc = "./toCsv.php?"+
                "godina="+godina+
                "&mesto="+mesto+
                "&organ="+organ+
                "&sektor="+sektor+
                "&tip_konkursa="+tip_konkursa+
                "&korisnik="+korisnik+
                "&tip="+tip+
                "&iznos="+iznos;
            window.location.href = loc;
        })
        //get dropdown
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: 'ajax.php',
            data: {
                'action':'getDropDownLists'
            },
            success: function (response) {

            	$.each(response, function(key, value) {
            		var select = '#'+key;
            		$(select).html(value);
					var options = {searchable: true};
					//populate niceSelect
    				instance[key] = NiceSelect.bind(document.getElementById(key), options);
				});
				$('#selects').show();
				$('#filterMsg').hide();                                            
            },
            error: function (response) {
                console.log(response);
            }
        });
        var instance = [];
        //search
        $('body').on('click', '#resetBtn', function(){
        	var selects = ['godina','organ','mesto','sektor','tip_konkursa','tip','iznos','korisnik'];
        	$.each(selects, function(key, sel) {
        		$('#'+sel).val('');
				instance[sel].update()
			});
        	table.ajax.reload();
        });
        $('#selects').hide();
        $('#filterMsg').show();
    } );
}(jQuery));
