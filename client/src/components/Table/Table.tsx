import { Webcams } from "../../App";
import "./Table.style.scss";
import TableBlock from "./TableBlock";
// I have no idea why the type <React.FC<Webcams> is not accepted here
const Table: any = ({
  cameras3,
  cameras5,
  cameras35,
  camerasOther,
}: Webcams) => {
  return (
    <div className="webcam-container">
      <div className="webcam-container-one">
        <TableBlock cameras={cameras3} category={3} />
        <TableBlock cameras={cameras5} category={5} />
      </div>
      <div className="webcam-container-two">
        <TableBlock cameras={cameras35} category={"3 & 5"} />
        <TableBlock cameras={camerasOther} category={"Other"} />
      </div>
    </div>
  );
};

export default Table;
