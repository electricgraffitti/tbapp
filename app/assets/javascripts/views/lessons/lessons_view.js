TBook.LessonsView = TBook.ColumnView.extend({
	templateName: 'lessons/lessons'
});

TBook.LessonView = TBook.View.extend({
	templateName: 'lessons/lesson'
});

TBook.LessonLessonDetailsView = TBook.View.extend({
	templateName: 'lessons/lesson_details'
});

TBook.LessonQuestionsView = TBook.View.extend({
	templateName: 'lessons/lesson_questions'
});

TBook.LessonQuestionView = TBook.View.extend({
	templateName: 'lessons/lesson_question'
});

TBook.LessonQuestionAnswersView = TBook.View.extend({
	templateName: 'lessons/lesson_question_answers'
});

TBook.LessonsNewView = TBook.FormView.extend({
	templateName: 'lessons/new'
});

TBook.LessonQuestionsNewView = TBook.FormView.extend({
	templateName: 'lessons/lesson_questions_new'
});

TBook.LessonQuestionAnswersNewView = TBook.FormView.extend({
	templateName: 'lessons/lesson_question_answers_new'
});