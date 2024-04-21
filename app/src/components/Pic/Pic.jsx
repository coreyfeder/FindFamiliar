import "./Pic.css"

export default function Pic(props) {
    return (
        <div className="Pic">
            Pictograph passed in props
            <img src={props.pic} alt="" />
        </div>
    );
}
