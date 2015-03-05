[Rescue Me](https://bcd-rescue-me.firebaseapp.com/#/) Web App
=========
https://bcd-rescue-me.firebaseapp.com

##Synopsis

Front-end individual capstone project for [NSS](www.nashvillesoftwareschool.com) Cohort 7.

An Angular web application that utilizes the RescueGroups API to connect dog rescue organizations with shelters with the purpose to save dogs on death row. [Firebase](https://www.firebase.com/) is used to store each dog resuce organization's details. 
The app provides the following the features:

- public snapshot page showcasing current dogs up for adoption and dogs that need fosters to be saved from shelters. Dogs and their details are pulled from the private admin dog lists. The snapshot page also shows total number of dogs saved by organization(automatically updated when dog added to current dogs) and contact details. 
- private admin area where organizers can manage existing dog details. Information on the dog and its foster are provided for each dog and can be updated or deleted. Dogs can be added either manually or through moving a dog from the potential dogs list. 
- private admin area that lists potential dogs added from the find shelter dogs page or added manually. Dogs are listed here until a foster has been found and the dog rescue can commit to saving it. 
- private admin area that shows shelter dogs from around America. Dogs and their information is updated regularly through the RescueGroups API. A filter search is implemented help find dogs suitable to the dog rescue's specialty or location. 

#Languages & Tools
- [Angular](https://angularjs.org/)
- [BootStrap](http://getbootstrap.com/)
- [SASS](http://sass-lang.com/)
- [Firebase](https://www.firebase.com)
- [jQuery](https://jquery.com/)

#API References

This app uses the [RescueGroups.org's](https://userguide.rescuegroups.org/display/userguide/Home) API to keep up-to-date with available dogs needing fosters throughout America. Many shelters add dogs to RescueGroups database in hopes of finding homes for them through Adopt-a-Pet, Petfinder.com and other online pet portals. 
