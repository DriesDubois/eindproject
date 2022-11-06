import {collection, updateDoc, deleteDoc, addDoc} from 'firebase/firestore'
import {auth, firestoreDB} from "../utils/firebase";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Shirts} from "../components/Shirts";
import {CardGroup, Col, Form, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import {filterItems} from "../utils/Filters";
import Button from "react-bootstrap/Button";
import {useAuthValue} from "../contexts/AuthContext";
import Container from "react-bootstrap/Container";

const firestoreConverter = {
    toFirestore: function (dataInApp) {
        return {
            name: dataInApp.name,
            price: Number(dataInApp.price),
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

function ItemFormAdd(props) {
    const {onSaveItem, onClose} = props;
    const [itemToAdd, setItemToAdd] = useState({name: "item name", price: 0, description: "description here"});
    return (
        <Modal show={!!itemToAdd} onHide={onClose}>
            <Modal.Header closeButton>
                <h3 className="ms-2">Add item</h3>
            </Modal.Header>
            <div className="m-3 mt-0">
                <Form>
                    <Form.Label className="mt-2 ms-1">name:</Form.Label>
                    <Form.Control
                        value={itemToAdd.name}
                        onChange={e => setItemToAdd({...itemToAdd, name: e.target.value})}/>
                    <Form.Label className="mt-2 ms-1">price:</Form.Label>
                    <Form.Control
                        value={itemToAdd.price}
                        onChange={e => setItemToAdd({...itemToAdd, price: Number(e.target.value)})}/>
                    <Form.Label className="mt-2 ms-1">description:</Form.Label>
                    <Form.Control
                        value={itemToAdd.description}
                        onChange={e => setItemToAdd({...itemToAdd, description: e.target.value})}/>
                </Form>
                <div className="d-flex justify-content-center p-2">
                    <Button className="m-1" size="lg" onClick={() => onClose()}>cancel</Button>
                    <Button className="m-1" size="lg" onClick={async () => {
                        if (await onSaveItem(itemToAdd)) onClose();
                    }}>save</Button>
                </div>
            </div>
        </Modal>
    );
}


export function StorePage() {
    const collectionRef = collection(firestoreDB, 'Test-Items').withConverter(firestoreConverter);
    const [searchInput, setSearchInput] = useState("");
    const [addItemForm, setAddItemForm] = useState(false);
    const [maxPriceInput, setMaxPriceInput] = useState("");
    const [values, loading, error] = useCollectionData(collectionRef);
    const [itemSelected, setItemSelected] = useState();
    console.log({values, loading, error});
    const {adminList} = useAuthValue()

    function editItem(item) {
        console.log(`editing item ${item.name}`);
        setItemSelected(item);
    }


    async function deleteItem(item) {
        try {
            await deleteDoc(item.ref);
            console.log(`delete item ${item.name} done`)
        } catch {
            console.log(`ERROR delete item ${item.name} NOT done`)
        }
    }

    async function addItemSave(item) {
        try {
            await addDoc(collectionRef, item);
            console.log("add item done")
        } catch {
            console.log("ERROR add item NOT done")
        }
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

    return <div className={"mb-5"}>
        <h1 className={"text-center"}>Webshop</h1>
        {adminList.includes(auth.currentUser?.email) &&
            <Button onClick={() => setAddItemForm(!addItemForm)}>add item</Button>}

        <Container className={"d-flex align-items-center"}>
            <Row className={"mt-5"}>
                <Col xs lg="2" className={"d-flex flex-column text-align-left"}>
                    <label htmlFor="search">search: </label>
                    <input id="search" value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
                    <label htmlFor="search">max Price: </label>
                    <input id="search" type="number" min="0" max="100" value={maxPriceInput}
                           onChange={e => setMaxPriceInput(e.target.value)}/>
                    <div>
                        {itemSelected && <ItemFormEdit
                            item={itemSelected}
                            onClose={() => setItemSelected()}
                            onSaveItem={editItemSave}/>}
                    </div>
                    <div>
                        {addItemForm && <ItemFormAdd
                            onSaveItem={addItemSave}
                            onClose={() => setAddItemForm(false)}/>}
                    </div>
                </Col>

                <Col md="auto">
                    <CardGroup><Shirts shirts={filterItems(values, searchInput, maxPriceInput)}
                                       onEditItem={editItem}
                                       onDeleteItem={deleteItem
                                       }
                    /></CardGroup>
                </Col>
            </Row>
        </Container>

    </div>
}