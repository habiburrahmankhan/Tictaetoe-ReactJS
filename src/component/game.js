import React from 'react'
import Board from "./board"

export default class  Game extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            xisNext : true , 
            stepno : 0 , 
            history : [{
                squares : Array(9).fill(null)
            }] , 
        }
    }

    handleclick = (i)=> {
    const history = this.state.history 
    const current = history[history.length -1 ]
    const squares = current.squares 
    const winner = calculateWinner(squares)
   
   
    if(winner || squares[i])
    {
        return 
    }
    squares[i] = this.state.xisNext ? "X" : "O"
        this.setState({
            history : history.concat({
                squares : squares 
            }) , 
            xisNext : !this.state.xisNext , 
            stepno : history.length 

        })
}



    render()  {
        const history = this.state.history ; 
        const current = history[history.length -1 ]
        const squares = current.squares 
        let status 
        const winner = calculateWinner(squares)
        
        if(winner)
        {
           status = "Winner is " + winner
        }
        else{
            status = " Next Player is  " + (this.state.xisNext ? " X " : " O ")
        }
        if(this.state.stepno===9)
        {
            status = " The Match is Tie " 
        }
        return  <div className = "game"> 
            <div className = "game-board">
                      <Board clickAction = {(i)=>this.handleclick(i)}  squares = {current.squares} />
            </div>
    <div className = "game-info"> {status }</div>  
   
            </div>
    }
    
}          
function calculateWinner(squares) {
    const possibility =[
        [0,1,2] , 
        [3 ,4 ,5 ] , 
        [6 , 7, 8] , 
        [0,3, 6] , 
        [1 , 4 ,7] , 
        [2 , 5 ,8 ] , 
        [0,4 , 8], 
        [2,4,6 ]
    ]
    for(let i =0 ; i < possibility.length; i++)
    {
        const [a, b, c] = possibility[i] ; 
        if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c])
        {
            return squares[a] 
        }
    }
    return null ;
    
}
