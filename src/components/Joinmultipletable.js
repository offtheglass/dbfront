import React, { useState } from "react"
import Joinonetableresult from "./Joinonetableresult.js"
import { useNavigate } from 'react-router-dom';


function Joinmultipletable(props){
    
    
    const [tableName,SettableName]=useState(null)
    const [tableColumn,SettableColumn]=useState(null)
    const [tableNames,SettableNames]=useState(null)
    const [tableColumns,SettableColumns]=useState(null)
    const [combinedColumn,SetcombinedColumn]=useState(null)
    const [go,Setgo]=useState(false)
    const navigate = useNavigate();
    var datatoSubmit2={}

    const handleChange=(event)=> {
        event.preventDefault();
        var editteddata={
            tableName:tableName,
            tableColumn:tableColumn,
            tableNames:String(tableNames).split(','),
            tableColumns:String(tableColumns).split(','),
            combinedColumn:combinedColumn
        }
        //'165.132.129.99:8080/ping'
        fetch('http://165.132.129.99:8080/joinmultipletable' ,{

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
                navigate('/Joinmultipletableresult', {
                  state: {
                    data:datatoSubmit2
                  }
                })
              )
            )
          }
<form method='post' onSubmit={handleChange}>
  <label>
    tableName:
    <input type="text" name="tableName" onChange={(event)=>{
        SettableName(event.target.value)
    }} />
  </label>
  <label>
  tableColumn:
    <input type="text" name="tableColumn" onChange={(event)=>{
        SettableColumn(event.target.value)
    }}/>
  </label>
  <label>
  tableNames:
    <input type="text" name="tableNames" onChange={(event)=>{
        SettableNames(event.target.value)
    }}/>
  </label>
  <label>
  tableColumns:
    <input type="text" name="tableColumns" onChange={(event)=>{
        SettableColumns(event.target.value)
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

export default Joinmultipletable