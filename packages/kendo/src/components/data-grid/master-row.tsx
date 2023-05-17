import React from "react";

export type DataGridMasterRowProps = {
  id?: string | number;
};

const fetchData = async (id?: string | number) => {
  const res = await fetch(
    `http://localhost:3000/api/users/${id}` /* , {
    cache: "no-store",
  } */
  );

  return res.json();
};

export default async function DataGridMasterRow(props: DataGridMasterRowProps) {
  const itemData = fetchData(props.id);

  const [item] = await Promise.all([itemData]);

  return (
    <tr>
      <td colSpan={5}>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr key={item.id}>
              <td>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  width={40}
                  src={item.avatar}
                  alt={`Avatar for ${item.username}`}
                />
              </td>
              <td>
                <h3>{item.name}</h3>
                <p>{item.jobTitle}</p>
              </td>
              <td>
                <p>{item.company}</p>
                <p>{item.city}</p>
              </td>

              <td>
                <p>{item.email}</p>
                <p>{item.phone}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
