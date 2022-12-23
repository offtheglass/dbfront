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
  import { CSVLink, CSVDownload } from "react-csv";

  var datatoshow;
  function Update(data){
    const [toshow,Settoshow]=useState()
    Settoshow(data)
  }
  
  
  
function Joinmultipletableresult() {
  const location=useLocation()
  const [information,Setinformation]=useState({})
  const [csvdatatodown,Setcsvdatatodown]=useState([])
  const csvdata=[['테이블A','테이블B','결합테이블명','테이블A레코드수','테이블B레코드수','combined_num_records','num_to_be_joined','num_completed','결합키속성A','결합키속성B','대표결합키','결합성공률(W1)','결합성공률(W2)','결합진행상황','id']]
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'table1_name', headerName: '테이블A', width: 130 },
    { field: 'table1_num_records', headerName: '테이블A레코드수', width: 130 },
    { field: 'table1_combine_key', headerName: '결합키속성A', width: 130 },
    { field: 'table2_name', headerName: '테이블B', width: 130 },
    { field: 'table2_num_records', headerName: '테이블B레코드수', width: 130 },
    { field: 'table2_combine_key', headerName: '결합키속성B', width: 130 },
    { field: 'combine_key', headerName: '대표결합키', width: 130 }, // 여기 대표 결합키 뭐 의미하는지 다시 봐야할 듯
    { field: 'combined_num_records', headerName: '결과레코드수', width: 130 },
    { field: 'table1_success_rate', headerName: '결합성공률(W1)', width: 130 },
    { field: 'table2_success_rate', headerName: '결합성공률(W2)', width: 130 },
    { field: 'completion', headerName: '결합진행상황', width: 130 },
    { field: 'combined_name', headerName: '결합테이블명', width: 130 },


    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

    
    const [go,Setgo]=useState(false)
    const [go2,Setgo2]=useState(false)
    const [li,Setli]=useState([])
    useEffect(() => {
        console.log("맨 처음 렌더링될 때 한 번만 실행");
        fetch('http://165.132.129.99:8080/getmultiplejoinedtable' ,{
        method:"GET",
    }).then(response=>{ 
        console.log(response);return response.json()
}).then(response=>{
  console.log(response["joinResults"])
  var temp=response["joinResults"]
  var temp2=[]
  for(var k in temp){
    temp2.push(temp[k])
    temp2[k]["id"]=k
  }
  Setinformation(temp2)
  var temp3=[]
  console.log(Object.keys(temp2[0]))
  for(var k in temp2){
    var temp4=[]
    for(var c in Object.values(temp2[k])){
      temp4.push(String(Object.values(temp2[k])[c]))
    }
    temp3.push(temp4)
  }
  for(var k in temp3){
    csvdata.push(temp3[k])
  }
  console.log(csvdata)
  Setcsvdatatodown(csvdata)

})
      },[]);
    return(
        <div style={{ height: 400, width: '100%' }}>
           <DataGrid
          rows={information}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
        <CSVLink data={csvdatatodown}>스캔결과 내려받기</CSVLink>;
      </div>
      
    )
}
    
    
    


export default Joinmultipletableresult