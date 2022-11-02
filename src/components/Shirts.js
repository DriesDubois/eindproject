import {Section} from "./Section";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import {auth} from "../utils/firebase";
import {useAuthValue} from "../contexts/AuthContext";



export function Shirts(props) {
    const {shirts,title,onEditItem} = props;
    if (!shirts) return;
    return (
        <Section title={title}>
            {shirts.map(s => <Shirt onEditItem={onEditItem} key={s.id} shirt={s}/>)}
        </Section>
    )
}

export function Shirt(props) {
    let {shirt,onEditItem} = props;
    const {adminList} = useAuthValue()


    return (
        <Card style={{width:"350px"}}>
            <Card.Header as="h5" style={{textAlign:"center"}}>{shirt.name}</Card.Header>
            <Card.Title></Card.Title>
            <Card.Body>
                {shirt.price && <p className="text-center">{shirt.price} </p>}
                {shirt.description && <p className="text-center">{shirt.description} </p>}
            </Card.Body>
            {shirt.image && <Card.Img style={{maxWidth: "300px"}} variant="bottom" src={shirt.image}/>}
            {adminList.includes(auth.currentUser?.email) && <Button onClick={() => onEditItem(shirt)} variant="info">Edit</Button>}
        </Card>
    )

}
