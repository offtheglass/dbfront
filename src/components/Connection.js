import React from "react"
import { Navigate } from "react-router-dom";


class Connection extends React.Component {
    
    constructor(props){
    super(props)

    this.state={
        host:null,
        port:null,
        database:null,
        user:null,
        password:null,
        go:false
        }
    }
    
    handleChange(event) {
        event.preventDefault();
        let datatoSubmit=Object.entries(this.state)
        let editteddata={}
        for(var i in datatoSubmit){
            editteddata[datatoSubmit[i][0]]=datatoSubmit[i][1]
        }
        for(var i in editteddata){
            console.log(editteddata[i])
            console.log(JSON.stringify(editteddata))
        }
        //'165.132.129.99:8080/ping'
        fetch('http://165.132.129.99:8080/dbconnect' ,{

            method:'POST',
            headers:{
                'Content-type':'application/json; charset-UTF-8',
            },
            body: JSON.stringify(editteddata)
        })
        .then(response=>{console.log(response["status"]);if(response["status"]===200){
            this.setState({go:true})
        }
        })
    }
    render(){
    return (
    <div>
        {this.state.go&&this.state.user && (
            <Navigate to="/Connection2" replace={true} />
          )}
<form method='post' onSubmit={this.handleChange=this.handleChange.bind(this)}>
  <label>
    HOST:
    <input type="text" name="name" onChange={(event)=>{
        this.setState({host:event.target.value});
    }}/>
  </label>
  <label>
    PORT:
    <input type="text" name="port" onChange={(event)=>{
        this.setState({port:event.target.value})
    }} />
  </label>
  <label>
    Database:
    <input type="text" name="database" onChange={(event)=>{
        this.setState({database:event.target.value})
    }}/>
  </label>
  <label>
    USER:
    <input type="text" name="user" onChange={(event)=>{
        this.setState({user:event.target.value})
    }}/>
  </label>
  <label>
    Password:
    <input type="text" name="password" onChange={(event)=>{
        this.setState({password:event.target.value})
    }}/>
  </label>

  <input type="submit" value="connect" />
</form>
</div>
    );
}
}

export default Connection