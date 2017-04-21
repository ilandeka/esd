/* 
 * @author Ivan Landeka edited from ICE project2-done800 - author: prof. Dan Bogaard
 * @project 2
 * @course Client Programming - ISTE 340.801
 * @desc Gets all the information you search for using the index.php. 
 */

function getTabs(orgId) {
	//we need to figure out how many 'tabs' or areas of information this type of org 
	//has
        $('#dump').show();
        $('#output').show();
        $('#tableOutput').hide();
        $('#results').hide();
        
	myXhr('get',{path:'/Application/Tabs?orgId='+orgId}).done(function(xml){
            
		if($(xml).find('error').length!=0){
			//output that server is down/sucks
		}else{			
			//var x='<select onchange="window[\'get\'+$(this).val()]('+orgId+')">';
			var x='<ul>';
                        var y='';
                        var z='<div id="close" class="ui-button ui-widget ui-corner-all">Close[x]</div>';
			$('Tab',xml).each(function(){
				//x+='<option value="'+$(this).text()+'">'+$(this).text()+'</option>';
                                x+='<li onclick="get'+ $(this).text() +'('+orgId+')"><a href="#'+$(this).text()+'">'+$(this).text()+'</a></li>';
                                y+="<div id="+ $(this).text() +"></div>";
                        });
                        $('#dump').html(x+'</ul>'+z+y);
                        getGeneral(orgId);
                        $("#dump").tabs();
                        
                        
                        $("#close").click(function(){
                            $('#dump').tabs("destroy"); 
                            $('#dump').hide();
                            $('#output').hide();
                            $("#results").show();
                            $("#tableOutput").show();
                        });

		}
                

	});
	
}

function getGeneral(id) {
	myXhr('get',{path:'/'+id+'/General'}).done(function(xml){
		if($(xml).find('error').length!=0){
			//do something....
		}else{
			//make a table...
			var x='<div id="General"><table><tr><td>Name:</td><td>'+$(xml).find('name').text()+'</td></tr>';
			x+='<tr><td>Description:</td><td>'+$(xml).find('description').text()+'</td></tr>';
			x+='<tr><td>email:</td><td>'+$(xml).find('email').text()+'</td></tr>';
			x+='<tr><td>website:</td><td>'+$(xml).find('website').text()+'</td></tr>';
			x+='<tr><td>number of members:</td><td>'+$(xml).find('nummembers').text()+'</td></tr>';
			x+='<tr><td>number of calls:</td><td>'+$(xml).find('numcalls').text()+'</td></tr></table>';
			$('#output').html(x+"</div>");
		}
	});
}

//You all need to finish each one (and remember to put a map in locations)
/*
 * Should get locations and put them in <select><option>...
 * Then when select changes siteId changes and the info changes
 */
