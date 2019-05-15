# hrext09-my-cruddy-app - Workout Tracking
Create Read Update and Delete framework using JS

 ## General Concept

 Allow users to plan and track workouts across a variety of sports. Many fitness tracking apps only track data for COMPLETED workouts, and have minimal functionality for planning future workouts. Other apps that allow for this functionality have a cumbersome interface, require continuing payment, or are really only after your data. There is an unmet need for a no-cost, no frills application to manage the schedule of a complex training regimen.

 ## Tasks
 - [ ] Users will be able to enter plans for future workouts
 - [ ] Users will be able to update plans for future workouts
 - [ ] Users will be able to enter details of completed workouts
 - [ ] Users will be able to display upcoming planned workouts
 - [ ] Users will be able to view a timeline of completed workouts
 - [ ] Users may delete a planned workout
 - [ ] Users may delete a completed workout

 ## Advanced Tasks
 - [ ] Users should be able to select a planned workout, modify information (if needed), and mark the workout as completed
 	- [ ] This should populate the selected workout into the completed workout object 	
 	- [ ] This should also remove the planned workout from the planned object, as it is already complete
 - [ ] Users should be able to review planned and/or completed workouts over a given time period ex: MM/DD/YYYY - MM/DD/YYYY
 
 ## Very Advanced Tasks
 - [ ] It would be beneficial to pull completed workout data from fitness tracking devices (ex Garmin watch);
 	- [ ] Parse workouts pulled in from devices, and remove relevent planned workouts if they match

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

 ## MVP 1
 	Allow user to enter plans for a future workout
 	Allow user to display planned workouts