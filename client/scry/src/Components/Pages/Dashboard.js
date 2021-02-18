import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import LoginsBox from '../Elements/LoginsBox';
import LoginHistoryBox from '../Elements/LoginHistoryBox';
import LoginHistory from '../Elements/LoginHistoryBox';
import OpenPortsBox from '../Elements/OpenPortsBox';
import OpenPorts from '../Elements/OpenPortsBox';
import StorageBox from '../Elements/StorageBox';

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