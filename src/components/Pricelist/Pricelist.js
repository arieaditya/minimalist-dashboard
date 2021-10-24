import React from "react";
import { 
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import SteinStore from "stein-js-client";
import "@fontsource/sarabun";
import "./style.scss"

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

const Pricelist = () => {

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
            //   console.log(filterUnwanted(data));
            //   console.log(this.state.isLoading);
            setIsLoading(false);
            setData(filterUnwanted(data));
            setIsTotal(filterUnwanted(data).length);
          
        });


    
      });
    return (
        <React.Fragment>
            <Box>
                <h1 className="test">List Harga</h1>
                <p>{totalData} data ditemukan</p>
            </Box>
            <Table className="table" size="small">
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
                        <TableRow key={key}>
                            <TableCell>{key + 1}</TableCell>
                            <TableCell>{item.komoditas}</TableCell>
                            <TableCell>{item.area_provinsi}</TableCell>
                            <TableCell>{item.area_kota}</TableCell>
                            <TableCell>{item.size}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell align="right">{(new Date(item.tgl_parsed)).toLocaleDateString('id-ID', { year: '2-digit', month: 'short', day: '2-digit' })}</TableCell>
                        </TableRow>
                    );
                })}

                </TableBody>
            </Table>
        </React.Fragment>   
    );
};

export default Pricelist;