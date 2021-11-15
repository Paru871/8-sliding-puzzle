# 8-sliding-puzzle
A simple puzzle of 8 square tiles.
Can you assemble within 50 moves?


## install
```
$ npm install -g 8-sliding-puzzle
```

## rule
- The 8 puzzle is a sliding puzzle having 8 square tiles numbered 1–8 in a frame that is 3 tiles high and 3 tiles wide, leaving one unoccupied tile position. 
- Tiles in the same row or column of the open position can be moved by sliding them horizontally or vertically, respectively. 
- You can move it 50 times in one puzzle.
- The goal of the puzzle is to place the tiles in numerical order.
- And at the end, be sure to put the blank tile in the lower right corner.

## usage
```
$ 8-sliding-puzzle
```
Select a number and press enter.
```
Let's complete this puzzle within 50 moves.

  ---+---+---
   3   1   2
  ---+---+---
   7   4   5
  ---+---+---
   8   6    
  ---+---+---


? [Select a number you want to move:] 1/50 … 
❯ 5
  6
```
A solved 8-puzzle
```
  ---+---+---
   1   2   3
  ---+---+---
   4   5   6
  ---+---+---
   7   8    
  ---+---+---
```

## LICENSE
MIT
