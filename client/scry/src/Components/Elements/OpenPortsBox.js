import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ClickToOpen from '../../Assets/ClickToOpen.png'

const OpenPortsBox = (props) => {
    
    return (
        <div className="monitor-box-div">
            <Link className="disguised-a" to="/open-ports">
                <div className="monitor-box-div-card">
                    <h3>Open Ports</h3>

                    <img className="open-ports-click-img" src={ClickToOpen}/>
                </div>
            </Link>
        </div>
    );  
};
  
export default OpenPortsBox