import React from 'react';
import { useContext } from 'react';
import { timerContext } from '../../contexts/TimerContext';

import "./styles.css"

// import { Container } from './styles';

const TimeTable: React.FC = ({time}: any) => {
  const {timestamps} = useContext(timerContext)
  return (
    <div>
      
      {timestamps.map((item:any , index:any)=>( 
            <div className="container" key={index}>
              {/* <h4>{JSON.stringify(item)}</h4> */}
              <div>
                <strong>ID : </strong>
                {item.id}
              </div>
              <div>
              <strong>Start Time : </strong>
                {item.data.startTime}
              </div>
              <div>
              <strong>End Time : </strong>
                {item.data.endTime}
              </div>
              <div className="row">
                <div>
                <strong>Worker : </strong>
                  {item.data.worker}
                </div>
                <div>
                <strong>Company : </strong>
                  {item.data.company}
                </div>
                <div>
                <strong>Project : </strong>
                  {item.data.project}
              </div>
              <div>
                <strong>Total Hours : </strong>
                  {item.data.totalHours}
              </div>
              </div>
            </div> 
          )
        )
      }
    </div>
    )
}

export default TimeTable;