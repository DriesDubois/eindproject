import {collection,updateDoc} from 'firebase/firestore'
import {firestoreDB} from "../utils/firebase";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Shirts} from "../components/Shirts";
import {CardGroup, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {filterItems} from "../utils/Filters";
import Button from "react-bootstrap/Button";

const firestoreConverter = {
    toFirestore: function (dataInApp) {
        return {
            name: dataInApp.name,
            price:Number(dataInApp.price),
            description: dataInApp.description,
        }
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return {...data, id: snapshot.id, ref: snapshot.ref}
    }
};

function ItemFormEdit(props) {
    const {item, onClose, onSaveItem} = props;
    const [itemToEdit, setItemToEdit] = useState({...item});
    return (
        <Modal show={!!item} onHide={onClose}>
            <Modal.Header closeButton>
                <h3 className="ms-2">Edit item</h3>
            </Modal.Header>
            <div className="m-3 mt-0">
                <div className="d-flex justify-content-end fs-6 fw-light">
                    {item.id}
                </div>
                <Form>
                    <Form.Label className="mt-2 ms-1">name:</Form.Label>
                    <Form.Control
                        value={itemToEdit.name}
                        onChange={e => setItemToEdit({...itemToEdit, name: e.target.value})}/>
                    <Form.Label className="mt-2 ms-1">price:</Form.Label>
                    <Form.Control
                        value={itemToEdit.price}
                        onChange={e => setItemToEdit({...itemToEdit, price: Number(e.target.value)})}/>
                    <Form.Label className="mt-2 ms-1">description:</Form.Label>
                    <Form.Control
                        value={itemToEdit.description}
                        onChange={e => setItemToEdit({...itemToEdit, description: e.target.value})}/>
                </Form>
                <div className="d-flex justify-content-center p-2">
                    <Button className="m-1" size="lg" onClick={() => onClose()}>cancel</Button>
                    <Button className="m-1" size="lg" onClick={async () => {
                        if (await onSaveItem(itemToEdit)) onClose();
                    }}>save</Button>
                </div>
            </div>
        </Modal>
    );
}

export function StorePage(){
    const collectionRef = collection(firestoreDB, 'Test-Items').withConverter(firestoreConverter);
    const [shortSleeves, setShortSleeves] = useState(undefined);
    const [searchInput, setSearchInput] = useState("");
    const [maxPriceInput, setMaxPriceInput] = useState("");
    const [values, loading, error] = useCollectionData(collectionRef);
    const [itemSelected, setItemSelected] = useState();
    console.log({values, loading, error});

    function editItem(item) {
        console.log(`editing item ${item.name}`);
        setItemSelected(item);
    }

    async function editItemSave(item) {
        try {
            console.log(item)
            await updateDoc(item.ref, item);
            console.log(`save item ${item.name} DONE`);
            return true;
        } catch {
            console.log(`ERROR save item ${item.name} NOT done`);
        }
        return false;
    }

    return <div>
        <h1>Webshop</h1>
        <label htmlFor="search">search: </label>
        <input id="search" value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
        <label htmlFor="search">max Price: </label>
        <input id="search" type="number" min="0" max="100" value={maxPriceInput} onChange={e => setMaxPriceInput(e.target.value)}/>
        <Form className="mx-3">
            <Form.Label>short sleeves</Form.Label><br/>
            <Form.Check inline checked={shortSleeves===false} label="lange mouwen" name="shortSleeves"
                        type="radio" id="shortSleeves-0"
                        onChange={() => setShortSleeves(false)}/>
            <Form.Check inline checked={shortSleeves===true} label="korte mouwen" name="shortSleeves"
                        type="radio" id="shortSleeves-1"
                        onChange={() => setShortSleeves(true)}/>
            <Form.Check inline checked={shortSleeves===undefined} label="geen voorkeur" name="shortSleeves"
                        type="radio" id="shortSleeves-2"
                        onChange={() => setShortSleeves(undefined)}/>
        </Form>
        <div>
            <>
                {itemSelected && <ItemFormEdit
                    item={itemSelected}
                    onClose={() => setItemSelected()}
                    onSaveItem={editItemSave}/>}
            </>
        </div>
        <CardGroup><Shirts shirts={filterItems(values,searchInput,maxPriceInput,shortSleeves)}
                           onEditItem={editItem}
        /></CardGroup>

    </div>
}