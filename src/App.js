// import logo from './logo.svg';
import './App.css';

import { ZoomMtg } from '@zoomus/websdk';
import React from 'react';

var log = require('console-log-level')({ level: 'info' })

// Uncomment this line if you are Building for Relative Paths (example: http://mywebsite.com/relativepath") and have set the "homepage" value in package.json - More info here: https://create-react-app.dev/docs/deployment/#building-for-relative-paths
// ZoomMtg.setZoomJSLib(process.env.PUBLIC_URL + '/node_modules/@zoomus/websdk/dist/lib', '/av')

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const signatureEndpoint = 'http://localhost:4000'
const apiKey = '2dSCUOCIRCm0-aZ2OLehJA'

function App() {

  log.info('started app')

  // var meetingNumber = '72068651280'
  // var meetingPassword = 'i5EDv8'
  // var meetingRole = 0
  // var leaveUrl = 'http://localhost:3000'
  // var userName = 'Go Bot'
  // var userEmail = ''

  function getSignature(e) {
    e.preventDefault();

    // TODO вынести данные в один объект
    var meetingNumber = window.meetingNumber
    var meetingRole = window.meetingRole

    log.info('meetingNumber: ' + meetingNumber)
    log.info('meetingRole: ' + meetingRole)


    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: meetingRole
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })

  }

  function startMeeting(signature) {

    // TODO вынести данные в один объект
    var meetingNumber = window.meetingNumber
    var meetingPassword = window.meetingPassword
    var leaveUrl = window.leaveUrl 
    var userName = window.userName
    var userEmail = window.userEmail

    console.log('signature: ', signature)
    
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: meetingPassword,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom WebSDK Sample React</h1>

        <button id='join-meeting-button' onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
