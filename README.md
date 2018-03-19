# UdaciCards

UdaciCards is the third project of the Udacity React Nanodegree course. It is a flashcards app. The user can create decks of flashcards which contain questions and answers for studying and review.

## About the Software: Installing and Running the App

Node.js (https://nodejs.org/en/download/) must be installed on your computer. This app was bootstrapped with create-react-native-app (https://github.com/react-community/create-react-native-app), which must also be installed. The Expo app (https://expo.io/tools) must be installed on your iPhone or Android device. Your mobile device and computer must be on the same wireless network. The software was tested on an iPhone X running iOS 11.2.6 in conjunction with an iMac (retina 5K, 2017, macOS 10.13.3). I also more briefly tested the software on an Android device (Samsung S8+, Android version 7.0).

From the terminal, change to the the directory of this software. To install the dependencies for the app, enter the following:

​	yarn install

After the dependies are installed, enter the following:

​	yarn start

A QR barcode should appear. Scan the barcode using the Expo app on your mobile device. The program should start running on the mobile device.

These instructions should theoretically work on Windows machines but I was not successful using my Window 10 computer. I was able to run the app on my mobile devices using the Expo XDE on  my Windows computer.

## Instructions

####Default Deck List View

The default display is a list of decks of flashcards. There is a tab (at the bottom on iPhones and at the top on Android devices) for creating a new deck. Pressing on the New Deck tab will transfer you to a form with a single field. Pressing on one of the decks in the list will transfer you to a Single Deck view.

####Create a Deck view

On the Create a Deck form, enter the title of your new deck. It should be a unique name. Press the Create Deck button to create the deck and then transfer to the Single Deck View.  If you change your mind about creating a deck, pressing the Deck List tab will return you to the Deck List without creating a new deck.

####Single Deck View

At the single deck view, there are tabs for creating a new card and for taking a practice quiz with the flashcards in the deck. There are also two buttons below the title of the deck for deleting the entire deck and for returning to the deck list.

In the Quiz view, a question will appear. Press the Show Answer button to see the answer. Press the Correct or Incorrect button to indicate the accuracy of your answer. You score will be computed. The quiz can be ended by pressing the End Quiz button or restarted by pressing the Restart button.

####New Card View

The New Card view is similar to the view for creating a new deck. The main difference is that there are 2 separate fields, one for the question and one for the answer. Press the Create Card button to create the new card. There is also a Clear button for clearing the fields without creating a new card. Pressing the button also returns you to the single deck view. You can also press the Single Deck tab to return. 

## Problems/Plans

1. A button for deleting cards should be added.
2. The buttons to create a deck and create a card should not appear or not be active until there is text added to the fields. Currently, you can create cards with blank questions and answers.