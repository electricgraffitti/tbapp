var Admin = {

		setDatatables: function() {
    var districtsTable = $("#districts_table"),
        practicesTable = $("#practices_table"),
    		teachersTable = $("#teachers_table"),
    		studentsTable = $("#students_table"),
        schoolsTable = $("#schools_table"),
        standardsTable = $("#standards_table");

    districtsTable.dataTable({
      "bJQueryUI": true,
      "bDeferRender": true,
      "sPaginationType": "full_numbers"
    });

    practicesTable.dataTable({
      "bJQueryUI": true,
      "bDeferRender": true,
      "sPaginationType": "full_numbers"
    });    
    
    schoolsTable.dataTable({
      "bJQueryUI": true,
      "bDeferRender": true,
      "sPaginationType": "full_numbers"
    });    

    teachersTable.dataTable({
      "bJQueryUI": true,
      "bDeferRender": true,
      "sPaginationType": "full_numbers"
    });
    
    studentsTable.dataTable({
      "bJQueryUI": true,
      "bDeferRender": true,
      "sPaginationType": "full_numbers"
    });

    standardsTable.dataTable({
      "bJQueryUI": true,
      "bDeferRender": true,
      "sPaginationType": "full_numbers"
    });
        
  }

};

$(function() {
	Flash.injectFlashBox();
  Flash.setFlash();
  DashboardLayout.init();
  ToolTips.initToolTips();
  Admin.setDatatables();
  FormElements.initDeleteLinks();
  FormElements.customSelects();
  FormElements.disableSubmitButton();
});