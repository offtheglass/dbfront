import React, {useEffect, useState} from "react"
import { createContext } from 'react';
import { Button} from 'react-bootstrap';
import { Navigate,useLocation } from "react-router-dom";
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
  import { CSVLink, CSVDownload } from "react-csv";

  var datatoshow;
  
  
function Tablescan2() {
  const onClick2=(event)=>{
    fetch('http://165.132.129.99:8080/csv' ,{

              method:'GET',
              //여기 GET인데 body에 tablename요구함. 물어보기. tablename은 tablename으로 할 수 있을 듯
          })
          .then(response=>{
          })
    }
  const onClick3=(event)=>{
    console.log('onclick3')
    fetch('http://165.132.129.99:8080/getrepresentativeattributes' ,{

              method:'GET',
          })
          .then(response=>{
              console.log(response)
              return response.json()
          }).then(response=>{
            console.log(response)
            if(response===true){
              Setreset(reset+1)
              //popup창띄우기
            }
            else{
              //popup창띄우기  이 함수로 현재의 테이블의 대표속성이 뭐인지 리턴하기
            }
      }
          )
  }

  const navigate = useNavigate()
  const [go,Setgo]=useState(false)
  const [reset,Setreset]=useState(0)
  const columns2 = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: '속성명2', width: 130 },
    { field: 'type', headerName: '데이터타입', width: 130 },
    {
      field: '속성삭제',
      headerName: '속성삭제',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(tablename)
          const api= params.api;
          const thisRow= {};
  
          api.getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );  
          datatoshow=thisRow
          console.log(tablename)
          fetch('http://165.132.129.99:8080/editattribute' ,{

                method:'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({
                  table:tablename,
                  column:thisRow["name"]
                })
            })
            .then(response=>{
                return response.json()
            }).then(response=>{
              if(response===true){
                Setreset(reset+1)
                //popup창띄우기
              }
              else{
                //popup창띄우기
              }
        }
            )
          //return alert(JSON.stringify(thisRow, null, 4));
          return 
        };
  
        return <Button onClick={onClick}>속성삭제</Button>;
      },
    
  },
  {
    field: '대표속성설정',
    headerName: '대표속성설정',
    width: 170,
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
        //Setgo(true) 원래 여기까지가 코드
        alert("설정되었습니다.")
        /*fetch('http://165.132.129.99:8080/setrepresentativeattribute' ,{

              method:'POST',
              headers: { 'Content-Type': 'application/json' },
              body:{
                tableId:tableid,
                column:thisRow["name"],
                representativeAttribute:thisRow  
              }
          })
          .then(response=>{
              console.log(response)
              return response.json()
          }).then(response=>{
            console.log(response)
            if(response===true){
              Setreset(reset+1)
              //popup창띄우기
            }
            else{
              //popup창띄우기
            }
      }
          )*/
        //return alert(JSON.stringify(thisRow, null, 4));
        return 
      };

      return <Button onClick={onClick}>Click</Button>;
    },
  
},
  {
    field: '속성편집(Tointeger)',
    headerName: '속성편집(Tointeger)',
    width: 170,
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
        fetch('http://165.132.129.99:8080/editattribute' ,{

              method:'POST',
              headers: { 'Content-Type': 'application/json' },
              body:JSON.stringify({
                table:tablename,
                column:thisRow["name"],
                type:"INTEGER"
              })
          })
          .then(response=>{
              console.log(response)
              return response.json()
          }).then(response=>{
            console.log(response)
            if(response===true){
              Setreset(reset+1)
              //popup창띄우기
            }
            else{
              //popup창띄우기
            }
      }
          )
        //return alert(JSON.stringify(thisRow, null, 4));
        return 
      };

      return <Button onClick={onClick}>편집</Button>;
    },
  
},
{
  field: '속성편집(Totext)',
  headerName: '속성편집(Totext)',
  width: 170,
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
      fetch('http://165.132.129.99:8080/editattribute' ,{

            method:'POST',
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({
              table:tablename,
              column:thisRow["name"],
              type:"TEXT"
            })
        })
        .then(response=>{
            return response.json()
        }).then(response=>{
          if(response===true){
            console.log(response)
            Setreset(reset+1)
            //popup창띄우기
          }
          else{
            //popup창띄우기
          }
    }
        )
      //return alert(JSON.stringify(thisRow, null, 4));
      return 
    };

    return <Button onClick={onClick}>편집</Button>;
  },

},
{
  field: '속성편집(Todouble)',
  headerName: '속성편집(Todouble)',
  width: 170,
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
     fetch('http://165.132.129.99:8080/editattribute' ,{

            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              table:tablename,
              column:thisRow["name"],
              type:"DOUBLE"
            })
        })
        .then(response=>{
            return response.json()
        }).then(response=>{
          if(response===true){
            console.log(response)
            Setreset(reset+1)
            //popup창띄우기
          }
          else{
            //popup창띄우기
          }
    }
        )
      //return alert(JSON.stringify(thisRow, null, 4));
      return 
    };

    return <Button onClick={onClick}>편집</Button>;
  },

},
    { field: 'nullCount', headerName: 'NULL레코드수', width: 130 },
    { field: 'nullRatio', headerName: 'NULL레코드비율', width: 130 },
    { field: 'specialCount', headerName: '상이수치값', width: 130 },
    { field: 'max', headerName: '최대값', width: 130 },
    { field: 'min', headerName: '최소값', width: 130 },
    { field: 'zeroCount', headerName: '0레코드수', width: 130 },
    { field: 'zeroRatio', headerName: '0레코드비율', width: 130 },
    { field: '대표속성', headerName: '대표속성가능여부', width: 130 },
    { field: '결합키후보', headerName: '결합키후보', width: 130 },
    { field: '대표결합키', headerName: '대표결합키', width: 130 },

    


    

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

  const columns3= [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: '속성명2', width: 130 },
    { field: 'type', headerName: '데이터타입', width: 130 },
    {
      field: '속성삭제',
      headerName: '속성삭제',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(tablename)
          const api= params.api;
          const thisRow= {};
  
          api.getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );  
          datatoshow=thisRow
          console.log(tablename)
          fetch('http://165.132.129.99:8080/editattribute' ,{

                method:'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({
                  table:tablename,
                  column:thisRow["name"]
                })
            })
            .then(response=>{
                return response.json()
            }).then(response=>{
              if(response===true){
                Setreset(reset+1)
                //popup창띄우기
              }
              else{
                //popup창띄우기
              }
        }
            )
    
          //return alert(JSON.stringify(thisRow, null, 4));
          return 
        };
  
        return <Button onClick={onClick}>속성삭제</Button>;
      },
    
  },
  {
    field: '대표속성설정',
    headerName: '대표속성설정',
    width: 170,
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
        Setgo(true)
        /*fetch('http://165.132.129.99:8080/setrepresentativeattribute' ,{

              method:'POST',
              headers: { 'Content-Type': 'application/json' },
              body:{
                tableId:tableid,
                column:thisRow["name"],
                representativeAttribute:thisRow  
              }
          })
          .then(response=>{
              console.log(response)
              return response.json()
          }).then(response=>{
            console.log(response)
            if(response===true){
              Setreset(reset+1)
              //popup창띄우기
            }
            else{
              //popup창띄우기
            }
      }
          )*/
        //return alert(JSON.stringify(thisRow, null, 4));
        return 
      };

      return <Button onClick={onClick}>Click</Button>;
    },
  
},
  