function getLocations(id) {
    myXhr('get',{path:'/'+id+'/Locations'}).done(function(xml){
		if($(xml).find('error').length!=0){
			//do something....
		}else{
			var y='';
                        var x='<div id="Locations"><select id="location" onchange="window[\'get\'+$(this).val()]('+id+')">';
                        $('location',xml).each(function(){
                            x+='<option value="'+$(this).find('siteId').text()+'">Location:'+$(this).find('type').text()+'</option>';
                            y+='<table value="'+$(this).find('siteId').text()+'"><tr><td>Type:</td><td>'+$(this).find('type').text()+'</td></tr>';
                            y+='<tr><td>Address 1:</td><td>'+$(this).find('address1').text()+'</td></tr>';
                            y+='<tr><td>Address 2:</td><td>'+$(this).find('address2').text()+'</td></tr>';
                            y+='<tr><td>City:</td><td>'+$(this).find('city').text()+'</td></tr>';
                            y+='<tr><td>State:</td><td>'+$(this).find('state').text()+'</td></tr>';
                            y+='<tr><td>Country Name:</td><td>'+$(this).find('countyName').text()+'</td></tr>';
                            y+='<tr><td>Zip:</td><td>'+$(this).find('zip').text()+'</td></tr>';
                            y+='<tr><td>Phone:</td><td>'+$(this).find('phone').text()+'</td></tr>';
                            y+='<tr><td>TTY Phone:</td><td>'+$(this).find('ttyphone').text()+'</td></tr>';
                            y+='<tr><td>Fax:</td><td>'+$(this).find('fax').text()+'</td></tr>';
                            y+='<tr><td>Latitude:</td><td>'+$(this).find('latitude').text()+'</td></tr>';
                            y+='<tr><td>Longitutde:</td><td>'+$(this).find('longitude').text()+'</td></tr></table>';
                        });
                        $('#output').html(x + "</select>"+"</div>"+"<div id='output2'></div>");
                        $('#output2').html(y);
		}
	});
}
function getTraining(orgId) {
    myXhr('get',{path:'/'+orgId+'/Training'}).done(function(xml){
		if($(xml).find('error').length!=0){
			//do something....
		}else{
			//make a table...
			var x = "<div id='Training'><table id='trainTb'><thead><tr><th>Type</th><th>Abbreviation</th></tr></thead>";
                        
                        $('training',xml).each(function(){
                            x+='<tr><td>'+$(this).find('type').text()+'</td>';          
                            x+='<td>'+$(this).find('abbreviation').text()+'</td></tr>';
                        });
                        
                        $('#output').html(x+"</table>"+"</div>");
                        $('#trainTb').dataTable();
		}
	});
}
function getTreatment(orgId) {
        myXhr('get',{path:'/'+orgId+'/Treatments'}).done(function(xml){
		if($(xml).find('error').length!=0){
			//do something....
		}else{
                        var x = "<div id='Treatment'><table id='treatTb'><thead><tr><th>Type</th><th>Abbreviation</th></tr></thead>";
                        
                        $('treatment',xml).each(function(){
                            x+='<tr><td>'+$(this).find('type').text()+'</td>';
                            x+='<td>'+$(this).find('abbreviation').text()+'</td></tr>';
                        });
                        
			$('#output').html(x+"</table>"+"</div>");
                        $('#treatTb').dataTable();
		}
	});
}
function getFacilities(orgId) {
    myXhr('get',{path:'/'+orgId+'/Facilities'}).done(function(xml){
		if($(xml).find('error').length!=0){
			//do something....
		}else{
                    
                        var x = "<div id='Facilities'><table id='faciliTb'><thead><tr><th>Name</th><th>Quantity</th><th>Description</th></tr></thead>";
                        
                        $('facility',xml).each(function(){
                            x+='<tr><td>'+$(this).find('type').text()+'</td>';
                            x+='<td>'+$(this).find('quantity').text()+'</td>';
                            x+='<td>'+$(this).find('description').text()+'</td></tr>';
                        });
            
                        $('#output').html(x+"</table>"+"</div>");
                        $('#faciliTb').dataTable();
		}
    });
}
function getEquipment(orgId) {
        
    myXhr('get',{path:'/'+orgId+'/Equipment'}).done(function(xml){
		if($(xml).find('error').length!=0){
			//do something....
		}else{
                    
                        var x = "<div id='Equipment'><table id='equipTb'><thead><tr><th>Type</th><th>Quantity</th><th>Description</th></tr></thead>";
                        
                        $('equipment',xml).each(function(){
                            x+='<tr><td>'+$(this).find('type').text()+'</td>';
                            x+='<td>'+$(this).find('quantity').text()+'</td>';
                            x+='<td>'+$(this).find('description').text()+'</td></tr>';
                        });
            
                        $('#output').html(x+"</table>"+"</div>");
                        $('#equipTb').dataTable();
		}
	});
    
}
function getPhysicians(orgId) {
    
    myXhr('get',{path:'/'+orgId+'/Physicians'}).done(function(xml){
		if($(xml).find('error').length!=0){
			//do something....
		}else{
                    
                        var x = "<div id='Physicians'><table id='physicTb'><thead><tr><th>Name</th><th>License</th><th>Contact</th></tr></thead>";
                        
                        $('physician',xml).each(function(){
                            x+='<tr><td>'+$(this).find('fName').text()+" "+$(this).find('lName').text()+'</td>';
                            x+='<td>'+$(this).find('license').text()+'</td>';
                            x+='<td>'+$(this).find('phone').text()+'</td></tr>';
                        });
            
                        $('#output').html(x+"</table>"+"</div>");
                        $('#physicTb').dataTable();
		}
    });
}
/**
 *  Should return site address, and each site addresses peopleCount.
 *  Print out depending on how many people on address.
 */
