// import logo from './logo.svg';
import './App.css';

import { ZoomMtg } from '@zoomus/websdk';
import React from 'react';

// Uncomment this line if you are Building for Relative Paths (example: http://mywebsite.com/relativepath") and have set the "homepage" value in package.json - More info here: https://create-react-app.dev/docs/deployment/#building-for-relative-paths
// ZoomMtg.setZoomJSLib(process.env.PUBLIC_URL + '/node_modules/@zoomus/websdk/dist/lib', '/av')

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

function App() {

  var signatureEndpoint = 'http://localhost:4000'
  var apiKey = '2dSCUOCIRCm0-aZ2OLehJA'
  var meetingNumber = '75163938282'
  var passWord = 'h6juvK'
  var role = 0
  var leaveUrl = 'http://localhost:3000'
  var userName = 'React'
  var userEmail = ''


  // var meetingNumber = window.meetingNumber
  // var passWord = window.meetingPass
  // var role = window.role
  // var leaveUrl = window.leaveUrl
  // var userName = window.userName
  // var userEmail = window.userEmail



  function getSignature(e) {

    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })

  }

  function startMeeting(signature) {

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
          passWord: passWord,
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

        <button onClick={getSignature} value='join meeting'>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
