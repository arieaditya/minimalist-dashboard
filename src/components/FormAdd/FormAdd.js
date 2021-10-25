import { useState } from "react";
import { useHistory } from "react-router-dom";
import { 
    Container,
    Alert
} from 'react-bootstrap';
import JsonToForm from 'json-reactform';
import Schema from './Schema';
import SteinStore from "stein-js-client";
import "./FormAddStyles.scss";
import Header from "../Header/Header";

const FormAdd = () => {
    const [isSubmit, setIsSubmit] = useState(false);

    const store = new SteinStore(
        "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
    );

    const history = useHistory();
   
    const submit = (params) => {
        setIsSubmit(true);
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
            history.push("/");
        }, 500);

    }

    return (
        <Container className="wrapper-form">
            <Header/>
            <h1>Tambah Data</h1>
            {isSubmit && <Alert variant="success" dismissible>Data berhasil ditambahkan</Alert> }
            <JsonToForm model={Schema} onSubmit={submit}/>
        </Container>
        
    );
   
}

export default FormAdd;


