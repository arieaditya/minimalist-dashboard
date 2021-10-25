import React from "react";
import { 
    Container,
    Alert
} from 'react-bootstrap';
import JsonToForm from 'json-reactform';
import Schema from './Schema';
import SteinStore from "stein-js-client";
import "./FormAddStyles.scss";

const FormAdd = () => {

    const store = new SteinStore(
        "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
    );
   
    const submit = (params) => {

        store.append("list", [{
                uuid: params.uuid,
                komoditas: params.komoditas,
                area_provinsi: params.area_provinsi.value,
                area_kota: params.area_kota.value,
                size: params.size,
                price: params.price,
                tgl_parsed: params.tgl_parsed,
                timestamp: params.timestamp
            }]).then(res => {
                console.log(res);
            });
    }

    return (
        <Container className="wrapper-form">
            <h1>Tambah Data</h1>
            <Alert variant="success" dismissible>Data berhasil ditambahkan</Alert>
            <JsonToForm model={Schema} onSubmit={submit}/>
        </Container>
        
    );
   
}

export default FormAdd;


