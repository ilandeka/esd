<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Emergency Services Directory</title>
        
        <!-- CSS -->
        <link rel="stylesheet" href="//cdn.datatables.net/1.10.13/css/jquery.dataTables.min.css"/>
        <link rel="stylesheet" href="css/style.css"/>
        <link rel="stylesheet" href="plugins/jquery-ui/jquery-ui.css"/>
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
        <link rel="icon" type="image/png" href="img/cross.gif">
        
        <!-- JavaScript -->
        <script type="text/javascript" src="plugins/jquery-3.2.0.js"></script>
        <script src="//cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js" type="text/javascript"></script>
        <script src="plugins/jquery-ui/jquery-ui.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="bg"></div>
        
        <h1>ESD</h1>
        <form>
            <div id="dump"></div>
            <div id="output"></div>
        </form>
        <hr>
        <form id="searchForm">
            <fieldset>
                <legend>Search Criteria</legend>
                <p>Organization Type <select id="orgType" ></select></p>
                <p>
                    <span id="orgLabel">Organization Name</span> 
                    <input id="orgName" type="text" name="orgName"> 
                    <em style="color: rgb(104, 129, 162);">*can be partial - "vol" for "Volunteer"</em></p>
                <p>State 
                    <select id="state" title="Choose a state (ex: NY or All States...)" name="state" onchange="getCities(this.value)"></select> 
                    <span id="orgCitySearch"></span>
                </p>
                <p>County <input id="county" title="Type in county (ex: Monroe, Orleans...)" type="text" value=""></p>
                <p>ZIP Code <input id="zip" title="Type in 5-digit number (ex: 12345)" type="text"></p>
                <div style="margin:0 0 0 210px">
                    <input class="ui-button ui-widget ui-corner-all" value="Show Results" onclick="checkSearch()" id="btnSearch" class="button" type="button"> 
                    <input class="ui-button ui-widget ui-corner-all" title="Reset all fields to default" type="reset" class="button" value="Reset Form" onclick="reload()">
                </div>
            </fieldset>
        </form>
        
        <!-- Show when Search is clicked -->
        <div id="results">Results:</div>
        
        <!-- The search is output here in this table -->
        <div id="tableOutput"></div>
        
        <!-- Show when Search is clicked -->
        <div id="spinner">Loading...</div>
        
        <!-- This is displayed when we cannot connect to the server -->
        <div id="dialog"><p>Sorry, Server is down or check internet connection!</p></div>
        
        <h2>Ivan Landeka (C) 2017</h2>
        
        <!-- Main Script -->
        <script src="js/esd-get-data.js" type="text/javascript"></script>
    </body>
</html>
