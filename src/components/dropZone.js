import React, { Component } from 'react';
import _ from 'lodash'
import $ from 'jquery'
import './componentsStyle.css'

class DropZone extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentDidMount(){
      
  }
  getFile = (event) => {
    let file = _.get(event, ['target', 'files', 0])
      if(file) {
        //file.file_id = this.props.playerId
        var reader = new FileReader()
        reader.onload = function(e) {
            $('#pi').attr('src', e.target.result)
            file.src = e.target.result
        }
        reader.readAsDataURL(file)
        console.log('FILE->', file)
        this.setState({ preview: file }, () => {
          this.props.file(this.state.preview)
        })
      }
  }
  render() {
    return (
      <div className='dropzone_box'>
        <div className='dropzone_container'>
            <label htmlFor='file_upload' className='dropzone_label'>
                <img src='/icon-upload.png' className='dropzone_label_icon'/>
                <span className='dropzone_label_text'>UPLOAD PHOTO</span>
            </label>
          <input type='file' name='avatar' id='file_upload' className='dropzone_input' onChange={this.getFile}/>
        </div>
        {this.state.preview ? <img id='pi' className='dropzone_preview' src='#'/> : null}
        {this.state.preview ? <button className='dropzone_remove' onClick={e => this.setState({ preview: null }, () => {
          this.props.file(null)
        })}>X</button> : null}
      </div>
    )
  }
}
export default DropZone