import React, { useState } from "react"
import Joinonetableresult from "./Joinonetableresult.js"
import { useNavigate } from 'react-router-dom';



function Joinonetable(props){
    
    
    const [table1Name,Settable1Name]=useState(null)
    const [table1Column,Settable1Column]=useState(null)
    const [table2Name,Settable2Name]=useState(null)
    const [table2Column,Settable2Column]=useState(null)
    const [combinedColumn,SetcombinedColumn]=useState(null)
    const [go,Setgo]=useState(false)
    const navigate = useNavigate();
    var datatoSubmit2={}

    const handleChange=(event)=> {
        event.preventDefault();
        var editteddata={
            table1Name:table1Name,
            table1Column:table1Column,
            table2Name:table2Name,
            table2Column:table2Column,
            combinedColumn:combinedColumn
        }
        //'165.132.129.99:8080/ping'
        fetch('http://165.132.129.99:8080/joinonetable' ,{

            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(editteddata)
        }).then(response=>{ if(response["status"]===200){
            Setgo(true)
        }
    })
      }
    
    return (
    <div>
        { go&& (
            (
                navigate('/Joinonetableresult', {
                  state: {
                    data:datatoSubmit2
                  }
                })
              )
            )
          }
<form method='post' onSubmit={handleChange}>
  <label>
    table1Name:
    <input type="text" name="table1Name" onChange={(event)=>{
        Settable1Name(event.target.value)
    }} />
  </label>
  <label>
  table1Column:
    <input type="text" name="table1Column" onChange={(event)=>{
        Settable1Column(event.target.value)
    }}/>
  </label>
  <label>
  table2Name:
    <input type="text" name="table2Name" onChange={(event)=>{
        Settable2Name(event.target.value)
    }}/>
  </label>
  <label>
  table2Column:
    <input type="text" name="table1Column" onChange={(event)=>{
        Settable2Column(event.target.value)
    }}/>
  </label>
  <label>
  combinedColumn:
    <input type="text" name="combinedColumn" onChange={(event)=>{
        SetcombinedColumn(event.target.value);
    }}/>
  </label>

  <input type="submit" value="connect" />
</form>
</div>
    );

}

export default Joinonetable