function getPeople(orgId) {
    myXhr('get',{path:'/'+orgId+'/People'}).done(function(xml){
        	if($(xml).find('error').length!=0){
			//do something....
		}else{
                    
                        var x = "<div id='People'><table id='pplTb'><thead><tr><th>Address and Name</th><th>Role</th></tr></thead>";
                        
                        $('site',xml).each(function(){
                            x+='<tr><td>'+$(this).attr('address')+'</td></tr>';
                            $('person',this).each(function(){
                                x+='<tr><td>'+$(this).find('fName').text()+" "+$(this).find('lName').text()+'</td>';
                                x+='<td>'+$(this).find('role').text()+'</td></tr>';
                            });
                            //x+="</tr>";
                        });
            
                        $('#output').html(x+"</table>"+"</div>");
                        //$('#pplTb').dataTable();
		}
            
    });
}

//Onload
$(document).ready(function () {
    //Get States, Cities and Organization Types
    getStates();
    getCities("NY");//Get Cities for State "NY"
    getOrgTypes();
    
    //Hide to show when needed
    $("#dialog").hide();
    $("#results").hide();
    $("#spinner").hide();
    
    //Add tooltips
    $(this).tooltip();
    
    //Add this class to all inputs
    $('input').addClass("ui-widget ui-widget-content ui-corner-all");
});
    
function getCities(whichState) {
    //make ajax call to get the cities from the given State
    if(whichState == ''){
	}else{
		myXhr('get',{path: "/Cities?state="+whichState}).done(function(xml){
                    
			var x = "City/Town  <select id='cityTown' title='Cities will display depending on the state you have chosen' name='town' value=''>";
                        
			if($(xml).find('error').length != 0){
				//do something?
			}else if($(xml).find('row').length==0 && whichState != ''){
                            $('#orgCitySearch').html('City/Town  <select id="cityTown" type="text" value=""/>');   
                            $('#cityTown').attr("disabled","true");
                        }else if($("#state option:selected").val() == ""){
                            $('#cityTown').attr("disabled","true");
                            //$('#cityTown').attr("value","");
                        }else{
				x+='<option value="">All Cities</option>';
				$('row',xml).each(
					function(){
						x+='<option value="'+$(this).find('city').text()+'">'+$(this).find('city').text()+'</option>';
					}
				);
				
                            $('#orgCitySearch').html(x+"</select>");
                            $("#cityTown").selectmenu().selectmenu("menuWidget").addClass("overflow");
			}
		});
	}
}

/*
 * Get States and print them out in the select!
 */
function getStates(){
     	myXhr('get',{path:'/States'}).done(function(xml){
                var x='';
		if($(xml).find('error').length!=0){
			//output that server is down/sucks
		}else{
			x+='<option value="">All States<\/option>';
			$('row',xml).each(function(){
                              
				x+='<option id="'+$(this).find('State').text()+'" value="'+$(this).find('State').text()+'">'+$(this).find('State').text()+'</option>';
			});
                        
			$('#state').html(x);
                        $("#NY").attr("selected","selected");
                        $("#state").selectmenu().selectmenu("menuWidget").addClass("overflow");
		}
	});
}

/*
 * Get the orgTypes (Ambulance, Hospital, etc) - how would these change?  How often?
 */
function getOrgTypes() {
    	myXhr('get',{path:'/OrgTypes'}).done(function(xml){
                var x='';
		if($(xml).find('error').length!=0){
			//output that server is down/sucks
		}else{
			x+='<option value="">All Types</option>';
			$('row',xml).each(function(){
				x+='<option value="'+$(this).find('type').text()+'">'+$(this).find('type').text()+'</option>';
			});
			$('#orgType').html(x);
                        $("#orgType").selectmenu().selectmenu("menuWidget").addClass("overflow");
		}
	});
}

