TBook.ClassroomsView = TBook.ColumnView.extend({
	templateName: 'classrooms/classrooms'
});

TBook.ClassroomView = TBook.View.extend({
	templateName: 'classrooms/classroom'
});

TBook.ClassroomStudentsView = TBook.View.extend({
	templateName: 'classrooms/classroom_students'
});

TBook.ClassroomStudentView = TBook.View.extend({
	templateName: 'classrooms/classroom_student'
});

TBook.ClassroomAssignmentsView = TBook.View.extend({
	templateName: 'classrooms/classroom_assignments'
});

TBook.ClassroomAssignmentView = TBook.View.extend({
	templateName: 'classrooms/classroom_assignment'
});

TBook.ClassroomsNewView = TBook.FormView.extend({
	templateName: 'classrooms/new'
});

TBook.ClassroomNewStudentView = TBook.FormView.extend({
	templateName: 'classrooms/new_student'
});

TBook.ClassroomNewAssignmentView = TBook.FormView.extend({
	templateName: 'classrooms/new_assignment'
});
