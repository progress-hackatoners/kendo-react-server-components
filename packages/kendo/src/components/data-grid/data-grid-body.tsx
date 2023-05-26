import React from "react";
import { DataGridRow } from "./data-grid-row";

const DataGridBody = async (props: any) => {
  const { Row = DataGridRow } = props;
  const data = await Promise.resolve(props.data);

  return (
    <div>
      <table>
        <tbody>
          {data.map((entry: any) => (
            <Row {...entry} id={entry.id} key={`row-${entry.id}`} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGridBody;
