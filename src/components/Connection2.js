import React from "react"
import { Button} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
require('./Connection2.css')

class Connection2 extends React.Component {
     
    constructor(props){
        super(props)
    
        this.state={
            files:[]
            }
        this.onChange=this.onChange.bind(this)
        this.sendfile=this.sendfile.bind(this)
        }
     
        sendfile(event){
            console.log('sendfile')
            var formdata=new FormData()
            formdata.append('file', this.state.files[0])
            console.log(typeof(this.state.files[0]))
            fetch('http://165.132.129.99:8080/csv' ,{

                method:'POST',
                headers:{
                },
                body: formdata
            })
            .then(response=>{console.log(response);
            })
        }
  
        onChange(event){
            var files=event.target.files;
            var filesArr=Array.prototype.slice.call(files)
            this.setState({files:[...this.state.files,...filesArr]})

        }

        removeFile(f){
            this.setState({files:this.state.files.filter(x => x!==f)})
        }

        render(){
        return (
            <div>
            <form>
                <div>
                    <label className="custom-file-upload">
                        <input id='file' type='file' multiple onChange={this.onChange}/>
                        파일올리기
                    </label>
                    {
                        this.state.files.map(x => <div className="file-preview" onClick={this.removeFile.bind(this,x)}>{x.name}</div>)
                    }
                </div>
            </form>
            <button onClick={this.sendfile} className="button">전송</button>
            </div>
        );
    }
}

export default Connection2