import {collection,getFirestore} from 'firebase/firestore'
import {firestoreDB} from "../utils/firebase";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Shirts} from "../components/Shirts";
import {CardGroup, Form} from "react-bootstrap";
import {useState} from "react";
import {filterItems} from "../utils/Filters";

const firestoreConverter = {
    toFirestore: function (dataInApp) {
        return {
            name: dataInApp.name
        }
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return {...data, id: snapshot.id, ref: snapshot.ref}
    }
};

export function StorePage(){
    const collectionRef = collection(firestoreDB, 'Test-Items').withConverter(firestoreConverter);
    const [shortSleeves, setShortSleeves] = useState(undefined);
    const [searchInput, setSearchInput] = useState("");
    const [maxPriceInput, setMaxPriceInput] = useState("");
    const [values, loading, error] = useCollectionData(collectionRef);
    console.log({values, loading, error});


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
        <CardGroup><Shirts shirts={filterItems(values,searchInput,maxPriceInput,shortSleeves)} ></Shirts></CardGroup>

    </div>
}