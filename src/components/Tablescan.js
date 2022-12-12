import React, {useEffect} from "react"
import { Navigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';

  var li=[]

  function UserTable() {
    const users=[{id:"1",name:"a",email:"as",phone:"1"},{id:"2",name:"b",email:"asb",phone:"2"}]
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell align="right">Attributes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ id, name, email, phone }, i) => (
              <TableRow key={id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right">{email}</TableCell>
                <TableCell align="right">{phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
var li=[]
  
function Tablescan() {
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
            }).then(response=>{console.log(response);for(var i in response){
                li.push(response[i])
            }
            console.log(li[0])
        }
            )
      },[]);
    return(
        <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell align="right">Attributes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {li.map(({ name, count, columns }, i) => (
              <TableRow key={name}>
                <TableCell>{i + 1}</TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right">{count}</TableCell>
                <TableCell align="right">{columns}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}
    
    
    


export default Tablescan