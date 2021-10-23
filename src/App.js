import React from "react";
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

const App = () => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalData, setIsTotal] = React.useState('');
  

  React.useEffect(() => {
    // if(isLoading){
    store.read("list").then((data) => {
      
      const filterUnwanted = (arr) => {
        const required = arr.filter(el => {
           return el.uuid && el.komoditas && el.tgl_parsed;
        });
        return required;
      };
      // console.log(filterUnwanted(data));
      // console.log(this.state.isLoading);
      setIsLoading(false);
      setData(filterUnwanted(data));
      setIsTotal(filterUnwanted(data).length);
      
    });
  });

  

  return (
    <div className="App">
      <React.Fragment>
        <Box>
          <h1>List Harga</h1>
          <p>{totalData} data ditemukan</p>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Komoditas</TableCell>
              <TableCell>Provinsi</TableCell>
              <TableCell>Kota</TableCell>
              <TableCell>Jumlah</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell align="right">Tanggal Dibuat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {!isLoading &&
            data.map((item, key) => {
              return (
                <TableRow>
                  <TableCell>{key}</TableCell>
                  <TableCell>{item.komoditas}</TableCell>
                  <TableCell>{item.area_provinsi}</TableCell>
                  <TableCell>{item.area_kota}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell align="right">{(new Date(item.tgl_parsed)).toLocaleDateString('id-ID')}</TableCell>
                </TableRow>
              );
          })}

          </TableBody>
        </Table>
      </React.Fragment>   
    </div>
  );
};

export default App;