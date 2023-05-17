import { DataGridRow } from "./data-grid-row";
import DataGridMasterRow from "./master-row";

const DataGridBody = async (props: any) => {
  const data = props.data;

  return (
    <div>
      <table>
        <tbody>
          {data.map((entry: any) => (
            <DataGridRow {...entry} key={entry.id}>
              {/* @ts-ignore shut up next */}
              <DataGridMasterRow id={entry.id} />
            </DataGridRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGridBody;
