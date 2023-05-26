import React from "react";
import { StateContext } from "kendo/src/context/state";
import { DataGridRow } from "kendo/src/components/data-grid/data-grid-row";

function timeConvert(date: string): Date {
  var miliseconds: any = date.replace(/(^.*\()|([+-].*$)/g, "");
  miliseconds = parseInt(miliseconds);
  return new Date(miliseconds);
}

async function getData(id?: string | number) {
  return fetch(
    `https://northwind.netcore.io/query/orders.json?customerId=${id}`,
    {
      cache: "force-cache",
    }
  )
    .then((resp) => resp.json())
    .then((json) => json.results);
}

export const MasterRow = async (props: any) => {
  const state = React.useContext(StateContext);
  const expanded = state?.expanded?.includes(props.id);
  const data = await Promise.resolve(getData(props.id));

  return (
    <>
      <DataGridRow {...props}></DataGridRow>
      {expanded && (
        <>
          <tr>
            <td colSpan={5}>
              <table style={{ width: "100%", background: "lightgray" }}>
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Shipped Date</th>
                    <th>Required Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any) => (
                    <tr key={item.id}>
                      <td>
                        <span>{item.shipAddress}</span>
                      </td>
                      <td>
                        <p>
                          {item.shippedDate &&
                            timeConvert(item.shippedDate).toDateString()}
                        </p>
                      </td>

                      <td>
                        <p>
                          {item.requiredDate &&
                            timeConvert(item.requiredDate).toDateString()}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </>
      )}
    </>
  );
};
