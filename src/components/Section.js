import * as PropTypes from "prop-types";


Section.propTypes = {
    Section: PropTypes.shape({
        list: PropTypes.array,
        title: PropTypes.string,
    })
}

export function Section(props) {
    const {children, title} = props;

    return (
        <div style={{}} className="d-flex justify-content-center gap-5">
            <h1 style={{textAlign: "center", marginBottom: "5rem"}}>{title}</h1>
            <div className="d-flex flex-row gap-5 flex-wrap m-5">
                {children}
            </div>
        </div>
    )
}