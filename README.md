# Edmodo Interview Homework

This repository is based on the bare repository given.

It is an rails and angular based app. Rails provides the login and an api forto query against. Angular is used to provide a one page front end.

The front end is all in one page (via modals instead of seperate angular routes, something with a bit more time I would have implement). I spent most of the time learning ruby/rails, both which I wasn't particularly familiar with.


Everything but users can be created via the UI. To do the various use cases:

* Homework contains a title, a question and a due date. You do not need to create the UI for homework creation. 

 Login as teacher and add homework via the form under "Homework form". The list of homeworks will update automatically.

* Teacher can assign a homework to multiple students. You do not need to create the UI for this.

 Click on homework in list of homeworks and go to the Assignments tab.
  
* Student can see all assigned homework. UI is required.

 Login as student and view the homework list.

* Student can submit a homework multiple times before the due date. UI is required. 

 Click on homework and add answer via answer form. If the answer is past due, it will provide text instead.

* Teacher can see a list of latest submissions for a homework. UI is required.

 Click homework in homework list and click answers tab.

* Teacher can see all submission versions for a student for a homework.UI is required.

 Same as above step, but use the filter to filter by user.



# To Run the application

Make sure you have Ruby (2.2 or above) and Bundler installed.

To set up the database, run

```console```
bundle install
rake db:reset
```

This will set up the database and it also create 2 users: 'teacher' and 'student'.

To start the web server, run

```console```
bundle exec rails server
```

Open your web browser and go to http://localhost:3000

You can log in as a teacher by using 'teacher' as the username and log in as a student by using 'student' as the username.

Good Luck!
