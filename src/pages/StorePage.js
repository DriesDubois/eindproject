import {collection, updateDoc, deleteDoc, addDoc} from 'firebase/firestore'
import {auth, firestoreDB, storage} from "../utils/firebase";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Shirts} from "../components/Shirts";
import {CardGroup, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {filterItems} from "../utils/Filters";
import Button from "react-bootstrap/Button";
import {useAuthValue} from "../contexts/AuthContext";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const firestoreConverter = {
    toFirestore: function (dataInApp) {
        return {
            name: dataInApp.name,
            price: Number(dataInApp.price),
            description: dataInApp.description,
            imageURL: dataInApp.imageURL
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
    const [file, setFile] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [progresspercent, setProgresspercent] = useState(0);

    const [itemToAdd, setItemToAdd] = useState({
        name: "item name",
        price: 0,
        description: "description here",
        imageURL: ""
    });

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleSubmit = () => {
        if (!file) {
            alert("Please choose a file first!")
        }
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                });
            }
        );
    }


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
                <div>
                    <input type='file' onChange={handleChange} accept="/image/*"/>
                    <Button onClick={handleSubmit} type='submit'>Upload</Button>
                    {
                        !imgUrl &&
                        <div className='outerbar'>
                            <div className='innerbar' style={{width: `${progresspercent}%`}}>{progresspercent}%</div>
                        </div>
                    }
                    {
                        imgUrl &&
                        <>
                            <img src={imgUrl} alt='uploaded file' height={200}/>
                            <Button onClick={() => setItemToAdd({...itemToAdd, imageURL: imgUrl})}
                                    type='submit'>Save</Button>
                        </>

                    }
                </div>
                <div className="d-flex justify-content-center p-2">
                    <Button className="m-1" size="lg" onClick={() => onClose()}>cancel</Button>
                    <Button className="m-1" size="lg" onClick={async () => {
                        // cant't call this here for yet to be determined reason
                        // setItemToAdd({...itemToAdd, imageURL: imgUrl});
                        if (await onSaveItem(itemToAdd)) onClose();
                        console.log(itemToAdd, imgUrl);
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
            console.log(`add ${item.name} done`)
            return true;
        } catch {
            console.log("ERROR add item NOT done")
        }
        return false;
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


        <div className={"d-flex flex-row"}>
            <div className={"d-flex flex-column p-3 align-items-left gap-3"}>
                {adminList.includes(auth.currentUser?.email) &&
                    <Button onClick={() => setAddItemForm(!addItemForm)}>add item</Button>}
                <div className={"d-flex justify-content-between"}>
                    <label htmlFor="search">search: </label>
                    <input style={{maxWidth: "150px"}} id="search" value={searchInput}
                           onChange={e => setSearchInput(e.target.value)}/>
                </div>

                <div className={"d-flex justify-content-between"}>
                    <label htmlFor="search">max Price: </label>
                    <input style={{maxWidth: "75px"}} id="search" type="number" min="0" max="100" value={maxPriceInput}
                           onChange={e => setMaxPriceInput(e.target.value)}/>
                </div>

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
            </div>

            <div>
                <CardGroup><Shirts shirts={filterItems(values, searchInput, maxPriceInput)}
                                   onEditItem={editItem}
                                   onDeleteItem={deleteItem
                                   }
                /></CardGroup>
            </div>
        </div>


    </div>
}