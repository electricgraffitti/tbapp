TBook.StudentsView = TBook.ColumnView.extend({
	templateName: 'students/students'
});

TBook.StudentView = TBook.View.extend({
	templateName: 'students/student'
});

TBook.StudentsNewView = TBook.FormView.extend({
	templateName: 'students/new'
});