# CheckeredBoardGames

## Building

Execute one of the following in the root of the project:
```
npm run build
npm run build-prod
```
The built project will be put into the dist folder. You can then host that folder however you'd like and navigate to the index.html to start playing a game.

## Debugging

Open chrome:///inspect and use the command
```
mocha --inspect-brk <path_to_built_test>.js
```
to debug a unit test.
