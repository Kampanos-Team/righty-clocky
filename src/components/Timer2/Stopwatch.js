import React from 'react';
import ReactDOM from 'react-dom';
import StopwatchDisplay from './StopwatchDisplay.jsx';
import StopwatchHistory from './StopwatchHistory.jsx';
import playImg from "../../assets/images/play-button.svg"
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { timerContext } from '../../contexts/TimerContext';
import { useAuth } from '../../hooks/useAuth';

// import "./styles.scss"

class Stopwatch extends React.Component {
  
  constructor(props) {
    
    super(props);
    this.state = {
      running: false,
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    };
  }

  formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = '0' + value;
    }
    if (rest[0] === 'ms' && value.length < 3) {
      value = '0' + value;
    }
    return value;
  };

  start = () => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.pace(), 10);
    }
  };

  stop = () => {
    this.setState({ running: false });
    clearInterval(this.watch);
  };

  pace = () => {
    this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
    if (this.state.currentTimeMs >= 1000) {
      this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
      this.setState({ currentTimeMs: 0 });
    }
    if (this.state.currentTimeSec >= 60) {
      this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
      this.setState({ currentTimeSec: 0 });
    }
  };

  reset = () => {
    this.setState({
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    });
  };

  render() {

    var porcentagem = 0; //se for uma duracao fixa é so fazer a logica e somando os valores atualizando o value dinamicamente

  //o history dentro do timer pode ser tambem uma aba mostrando todos os times pra usuarios autenticados ou contas administradoras


    
    

    return (

      
      
<div id="timer" style={{ width: 320, height: 320 }}>
      <CircularProgressbarWithChildren styles={{trail: {  strokeLinecap: 'butt'}, path:{strokeLinecap: 'butt'}}} className="progress-timer" strokeWidth={6} value={porcentagem}>

      <div  className= "centering" className={'stopwatch'}>
        <h2 ref="header"></h2>
        {this.state.running === false && (
          
          //a logica de estar logado precisa estar aqui pra poder fazer o crud com o firebase
         
          <img onClick={this.start} src={playImg} alt="" />
        )}
        {this.state.running === true && (
          <button onClick={this.stop}>STOP</button> 

        )}
        <button onClick={this.reset}>RESET</button> 
        <StopwatchDisplay
          ref="display"
          {...this.state}
          formatTime={this.formatTime}
        />
        <StopwatchHistory {...this.state} formatTime={this.formatTime} />
      </div>


       
      </CircularProgressbarWithChildren>
    </div>
     
    );
  }
}

export default Stopwatch;
