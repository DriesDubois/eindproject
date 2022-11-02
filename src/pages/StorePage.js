import {collection} from 'firebase/firestore'
import {firestoreDB} from "../services/firebase";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Shirts} from "../components/Shirts";
import {CardGroup} from "react-bootstrap";

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
    const [values, loading, error] = useCollectionData(collectionRef);
    console.log({values, loading, error});


    return <div>
        <h1>Webshop</h1>
        <CardGroup><Shirts shirts={values}></Shirts></CardGroup>

    </div>
}