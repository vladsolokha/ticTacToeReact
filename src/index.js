import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { //child component of Board and Game, turned into function
    return (
      <button 
        className="square" 
        onClick= {props.onClick} //tell Board when square is clicked
      >
        {props.mark} {/* values passed as props from parent */}
      </button>
    );
  }


class Board extends React.Component { //parent of Square, child of Game
  constructor(props) { //holds state for each square
    super(props);
    this.state = {
      squares: Array(9).fill(null), //initialize board state
      xIsNext: true,
    };
  }
  
  renderSquare(i) {
    return (
      <Square 
        mark={this.state.squares[i]}
        onClick={() => this.handleClick(i)}  
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); //creates copy of array to modify it instead of the original
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squares: squares, xIsNext: !this.state.xIsNext,});
  } // !(NOT) changes the true ==> false

  calculateWinner(squares) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && 
        squares[a] === squares[c]) {
          return squares[a];
        }
    }
    return null;
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + 
          (this.state.xIsNext ? 'X' : 'O');
    }
    

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component { //parent 
  constructor(props) {
    super(props); 
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
      };
  }
  
  
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

