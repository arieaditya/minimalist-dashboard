import { useEffect, useState, useRef, Fragment } from "react";
import { 
    Table,
    InputGroup,
    Container,
    FormControl,
    Navbar,
    Dropdown
} from 'react-bootstrap';
import SteinStore from "stein-js-client";
import "@fontsource/sarabun";
import "./style.scss";
import SearchIcon from "../../assets/icons/magnifier.svg";
import Logo from "../../assets/logo.svg"

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

const Pricelist = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalData, setIsTotal] = useState('');
    const inputSearchRef = useRef(null);

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
            console.log(filterUnwanted(data));
        });
    }, []);

    useEffect(() => {
        const keyPress = (e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              console.log(inputSearchRef.current.value);
              if (inputSearchRef.current.value === "" || inputSearchRef.current.value === undefined) {
                store.read("list").then(data => {
                    setIsLoading(false);
                    setData(filterUnwanted(data));
                    setIsTotal(filterUnwanted(data).length);
                });   
              } else {
                store.read("list", { search: { komoditas: `${inputSearchRef.current.value}` } }).then(data => {
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

    
    return (
        
        <Fragment>
            <Container>
                <Navbar expand="lg" variant="light" bg="light" fixed="top" >
                    <Container>
                        <Navbar.Brand href="#">
                            <img src={Logo} alt="logo"/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                            <InputGroup className="d-flex pl-lg-100">
                                <InputGroup.Text className="search-input">
                                    <img src={SearchIcon} className="search-icon" alt="search-icon" width="24" height="24"/>
                                </InputGroup.Text>
                                <FormControl
                                    type="search"
                                    placeholder="Cari Komoditas"
                                    className="input-search"
                                    aria-label="Search"
                                    // value={inputSearch}
                                    // onKeyDown={keyPress}
                                    ref={inputSearchRef}
                                />
                            </InputGroup>

                            <Dropdown className="d-inline mx-2">
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                Pilih Provinsi
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className="d-inline mx-2">
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                Urutkan
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                <Dropdown.Item href="#">Berdasarkan Abjad (A-Z)</Dropdown.Item>
                                <Dropdown.Item href="#">Harga Terendah</Dropdown.Item>
                                <Dropdown.Item href="#">Tanggal Dibuat</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Navbar.Collapse>

                        
                    </Container>
                </Navbar>
           
                <div className="wrapper-title">
                    <h1 className="page-title">List Harga</h1>
                    <p>{totalData} data ditemukan</p>
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
                        {!isLoading &&
                        data.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <th>{key + 1}</th>
                                    <th>{item.komoditas}</th>
                                    <th>{item.area_provinsi}</th>
                                    <th>{item.area_kota}</th>
                                    <th>{item.size}</th>
                                    <th>{item.price}</th>
                                    <th>{(new Date(item.tgl_parsed)).toLocaleDateString('id-ID', { year: '2-digit', month: 'short', day: '2-digit' })}</th>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </Fragment>   
    );
};

export default Pricelist;