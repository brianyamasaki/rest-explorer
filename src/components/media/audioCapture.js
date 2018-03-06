import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Glyphicon } from 'react-bootstrap';
import { 
  hasMediaDevicesGetUserMedia, 
  hasMediaDevicesEnumerateDevices, 
  getMediaDevicesUserMedia, 
  mediaDevicesEnumerateDevices,
  getMedia
} from '../../shared';

class AudioCapture extends Component {
  state = {
    supported: false,
    stream: null,
    devices: [],
    isRecording: false,
    isMediaStream: false,
    mediaRecorder: null,
    recordings: []
  }
  chunks = [];

  componentDidMount() {
    if (hasMediaDevicesGetUserMedia()) {
      const constraints = {
        audio: true
      };
      getMediaDevicesUserMedia(constraints)
        .then(stream => {
          try {
            const mediaRecorder = new MediaRecorder(stream);
            if (mediaRecorder) {
              mediaRecorder.ondataavailable = this.onRecorderDataAvailable.bind(this);
              mediaRecorder.onstop = this.onRecorderStop.bind(this);    
            }
            this.setState({
              supported: true,
              mediaRecorder,
              stream
            });
            console.log('Audio Stream created');
          }
          catch(error) {
            console.log('mediaRecorder not supported');
            if (getMedia) {
              getMedia(constraints, 
                stream => {
                  this.setState({
                    isMediaStream: true,
                    supported: true,
                    stream
                  }); 
                  // const audioRecorder = new Recorder();
                },
                error => {
                  console.log(error);
                });
            }
          }
        })
        .catch(error => {
          this.setState({
            supported: false
          });
          console.log('Audio Stream not created', error);
        })
    }
    if (hasMediaDevicesEnumerateDevices()) {
      mediaDevicesEnumerateDevices()
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

  onRecorderStop(e) {
    const blob = new Blob(this.chunks, { 'type': 'audio/webm: codecs=opus'});
    this.chunks = [];
    console.log('stop recording');
    this.setState({ 
      isRecording: false,
      recordings: this.state.recordings.concat({
        blob: window.URL.createObjectURL(blob),
        filename: ''
      })
    });
  }

  onRecorderDataAvailable(e) {
    this.chunks.push(e.data);
  }

  onClickRecord() {
    if (!this.state.isMediaStream) {
      const { mediaRecorder } = this.state;
      if (!this.state.isRecording) {
        // start recording
        mediaRecorder.start();
        console.log('start recording');
        this.setState({ isRecording: true});
      } else {
        // stop recording
        mediaRecorder.stop();
      }
    } else {
      
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
    const { mediaRecorder } = this.state;
    if (mediaRecorder) {
      const glyph = mediaRecorder.state === 'recording' ? 
          <Glyphicon glyph="stop"/> : 
          "Start Recording";
      return (
        <div>
          <Button onClick={this.onClickRecord.bind(this)}>{glyph}</Button>
        </div>
      );
    }
  }

  renderRecording(recording, i) {
    return (
      <li key={i}>
        <audio controls src={recording.blob} />
        <Button onClick={() => this.onClickDelete(i)}><Glyphicon glyph="remove" style={{color: "red" }}/></Button>
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
    const title = this.state.supported ? 'Record a message' : 'Audio Recorder Not Supported';
    return (
      <div>
        <h3>{title}</h3>
        {this.renderButtons()}
        {this.renderRecordings()}
      </div>
    );
  }
}

export default AudioCapture;