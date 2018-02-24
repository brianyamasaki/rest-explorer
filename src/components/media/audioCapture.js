import React, { Component } from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { hasGetUserMedia, getUserMedia, enumerateDevices, hasEnumerateDevices } from '../../shared';

class AudioCapture extends Component {
  state = {
    supported: false,
    stream: null,
    devices: [],
    isRecording: false,
    recordings: []
  }
  chunks = [];
  mediaRecorder;

  componentDidMount() {
    if (hasGetUserMedia()) {
      const constraints = {
        audio: true
      };
      getUserMedia(constraints)
        .then(stream => {
          this.setState({
            supported: true,
            stream
          });
          console.log('Audio Stream created');
          this.mediaRecorder = new MediaRecorder(stream);
        })
        .catch(error => {
          console.log('Audio Stream not created');
        })
    }
    if (hasEnumerateDevices) {
      enumerateDevices()
        .then(devices => {
          const deviceList = [];
          devices.forEach(device => {
            if (device.kind === 'audioinput') {
              deviceList.push(device)
            }
          });
          this.setState({
            devices: deviceList
          });
        })
        .catch(error => {
          console.log('no audio devices');
        });
    }
  }

  onDataAvailable(e) {
    this.chunks.push(e.data);
  }

  onClickRecord() {
    if (!this.state.isRecording) {
      // start recording
      this.mediaRecorder.ondataavailable = this.onDataAvailable.bind(this);
      this.mediaRecorder.start();
      console.log('start recording');
      this.setState({ isRecording: true});
    } else {
      // stop recording
      this.mediaRecorder.stop();
      var blob = new Blob(this.chunks, { 'type': 'audio/ogg: codecs=opus'});
      this.chunks = [];
      console.log('stop recording');
      this.setState({ 
        isRecording: false,
        recordings: this.state.recordings.concat(window.URL.createObjectURL(blob))
      });
    }
    
  }

  onClickDelete(i) {
    this.setState({
      recordings: _.filter(this.state.recordings, (item, iItem) => iItem !== i)
    })
  }

  renderDevices() {
    return (
      <select>
        {this.state.devices.map(device => (<option>{device.label}</option>))}
      </select>
    );
  }

  renderButtons() {
    if (this.mediaRecorder) {
      const btnText = this.mediaRecorder.state === 'recording' ? 'Stop' : 'Record';
      return (
        <div>
          <Button onClick={this.onClickRecord.bind(this)}>{btnText}</Button>
        </div>
      );
    }
  }

  renderRecording(recording, i) {
    return (
      <li key={i}>
        <audio controls src={recording} />
        <Button onClick={() => this.onClickDelete(i)}>Delete</Button>
      </li>
    )
  }

  renderRecordings() {
    if (this.state.recordings.length) {
      return (
        <ul>
          {this.state.recordings.map(this.renderRecording.bind(this))}
        </ul>
      )
    }
  }

  render() {
    return (
      <div>
        <h3>Audio Devices</h3>
        {this.renderButtons()}
        {this.renderRecordings()}
      </div>
    );
  }
}

export default AudioCapture;