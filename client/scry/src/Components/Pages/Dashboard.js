import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ActiveUsersBox from '../Elements/ActiveUsersBox';
import LoginHistoryBox from '../Elements/LoginHistoryBox';
import LoginHistory from '../Elements/LoginHistoryBox';
import OpenPortsBox from '../Elements/OpenPortsBox';
import OpenPorts from '../Elements/OpenPortsBox';
import TrafficBox from '../Elements/TrafficBox';

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    // "scry" is the name of our DATABASE
        var dbo = db.db("scry");

    // Gets an array of things in the "user_connections" COLLECTION
        dbo.collection("user_connections").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        });

        dbo.collection("ports").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            });
});*/

const Dashboard = (props) => {
    return (
        <>
            <div className="monitor-box-grid-div">
                <ActiveUsersBox/>
                <LoginHistoryBox/>
            </div>

            <div className="monitor-box-grid-div">
                <OpenPortsBox/>
                <TrafficBox/>
            </div>
        </>
    );  
};
  
export default Dashboard