# jquery.checkboxifyTable
A jQuery UI compatible plugin that adds a checkbox to each row of a table (and creates optionally buttons to POST data to the server).

The first `<td>` of each row in the `<table>` should contain the `id` for the item in the row.

##Motivation
You have an interactive website with lots of tables listing details of items in the database (Orders, Payments and so on). 

Now your client wants to be able to be able to select *multiple* rows and perform actions on them. This plugin allows you to quickly add the necessary checkboxes and buttons like 'Delete All'.

##Installation
Only manual installation is available at present. You need add the checkboxify script to your page after including the jquery and jquery-ui scripts. If you will be using the buttons feature you must also include jquery.redirect (after the basic jquery script).

    <script src="jquery-XXX.js"></script>
    <script src="jquery-ui-XXX.js"></script>
    <script src="jquery.redirect.js"></script>
    <script src="jquery.checkboxify.js"></script>
    

##Usage
###Simple Case
  
    // set up the checkboxes when the page loads
    $(function() {
      $('#theTable').checkboxify();
    });
    
    ...
    
    function myFunction() {
      // get the array of ids for rows where checkbox is checked
      var array_of_ids = $('#theTable').checkboxify('getSelected');
      ...
    }
    

###Adding Buttons
  
    $(function() {
      $('#theTable').checkboxify({
        buttons: [
          {
            label: 'Make Red',
            action: 'change_colour',
            params: {colour: 'red'}
          },
          {
            label: 'Make Blue',
            action: 'change_colour',
            params: {colour: 'blue'}
          },
        ]
      });
    });
    
This will additionally add 2 buttons at the end of the table: 'Make Red' and 'Make Blue'.

Clicking a button will redirect the browser to the page `change_colour` plus POST the desired colour, and an array of checked ids  items for your server to process as you wish.
