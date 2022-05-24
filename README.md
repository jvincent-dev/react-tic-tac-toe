## Available Scripts

In the project directory, you can run:

### `yarn start`

## General Architecture
- components
 - Board: board compoents like the CellButton and each row and column
 - Navbar: handles navigating to / (home) and /signup pages when signing out
- context
 - GameContext: includes the game logic like handling the user's move or the AI's move and if the game is a draw
- routes
 - Game: the route to the game screen which checks if there is a auth token saved
 - SignUp: the route to register the user for an auth token to play with the AI

## Reasoning Behind Technical Choices
- regex email validation: a basic check for an email with a single @ and ending with a . followed by upper or lower case letters. There are better regex, but this is the best I could think of.
- I used react-router-dom with sessionStorage to track authentication and redirect signed out users to /signup
- I used bootstrap as the design framework and responsiveness
- I used context to split the game logic from the GameScreen. I also created a Board component for readability and reusability if needed
- We have two routes for two screens and endpoints (Sign Up and Game).
- I didn't use a navbar on the SignUp screen because I wanted something similar to Instagram's simplistic log in screen. Also the navbar can include the sign out button
- I thought using bootstrap grid vs table didn't matter. Maybe it would have been easier to not use a button with the cells. But I did it the way I knew how, using elements and event listeners
- I included a sign out option which just removes the token and navigates back to /signup
- I also tried to handle server errors by catching them and letter the user try again. I think it's the best that can be done unless the server not responsive.

## Things not implemented and trade-offs (How you would do things differently with more time if it was for production use)
- I would definetly use a more robust regex from online to handle the email check for production
- I wanted to extract the sign up logic into it's own context, but I didn't have time
- The API endpoints could have had their own context too if I had time. It would have prevented having two of the same API_ENDPOINT varaiables
- Could have used icons instead of the text Xs and Os and could have implemented a better board if I had the time
- I had planned to use the AI engine endpoint to generate a suggested move by reversing the table's values and sending the current move. But it doesn't handle Xs. If I were to implement this, I would set some rules for the computer to follow like picking the middle if it's open and focusing on rows, columns or even diagonals that already have two Xs. Another option also could be just picking random free cells since it's just a "suggestion".
- I would also play more with bootstrap and hopefully do better styles if I had the time
- I think using the button made it harder to implement the css for the row and column hightlights. Without the button setting the highlight would be easier with CSS
- A better brand/logo would be nice to replace the "tic tac toe" text
- It would have been better to have created a matrix deep copy function because looking back I was mapping the matrix a lot