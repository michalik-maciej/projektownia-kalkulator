import { useState } from "react"
import { map, range } from "lodash/fp"

export const Table = () => {
  const [rows, setRows] = useState(1)

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>col 1</th>
            <th>col 2</th>
            <th> col 3</th>
          </tr>
        </thead>
        <tbody>
          {map(
            (row) => (
              <tr>
                <td>{row}.1</td>
                <td>{row}.2</td>
                <td>{row}.3</td>
              </tr>
            ),
            range(1, rows + 1)
          )}
        </tbody>
      </table>
      <button type="button" onClick={() => setRows((prev) => prev + 1)}>
        Add row
      </button>
    </>
  )
}
