import './popup.css';

export default function Popup() {
  return (
    <div className="App">
      <h1>Browser Extension</h1>
      <div className="Card">
        <div className="CardField">
          <div className="FieldLabel">
            <span className="FieldTitle">Title</span>
            <span className="FieldStatus">
              {"Status"}
            </span>
          </div>
          <div className="FieldDescription">
            The title of the card field
          </div>
        </div>

        <div className="CardField">
          <div className="FieldLabel">
            <span className="FieldTitle">Next Field Title</span>
            <span className="FieldStatus Ok">
              {"Ok"}
            </span>
          </div>
          <div className="FieldDescription">
            The title of the next field
          </div>
        </div>

        <div className="CardField">
          <div className="FieldLabel">
            <span className="FieldTitle">Error Field Title</span>
            <span className="FieldStatus Error">
              {"Error"}
            </span>
          </div>
          <div className="FieldDescription">
            The title of the error field
          </div>
        </div>
      </div>
    </div>
  );
}
