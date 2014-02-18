// Teachers
TBook.StoriesView = TBook.ColumnView.extend({
	templateName: 'stories/stories'
});

TBook.StoryView = TBook.View.extend({
	templateName: 'stories/story'
});

TBook.StoryStoryDetailsView = TBook.View.extend({
	templateName: 'stories/story_details'
});

TBook.StoriesNewView = TBook.FormView.extend({
	templateName: 'stories/new'
});

TBook.StoryLessonsView = TBook.View.extend({
	templateName: 'stories/story_lessons'
});

TBook.StoryLessonView = TBook.ColumnView.extend({
	templateName: 'stories/story_lesson'
});

TBook.StoryLessonsNewView = TBook.FormView.extend({
	templateName: 'stories/story_lessons_new'
});

TBook.StoryLessonStoryLessonDetailsView = TBook.View.extend({
	templateName: 'stories/story_lesson_details'
});

TBook.StoryLessonQuestionsView = TBook.View.extend({
	templateName: 'stories/story_lesson_questions'
});

TBook.StoryLessonQuestionView = TBook.View.extend({
	templateName: 'stories/story_lesson_question'
});

TBook.StoryLessonQuestionAnswersView = TBook.View.extend({
	templateName: 'stories/story_lesson_question_answers'
});
TBook.StoryLessonQuestionsNewView = TBook.FormView.extend({
	templateName: 'stories/story_lesson_questions_new'
});

TBook.StoryLessonQuestionAnswersNewView = TBook.FormView.extend({
	templateName: 'stories/story_lesson_question_answers_new'
});

//Assignments
TBook.AssignmentStoriesView = TBook.ColumnView.extend({
	templateName: 'stories/assignment_stories'
});

TBook.AssignmentStoryView = TBook.View.extend({
	templateName: 'stories/assignment_story'
});

TBook.StoryAssignmentsView = TBook.ColumnView.extend({
	templateName: 'stories/story_assignments'
});

TBook.StoryAssignmentView = TBook.ColumnView.extend({
	templateName: 'stories/story_assignment'
});

TBook.AssignmentClassroomsView = TBook.ColumnView.extend({
	templateName: 'stories/assignment_classrooms'
});

TBook.AssignmentClassroomView = TBook.View.extend({
	templateName: 'stories/assignment_classroom'
});

TBook.AssignmentClassroomStudentView = TBook.View.extend({
	templateName: 'stories/assignment_classroom_student'
});

// Students
TBook.StudentStoriesView = TBook.ColumnView.extend({
	templateName: 'stories/student_stories'
});

TBook.StudentStoryView = TBook.ColumnView.extend({
	templateName: 'stories/student_story'
});

TBook.StudentStoryStoryDetailsView = TBook.View.extend({
	templateName: 'stories/student_story_details'
});

TBook.PublicStoryView = TBook.View.extend({
	templateName: 'dashboard/stories/public_story'
});
