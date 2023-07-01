## Shared Shopping Website

Please view the live version of the website here: [Shared Shopping Website](https://shared-shopping-ade7e.web.app/)

### Introduction

I originally created this as a to-do list app, but wanting to expand on it and solve a problem in my life (albeit it a small problem of not knowing what my girlfriend needs from the supermarket) i slowly turned it into a shopping list app that you can share with anyone and update in real time.

### Technologies

This website was created using ReactJS and uses Google's firebase for authentication and storing data. Using snapshots I can update data in real time even when open on multiple devices - there are security rules in place to limit who can access what data.

### Features

Shared shopping allows people to:
- sign up for an account with email and password, or one click log in with Google
- create a list which can be accessed from any browser
- edit, check off and delete all items on the list
- share the list with someone through sending ID codes
- edit or check off items other people in your list have added
- remove people from your list, or return to your default list
- change your username


### Development

I initially started this project at the start of 2022, but then put it on hold for a few months to learn new things. When going back to the project I couldn't remember exactly how I set it up, so I should make better use of comments in the future. Using React feels very natural now, but there are many things that I should have implemented earlier on, meaning there is some unused/commented out code which needs to be cleaned up. However for now the site is fully functional but there are many under-the-hood issues that I want to fix/improve.


### Features to add

1. Things to fix
   - check who has access rights in securities rules, get an error on some pages
   -either use items context or don't, clean up the code
2. Things to add
  - add option on the login page to reset forgotten password, as currently no option
  - try and find a work around for accessing the website for social media broswers as this doesnt allow google sign in
  - sort list via urgency