{
  field: '속성편집(Totext)',
  headerName: '속성편집(Totext)',
  width: 170,
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
      fetch('http://165.132.129.99:8080/editattribute' ,{

            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              table:tablename,
              column:thisRow["name"],
              type:"TEXT"
            })
        })
        .then(response=>{
            return response.json()
        }).then(response=>{
          if(response===true){
            Setreset(reset+1)
            //popup창띄우기
          }
          else{
            //popup창띄우기
          }
    }
        )
      //return alert(JSON.stringify(thisRow, null, 4));
      return 
    };

    return <Button onClick={onClick}>편집</Button>;
  },

},
{
  field: '속성편집(Todouble)',
  headerName: '속성편집(Todouble)',
  width: 170,
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
     fetch('http://165.132.129.99:8080/editattribute' ,{

            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              table:tablename,
              column:thisRow["name"],
              type:"DOUBLE"
            })
        })
        .then(response=>{
            return response.json()
        }).then(response=>{
          if(response===true){
            console.log(response)
            Setreset(reset+1)
            //popup창띄우기
          }
          else{
            //popup창띄우기
          }
    }
        )
      //return alert(JSON.stringify(thisRow, null, 4));
      return 
    };

    return <Button onClick={onClick}>편집</Button>;
  },

},
{
  field: '속성편집(Tointeger)',
  headerName: '속성편집(Tointeger)',
  width: 170,
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
      fetch('http://165.132.129.99:8080/editattribute' ,{

            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
              table:tablename,
              column:thisRow["name"],
              type:"INTEGER"
            })
        })
        .then(response=>{
            console.log(response)
            return response.json()
        }).then(response=>{
          console.log(response)
          if(response===true){
            Setreset(reset+1)
            //popup창띄우기
          }
          else{
            //popup창띄우기
          }
    }
        )
      //return alert(JSON.stringify(thisRow, null, 4));
      return 
    };

    return <Button onClick={onClick}>편집</Button>;
  },

},
    { field: 'nullCount', headerName: 'NULL레코드수', width: 130 },
    { field: 'nullRatio', headerName: 'NULL레코드비율', width: 130 },
    { field: 'specialCount', headerName: '상이범주값', width: 130 },
    { field: 'zeroCount', headerName: '특수문자 포함 레코드 수', width: 180 },
    { field: 'zeroRatio', headerName: '특수문자 포함 레코드 비율', width: 180 },
    { field: '대표속성', headerName: '대표속성가능여부', width: 130 },
    { field: '결합키후보', headerName: '결합키후보', width: 130 },
    { field: '대표결합키', headerName: '대표결합키', width: 130 },

    


    

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

  const location=useLocation()
  const tablename=location.state.data["name"]
  const tableid=location.state.data["id"]
  const csvheader=['name', 'type', 'min', 'max', 'nullCount', 'nullRatio', 'distinctCount', 'specialCount', 'specialRatio', 'zeroCount', 'zeroRatio', 'id', '대표속성가능여부']
  const csvdata=[['name', 'type', 'min', 'max', 'nullCount', 'nullRatio', 'distinctCount', 'specialCount', 'specialRatio', 'zeroCount', 'zeroRatio', 'id', '대표속성가능여부']]
  const csvdata2=[['name', 'type', 'min', 'max', 'nullCount', 'nullRatio', 'distinctCount', 'specialCount', 'specialRatio', 'zeroCount', 'zeroRatio', 'id', '대표속성가능여부']]
  const [csvdatatodown,Setcsvdatatodown]=useState([])
  const [csvdatatodown2,Setcsvdatatodown2]=useState([])
  /*function fill(){columns2.map(function(row){
    if(row.field.endsWith(')')||row.field.endsWith('설정')||row.field.endsWith('제')||row.field.startsWith('full')||row.field.startsWith('id')){
    }
    else{
      csvheader.push(row.field)
    }
  }
)}*/
 // fill()
  console.log(csvheader)
  const onclick3=()=>{
    fetch('http://165.132.129.99:8080/addrepresentativeattribute' ,{

                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:{

                }
            })
            .then(response=>{
                console.log('1')
                return response.json()
            })
  }
    const [li,Setli]=useState([])
    const [numli,Setnumli]=useState([])
    useEffect(() => {
        console.log("맨 처음 렌더링될 때 한 번만 실행");
        fetch('http://165.132.129.99:8080/editattribute' ,{

                method:'GET',
            })
            .then(response=>{
                console.log('1')
                return response.json()
            }).then(response=>{//console.log(response["tableInfos"][location.state.data["id"]]["columns"])
                  const columns=response["tableInfos"][location.state.data["id"]]["columns"]
                  var lis=[]
                  var numlis=[]
                  for(var i in columns){
                    var temp=columns[i]
                    temp["id"]=i
                    console.log(temp)
                    if(temp["nullRatio"]>0.3){
                      temp["대표속성"]="X"
                    }
                    else{
                      temp["대표속성"]="O"
                    } // 각 속성이 대표속성이 될 수 있는지 판단하는 부분
                    if(temp["type"]==='INTEGER'){
                      numlis.push(temp)
                    }
                    else if(temp["type"]==='DOUBLE'){
                      numlis.push(temp)
                    }
                    else{
                      lis.push(temp)
                    }
                  }
                      Setnumli(numlis)
                      Setli(lis)
                      // li data를 csv파일에 넣는 과정
                      for(var u in lis){
                        var temp=[]
                        for(var o in Object.values(lis[u])){
                            console.log(o)
                            temp.push(String(Object.values(lis[u])[o]))
                        }
                        csvdata.push(temp)
                      }
                      console.log(csvdata)
                      Setcsvdatatodown(csvdata)
                      // numli data를 csv파일에 넣는 과정
                      for(var u in numlis){
                        var temp=[]
                        for(var o in Object.values(numlis[u])){
                            console.log(o)
                            temp.push(String(Object.values(numlis[u])[o]))
                        }
                        csvdata2.push(temp)
                      }
                      console.log(csvdata2)
                      Setcsvdatatodown2(csvdata2)
            
        }
            )

      },[]);
    return(
        <div style={{ height: 400, width: '100%' }}>
          {go&& (
            navigate('/Tablescan3', {
              state: {
                id: 1,
                job: '개발자',
                data:datatoshow,
                tablename:tablename
              }
            })
          )}
          <p>범주 속성 스캔 결과</p>
        <DataGrid
          rows={li}
          columns={columns3}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
        <CSVLink data={csvdatatodown}>스캔결과 내려받기</CSVLink>;
        <p>수치 속성 스캔 결과</p>
        <DataGrid
          rows={numli}
          columns={columns2}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
        <CSVLink data={csvdatatodown2}>스캔결과 내려받기</CSVLink>;
        <Button onClick={onClick3}>대표속성확인</Button>
      </div>
    )
}
    
    
    


export default Tablescan2