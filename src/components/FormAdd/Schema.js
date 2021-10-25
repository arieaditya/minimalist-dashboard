// let generateSize = () => {
//     store.read("option_size").then((data) => {
//         let totalSize = data.map((item) => {
//             return item.size;
//             console.log()
//         })
//     });
//     return generateSize();
// }

let generateID = () => {
    let uuid = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return uuid() + uuid() + '-' + uuid() + '-' + uuid() + '-' + uuid() + '-' + uuid() + uuid() + uuid();
}

let generateTimestamp = () => {
    let timestamp = () => {
        return Math.floor(Date.now() / 1000);
    }
    return timestamp();
}

let Schema = {
    "uuid": {
        "type": "text",
        "required": true,
        "defaultValue": generateID(),
        "disabled": true
    },
    "komoditas": {
        "type": "text",
        "required": true,
        "placeholder": "Nama komoditas, contohnya 'Lele', 'Ikan Mujair', dsb"
    },
    "area_provinsi": {
        "type": "select",
        "required": true,
        "options": [
            {
                "value": "BANTEN",
                "label": "BANTEN"
            }
        ]
    },
    "area_kota": {
        "type": "select",
        "required": true,
        "options": [
            {
                "value": "SERANG",
                "label": "SERANG"
            }
        ]
    },
    "size": {
        "type": "number",
        "required": true
    },
    "price": {
        "type": "number",
        "required": true
    },
    "tgl_parsed": {
        "type": "date",
        "format": "dd MMMM yyyy",
        "required": true
    },
    "timestamp": {
        "type": "text",
        "required": true,
        "defaultValue": generateTimestamp(),
        "disabled": true
    },
    "Save": {
        "type": "submit",
    }
}

export default Schema;

