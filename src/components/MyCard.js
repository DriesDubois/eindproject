import * as PropTypes from "prop-types";
import {Card} from "react-bootstrap";


MyCard.propTypes = {
    Section: PropTypes.shape({
        element: PropTypes.object,
    })
}

export function MyCard(props) {
    const {children} = props;

    return <Card>
        {children}
    </Card>;
}