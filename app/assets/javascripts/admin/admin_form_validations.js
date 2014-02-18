$('#district').isHappy({
    fields: {
      // reference the field you're talking about, probably by `id`
      // but you could certainly do $('[name=name]') as well.
      '#district_district_name': {
        required: true,
        message: 'District name required.'
      },
      '#district_domain': {
        required: true,
        message: 'Domain required.'
      },      
      '#district_state_id': {
        required: true,
        message: 'State required.'
      }
    }
  });

$('#practice').isHappy({
    fields: {
      // reference the field you're talking about, probably by `id`
      // but you could certainly do $('[name=name]') as well.
      '#practice_practice_name': {
        required: true,
        message: 'Practice name required.'
      },
      '#practice_practice_domain': {
        required: true,
        message: 'Practice Domain required.'
      },      
      '#practice_practice_code': {
        required: true,
        message: 'Practice Code required.'
      },
      '#practice_practice_description': {
        required: true,
        message: 'Practice Description required.'
      }      
    }
  });

$("#teacher").isHappy({
  fields: {
    '#teacher_first_name': {
      required: true,
      message: 'Required.'
    },
    '#teacher_last_name': {
      required: true,
      message: 'Required.'
    },
    '#teacher_email': {
      required: true,
      message: 'Required.',
      test: happy.email
    }, 
    '#teacher_district_id': {
      required: true,
      message: 'Required.'
    }
  }
});

$("#student").isHappy({
  fields: {
    '#student_first_name': {
      required: true,
      message: 'Required.'
    },
    '#student_last_name': {
      required: true,
      message: 'Required.'
    }     
  }
});