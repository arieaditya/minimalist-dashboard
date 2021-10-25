import { useEffect, useState, useRef, Fragment } from "react";
import { Link } from 'react-router-dom';
import { 
    Table,
    InputGroup,
    Container,
    FormControl,
    Navbar,
    Dropdown,
    Button
} from 'react-bootstrap';
import SteinStore from "stein-js-client";
import "@fontsource/sarabun";
import "./PricelistStyles.scss";
import SearchIcon from "../../assets/icons/magnifier.svg";
import Logo from "../../assets/logo.svg"
import Skeleton from "../Skeleton/Skeleton";

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

const Pricelist = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalData, setIsTotal] = useState('');
    const inputSearchRef = useRef(null);
    const isMinMaxClick = useRef(null);


    const filterUnwanted = (arr) => {
        const required = arr.filter(el => {
        return el.uuid && el.komoditas && el.tgl_parsed;
        });
        return required;
    };
    
    useEffect(() => {
        store.read("list").then((data) => {
            setIsLoading(false);
            setData(filterUnwanted(data));
            setIsTotal(filterUnwanted(data).length);
        });
    }, []);

    useEffect(() => {
        const keyPress = (e) => {
            setIsLoading(true);
            if (e.code === "Enter" || e.code === "NumpadEnter") {
            //   console.log(inputSearchRef.current.value);
              if (inputSearchRef.current.value === "" || inputSearchRef.current.value === undefined) {
                store.read("list").then(data => {
                    setIsLoading(false);
                    setData(filterUnwanted(data));
                    setIsTotal(filterUnwanted(data).length);
                });   
              } else {
                store.read("list", {search:{komoditas:`${inputSearchRef.current.value}`}}).then(data => {
                    setIsLoading(false);
                    setData(filterUnwanted(data));
                    setIsTotal(filterUnwanted(data).length);
                });   
              }
            }
        };
        document.addEventListener("keydown", keyPress);
        return () => {
            document.removeEventListener("keydown", keyPress);
        };

    }, []);

    useEffect(()=>{
        const handleSelect = (eventKey) => {
            setIsLoading(true);
            if(eventKey === "1") {
                store.read("list").then((data) => {
                    let sortedData = [...data].sort((a, b) => a.price - b.price);
                    setIsLoading(false);
                    setData(filterUnwanted(sortedData));
                    setIsTotal(filterUnwanted(sortedData).length);
                });
            } else if(eventKey === "2") {
                store.read("list").then((data) => {
                    let sortedData = [...data].sort((a, b) => b.price - a.price);
                    setIsLoading(false);
                    setData(filterUnwanted(sortedData));
                    setIsTotal(filterUnwanted(sortedData).length);
                });
            } else if(eventKey === "3") {
                store.read("list").then((data) => {
                    let sortedData = [...data].sort((a, b) => a.size - b.size);
                    setIsLoading(false);
                    setData(filterUnwanted(sortedData));
                    setIsTotal(filterUnwanted(sortedData).length);
                });
            } else {
                store.read("list").then((data) => {
                    let sortedData = [...data].sort((a, b) => b.size - a.size);
                    setIsLoading(false);
                    setData(filterUnwanted(sortedData));
                    setIsTotal(filterUnwanted(sortedData).length);
                });
            }
               
        }
        isMinMaxClick.current = handleSelect;
    },[]);

    return (
        
        <Fragment>
            <Container>
                <Navbar expand="lg" variant="light" bg="light" fixed="top" >
                    <Container className="header-container">
                        <Navbar.Brand href="#">
                            <img src={Logo} alt="logo"/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll" className="navbar-mobile-container">
                            <InputGroup className="d-flex input-container">
                                <InputGroup.Text className="search-input">
                                    <img src={SearchIcon} className="search-icon" alt="search-icon" width="24" height="24"/>
                                </InputGroup.Text>
                                <FormControl
                                    type="search"
                                    placeholder="Cari Komoditas"
                                    className="input-search"
                                    aria-label="Search"
                                    ref={inputSearchRef}
                                />
                            </InputGroup>

                            <Dropdown className="d-inline mx-2" onSelect={(e)=>isMinMaxClick.current(e)}>
                                <Dropdown.Toggle id="dropdown-autoclose-true" className="btn-sort">
                                Urutkan
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                <Dropdown.Item eventKey="1">Harga Terendah</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Harga Tertinggi</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Jumlah Terendah</Dropdown.Item>
                                <Dropdown.Item eventKey="4">Jumlah Tertinggi</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Navbar.Collapse>

                        
                    </Container>
                </Navbar>
                {isLoading ? (
                    <Skeleton/>
                ) : (
                    <Fragment>
                        <div className="wrapper-title">
                            <h1>List Harga</h1>
                            <p>{totalData} data ditemukan</p>
                        </div>
                        <div className="wrapper-action">
                            <Link to="/add">
                                <Button variant="outline-primary" className="btn-add">
                                    Tambah Data
                                </Button>
                            </Link>
                        </div>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Komoditas</th>
                                    <th>Provinsi</th>
                                    <th>Kota</th>
                                    <th>Jumlah</th>
                                    <th>Harga</th>
                                    <th>Tanggal Dibuat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isLoading && data.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <th>{key + 1}</th>
                                            <th>{item.komoditas}</th>
                                            <th className="capitalize">{item.area_provinsi}</th>
                                            <th className="capitalize">{item.area_kota}</th>
                                            <th>{item.size}</th>
                                            <th>{(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price))}</th>
                                            <th>{(new Date(item.tgl_parsed)).toLocaleDateString('id-ID', { year: '2-digit', month: 'short', day: '2-digit' })}</th>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Fragment>  
                )}
                
            </Container>
        </Fragment>   
    );
};

export default Pricelist;