import {useCartContext} from "../../contexts/cartContext";
import Button from "react-bootstrap/Button";
import {Card, ListGroup} from "react-bootstrap";

export function CartItem(props) {
    const {item} = props;
    const {removeCart} = useCartContext();
    const {changeAmountCart} = useCartContext();


    return (
        <Card className={""}>
            <Card.Header className={"mb-0 text-4xl cartGridName text-center"}>
                <Card.Title>{item.name}</Card.Title>
            </Card.Header>

            <Card.Body>
                <Card.Img>

                </Card.Img>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item className={"d-flex justify-content-between"}>
                        <span>Aantal: </span>
                        <input className={"p-1 text-center text-2xl w-25"} type={"number"} min={"1"} style={{marginRight: "0"}}
                        value={item.amount}
                        onChange={(value) => changeAmountCart({...item, amount: value.target.value})}/>
                    </ListGroup.Item>
                    <ListGroup.Item className={"text-center"}>{item.price} Euro</ListGroup.Item>
                    <ListGroup.Item className={"text-center"}><p>{item.amount} voor {item.price * item.amount} euro</p></ListGroup.Item>
                </ListGroup>


            </Card.Body>
            <Card.Footer className={"text-center"}>
                <Button onClick={() => removeCart(item)}>
                    <span className={"text-4xl"}>Remove Item</span>
                </Button>
            </Card.Footer>


        </Card>
    )

}