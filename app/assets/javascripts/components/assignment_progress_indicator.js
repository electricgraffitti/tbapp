TBook.AssignmentProgressIndicatorComponent = Ember.Component.extend({

	tagName: 'span',
	classNames: ['icon', 'assignment_progress_icon'],
	classNameBindings: ['notAssigned:hidden', 'isComplete:complete', 'isReviewed:reviewed'],

	student: Ember.computed.alias('assignmentStudent'),
	lesson: Ember.computed.alias('assignment'),
	notAssigned: Ember.computed.not('hasCurrentAssignment'),
	hasCurrentAssignment: Ember.computed.notEmpty('currentAssignment'),

	isComplete: Ember.computed.alias('currentAssignment.isComplete'),
	isReviewed: Ember.computed.alias('currentAssignment.isReviewed'),
	isOverdue: false,

	currentAssignment: function () {
		return this.get('studentAssignments').filterBy('lesson_id', this.get('lesson.id')).objectAt(0);
	}.property('lesson', 'studentAssignments', 'studentAssignments.length')

});

