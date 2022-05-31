import "./TableBlock.style.scss";

const TableBlock = ({ cameras, category }: any) => {
  return (
    <div className="table">
      <div>
        <h2 className="table-header-title" role="contentinfo">
          Cameras {category}
        </h2>
      </div>
      <div>
        <div className="table-header-column-names">
          <div className="webcam-row-number-title">Number</div>
          <div className="webcam-row-name-title">Name</div>
          <div className="webcam-row-latitude-title">Latitude</div>
          <div className="webcam-row-longiitude-title">Longitude</div>
        </div>
      </div>
      <div className="table-body">
        {cameras &&
          cameras.map((webcam: any) => {
            return (
              <div key={webcam.id} className="webcam-row">
                <div className="webcam-row-number-value">{webcam.Camera}</div>
                <div className="webcam-row-name-value">{webcam.location}</div>
                <div className="webcam-row-latitude-value">
                  {webcam.Latitude}
                </div>
                <div className="webcam-row-longitude-value">
                  {webcam.Longitude}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TableBlock;
