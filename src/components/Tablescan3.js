import React, {useEffect, useState} from "react"
import { createContext } from 'react';
import { Button} from 'react-bootstrap';
import { json, useLocation } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';
  import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
  import { useNavigate } from 'react-router-dom';

  var datatoshow;
  
  
function Tablescan3() {
  const onClick2=(event)=>{
    console.log('onclick2')
  }

  const navigate = useNavigate()
  const [go,Setgo]=useState(false)
  const [reset,Setreset]=useState(0)
  const columns2 = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: '표준 대표 속성사전 값', width: 130 },
    {
      field: 'mapping',
      headerName: 'mapping',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          
          const api= params.api;
          const thisRow= {};
  
          api.getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );  
          datatoshow=thisRow
          console.log(thisRow["name"])
          console.log(tablename)
          fetch('http://165.132.129.99:8080/setrepresentativeattribute' ,{

                method:'POST',
                headers:{'Content-Type': 'application/json' },
                body:JSON.stringify({
                  table:tablename,
                  column:columnname
                })
            })
            .then(response=>{
                console.log(response)
                return response.json()
            }).then(response=>{
              console.log(response)
              if(response===true){
                Setreset(reset+1)
                Setgo(true)
                //popup창띄우기
              }
              else{
                alert("실패했습니다.")
              }
        }
            )
          //return alert(JSON.stringify(thisRow, null, 4));
          return 
        };
  
        return <Button onClick={onClick}>click</Button>;
      },
    
  },
  ];
  const location=useLocation()
  const tablename=location.state.tablename
  const tableid=location.state.data["id"]
  const columnname=location.state.data["name"]
    
    const [li,Setli]=useState([])
    const [numli,Setnumli]=useState([])
    const [reprelist,Setreprelist]=useState([])
    useEffect(() => {
        console.log("맨 처음 렌더링될 때 한 번만 실행");
        console.log(tablename)
        console.log(columnname)
        var templi=[]
        fetch('http://165.132.129.99:8080/getrepresentativeattributes' ,{
          method:'GET',
        })
            .then(response=>{
                console.log('2')
                console.log(response)
                return response.json()
            }).then(response=>{
                  console.log(response)
                  for(var k in response){
                    console.log(response[k])
                    for(var j in response[k]){
                      console.log(response[k][j])
                      if(response[k][j][1]!==null){
                        if(response[k][j][1] in templi){
                        }
                        else{
                          console.log(response[k][j][1])
                          templi.push(response[k][j][1])
                        }
                      }
                    }
                  }
                var tmlist=[]
                for(var k in templi){
                  var temp2={}
                  temp2["id"]=k
                  temp2["name"]=templi[k]
                  tmlist.push(temp2)
                }
                Setreprelist(tmlist)
              } 
            )

        //getrepresentativeattributes
        /*fetch('http://165.132.129.99:8080/addrepresentativeattribute' ,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            table:"1_fitness_measurement",
            column:'TEST_SEX',
            attribute:'성별정보'
          })
        })
            .then(response=>{
                console.log('1')
                console.log(response)
                return response.json()
            }).then(response=>{
                  console.log(response)
        }
            )*/       

      },[]);
    return(
        <div style={{ height: 400, width: '100%' }}>
          {go&& (
            navigate('/Tablescan2', {
              state: {
                id: 1,
                job: '개발자',
                data:datatoshow,
                tablename:tablename
              }
            })
          )}
          <DataGrid
          rows={reprelist}
          columns={columns2}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    )
}
    
    
    


export default Tablescan3