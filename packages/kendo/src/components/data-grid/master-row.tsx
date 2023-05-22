import React from "react";

export type DataGridMasterRowProps = {
  id?: string | number;
  fetchAdditionalData?: any;
};
function timeConvert(date: string): Date {
  var miliseconds: any = date.replace(/(^.*\()|([+-].*$)/g, "");
  miliseconds = parseInt(miliseconds);
  return new Date(miliseconds);
}

export default async function DataGridMasterRow(props: DataGridMasterRowProps) {
  const orders = await props.fetchAdditionalData(props.id);

  return (
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
            {orders.map((item: any) => (
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
  );
}
