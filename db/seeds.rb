# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# Environment variables (ENV['...']) can be set in the file config/application.yml.
# See http://railsapps.github.io/rails-environment-variables.html
puts 'ROLES'
YAML.load(ENV['ROLES']).each do |role|
  Role.find_or_create_by_name(role)
  puts 'role: ' << role
end
puts 'DEFAULT USERS'
user = User.find_or_create_by_email :name => ENV['ADMIN_NAME'].dup, :email => ENV['ADMIN_EMAIL'].dup, :password => ENV['ADMIN_PASSWORD'].dup, :password_confirmation => ENV['ADMIN_PASSWORD'].dup
puts 'user: ' << user.name
user.add_role :admin

State.delete_all
State.connection.execute('ALTER TABLE states AUTO_INCREMENT = 0')
State.create abbreviation: "AL", full_name: "Alabama"
State.create abbreviation: "AK", full_name: "Alaska"
State.create abbreviation: "AZ", full_name: "Arizona"
State.create abbreviation: "AR", full_name: "Arkansas"
State.create abbreviation: "CA", full_name: "California"
State.create abbreviation: "CO", full_name: "Colorado"
State.create abbreviation: "CT", full_name: "Connecticut"
State.create abbreviation: "DE", full_name: "Delaware"
State.create abbreviation: "DC", full_name: "District of Columbia"
State.create abbreviation: "FL", full_name: "Florida"
State.create abbreviation: "GA", full_name: "Georgia"
State.create abbreviation: "HI", full_name: "Hawaii"
State.create abbreviation: "ID", full_name: "Idaho"
State.create abbreviation: "IL", full_name: "Illinois"
State.create abbreviation: "IN", full_name: "Indiana"
State.create abbreviation: "IA", full_name: "Iowa"
State.create abbreviation: "KS", full_name: "Kansas"
State.create abbreviation: "KY", full_name: "Kentucky"
State.create abbreviation: "LA", full_name: "Louisiana"
State.create abbreviation: "ME", full_name: "Maine"
State.create abbreviation: "MD", full_name: "Maryland"
State.create abbreviation: "MA", full_name: "Massachusetts"
State.create abbreviation: "MI", full_name: "Michigan"
State.create abbreviation: "MN", full_name: "Minnesota"
State.create abbreviation: "MS", full_name: "Mississippi"
State.create abbreviation: "MO", full_name: "Missouri"
State.create abbreviation: "MT", full_name: "Montana"
State.create abbreviation: "NE", full_name: "Nebraska"
State.create abbreviation: "NV", full_name: "Nevada"
State.create abbreviation: "NH", full_name: "New Hampshire"
State.create abbreviation: "NJ", full_name: "New Jersey"
State.create abbreviation: "NM", full_name: "New Mexico"
State.create abbreviation: "NY", full_name: "New York"
State.create abbreviation: "NC", full_name: "North Carolina"
State.create abbreviation: "ND", full_name: "North Dakota"
State.create abbreviation: "OH", full_name: "Ohio"
State.create abbreviation: "OK", full_name: "Oklahoma"
State.create abbreviation: "OR", full_name: "Oregon"
State.create abbreviation: "PA", full_name: "Pennsylvania"
State.create abbreviation: "RI", full_name: "Rhode Island"
State.create abbreviation: "SC", full_name: "South Carolina"
State.create abbreviation: "SD", full_name: "South Dakota"
State.create abbreviation: "TN", full_name: "Tennessee"
State.create abbreviation: "TX", full_name: "Texas"
State.create abbreviation: "UT", full_name: "Utah"
State.create abbreviation: "VT", full_name: "Vermont"
State.create abbreviation: "VA", full_name: "Virginia"
State.create abbreviation: "WA", full_name: "Washington"
State.create abbreviation: "WV", full_name: "West Virginia"
State.create abbreviation: "WI", full_name: "Wisconsin"
State.create abbreviation: "WY", full_name: "Wyoming"