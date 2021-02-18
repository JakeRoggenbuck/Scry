import React from 'react';
import LoginsBox from '../Elements/LoginsBox';
import LoginHistoryBox from '../Elements/LoginHistoryBox';
import OpenPortsBox from '../Elements/OpenPortsBox';
import StorageBox from '../Elements/StorageBox';
import ScryLogo from '../../Assets/ScryLogo.png'

const Dashboard = (props) => {
    return (
        <>
            <img id="logo" src={ScryLogo}/>

            <div className="monitor-box-grid-div">
                <LoginsBox/>
                <LoginHistoryBox/>
            </div>

            <div className="monitor-box-grid-div">
                <OpenPortsBox/>
                <StorageBox/>
            </div>
        </>
    );  
};
  
export default Dashboard