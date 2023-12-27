import "../styles/CssPseudoClass.css";

export default function CssPseudoClass() {
  return (
    <>
      {/* first-child vs first-of-type */}
      <h3>first-child vs first-of-type</h3>
      <div className="parent">
        <p>First Paragraph</p>
        <p>Second Paragraph</p>
        <span>First Span</span>
        <p>Third Paragraph</p>
      </div>
      <div style={{ height: "50px" }} />
      <h3>not</h3>
      <div className="parent2">
        <div>item1</div>
        <div>item2</div>
        <div className="not-item">item3</div>
        <div>item4</div>
      </div>
      <div style={{ height: "50px" }} />
      <h3>where vs is</h3>
      <article>
        <h3>Header3</h3>
        <h4>Header4 - where</h4>
        <h6>Header6 - where</h6>
        <p>Paragraph - where, is</p>
      </article>
      <div style={{ height: "50px" }} />
      <h3>has</h3>
      <div className="parent3">
        <div className="has-div">
          <p>Paragraph</p>
          <h6>Header6</h6>
        </div>
        <h6>Header6</h6>
      </div>
    </>
  );
}
