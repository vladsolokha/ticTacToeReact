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
  renderSquare(i) {
    return (
      <Square 
        mark={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}  
      />
    );
  }

  render() {
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

function calculateWinner(squares) {
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
  
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice(); //creates copy of array to modify it instead of the original
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
    }]), 
    xIsNext: !this.state.xIsNext,});
  } // !(NOT) changes the true ==> false
  
  render() {
    const history = this.state.history;
    const current = history[history.length -1];
    const winner = calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
      const description = move ? 
        'Go to move: ' + move : 
        'Go to game start'; 
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>
            {description}
          </button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + 
          (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(e) => this.handleClick(e)} 
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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