/*
 * TODO:
 * 1. Do a search 
 * 2. When an org is clicked it will create the select and getGeneral().
 */
function checkSearch() {
	//take a look at everything in the form[1] and go get the data
	//return of the data, build a big table....
	myXhr('get',{path:'/Organizations?type='+escape($("#orgType").val()) + "&name=" + escape($("#orgName").val()) + "&state=" + escape($("#state option:selected").val()) + "&town=" + escape($("#cityTown option:selected").val()) + "&zip=" + escape($("#zip").val()) + "&county=" + escape($("#county").val())},$("#spinner")).done(function(xml){
                //.serialize() ?? - doesn't make url like name=blabla&type=blabla&state=blabla.
                $("#tableOutput").show();
                //do I have data...?
		if($("#orgType").val() == "Physician"){
                    
                    var x = "<table id='tables'><thead><tr><th>First Name</th><th>Last Name</th><th>Organization</th><th>Type</th><th>City</th><th>Zip</th><th>County</th><th>Phone</th></tr></thead>";
                
                    $('row',xml).each(function(){
			x+='<tr><td>'+$(this).find('fName').text()+'</td>';
                        x+='<td>'+$(this).find('lName').text()+'</td>';
			x+='<td><span style="color:blue;cursor:pointer;" onclick="getTabs('+$(this).find('OrganizationID').text()+')">'+$(this).find('Name').text()+'</span></td>';
                        x+='<td>'+$(this).find('type').text()+'</td>';
			x+='<td>'+$(this).find('city').text()+'</td>';
                        //x+='<td>'+$(this).find('state').text()+'</td>';
			x+='<td>'+$(this).find('zip').text()+'</td>';
			x+='<td>'+$(this).find('CountyName').text()+'</td>';
			x+='<td>'+$(this).find('phone').text()+'</td></tr>';
			 
                    });
                        $('#tableOutput').html(x+"</table>");
                        $("#tables").dataTable();
                }else{
                    var x = "<table id='tables'><thead><tr><th>Type</th><th>Name</th><th>Email</th><th>City</th><th>Zip</th><th>County</th><th>State</th></tr></thead>";
                
                    $('row',xml).each(function(){
			x+='<tr><td>'+$(this).find('type').text()+'</td>';
			x+='<td><span style="color:blue;cursor:pointer;" onclick="getTabs('+$(this).find('OrganizationID').text()+')">'+$(this).find('Name').text()+'</span></td>';
                        x+='<td>'+$(this).find('Email').text()+'</td>';
			x+='<td>'+$(this).find('city').text()+'</td>';
			x+='<td>'+$(this).find('zip').text()+'</td>';
			x+='<td>'+$(this).find('CountyName').text()+'</td>';
			x+='<td>'+$(this).find('State').text()+'</td></tr>';
                    });
                    
                    $('#tableOutput').html(x+"</table>");
                    $("#tables").dataTable();
                }             
        });
}

/*
 * 
 * @ Reset - the fields to the beginning
 */
function reload(){
    getStates();
    getCities("NY");//Get Cities for State "NY"
    getOrgTypes();
}

///////////////////////////////////////////////////
//utilities...
//(getOrPost, data, idForSpinner)
//d is data sent, looks like {name:value,name2:val2}
function myXhr(GetPost,d,id){
	return $.ajax({
		type: GetPost,
		async: true,
		cache:false,
		url: "proxy.php",
		data: d,  
		dataType: "xml",
		beforeSend:function(){
			if(id){
                                //Blacks out the whole page
				$(id).append('<div class="spin"></div>');
                                
                                //Shows the Loading...
                                $("#spinner").show();
                                
                                //Shows the Results
                                $("#results").show();
			}
		}
	}).always(function(){
		//kill spinner
		if(id){
                        //Hides the Loading...
                        $("#spinner").hide();
                        
                        //FadesOut the black out screen after 3 sec
			$(id).find('.spin').fadeOut(3000,function(){
				$(this).remove();
			});
		}
	}).fail(function(){
            //When failure show dialog box
            $("#dialog").dialog({
                title: "Error"
            });
	});
}
///////////////////////////////////////////////////////////
