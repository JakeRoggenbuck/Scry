import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ClickToOpen from '../../Assets/ClickToOpen.png'

const UptimeBox = (props) => {
    
    return (
        <div className="monitor-box-div">
            <Link className="disguised-a" to="/open-ports">
                <div className="monitor-box-div-card">
                    <h3>Server Uptime</h3>

                    <img className="uptime-click-img" src={ClickToOpen}/>
                </div>
            </Link>
        </div>
    );  
};
  
export default UptimeBox