import React, {useEffect, useState} from "react"
import { Button} from 'react-bootstrap';
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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

  var datatoshow;
  function Update(data){
    const [toshow,Settoshow]=useState()
    Settoshow(data)
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'name', width: 130 },
    { field: 'count', headerName: 'count', width: 130 },
    { field: 'attributes', headerName: 'attributes', width: 130 },

    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'action',
        headerName: 'Action',
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
            console.log(datatoshow)
            //return alert(JSON.stringify(thisRow, null, 4));
            return 
          };
    
          return <Button onClick={onClick}>Click</Button>;
        },
      
    },false
  ];
  
  
function Tablescan5() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'name', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: '속성편집',
      headerName: '속성편집',
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
          console.log(datatoshow)
          Setgo2(true)
          //return alert(JSON.stringify(thisRow, null, 4));
          return 
        };
  
        return <Button onClick={onClick}>Click</Button>;
      },
    
  }
  ];
    const navigate = useNavigate();

    
    const [go,Setgo]=useState(false)
    const [go2,Setgo2]=useState(false)
    const [li,Setli]=useState([])
    useEffect(() => {
        console.log("맨 처음 렌더링될 때 한 번만 실행");
        fetch('http://165.132.129.99:8080/editattribute' ,{

                method:'GET',
                headers:{
                }
            })
            .then(response=>{
                console.log(response)
                return response.json()
            }).then(response=>{console.log(response["tableInfos"]);var lis=[];for(var i in response["tableInfos"]){
                var attr={id:i}
                for(var j in response["tableInfos"][i]){
                    if(j==="columns"){
                        var st=''
                        var lis2=[]
                        for(var k in response["tableInfos"][i][j]){
                            lis2.push(response["tableInfos"][i][j][k]["name"])
                        }
                        st=lis2.toString()
                        attr["attributes"]=st
                    }
                    else{
                        attr[j]=response["tableInfos"][i][j]
                    }
                }
                
                lis.push(attr)
            }
            Setli(lis)
        }
            )
      },[]);
    return(
        <div style={{ height: 400, width: '100%' }}>
          {go2&& (
            navigate('/Tablescan2', {
              state: {
                id: 1,
                job: '개발자',
                data:datatoshow
              }
            })
          )}
        <DataGrid
          rows={li}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    )
}
    
    
    


export default Tablescan5