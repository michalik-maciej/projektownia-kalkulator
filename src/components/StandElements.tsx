import { isEmpty, map } from "lodash/fp"
import { v1 } from "uuid"

import {
  calculateBacks,
  calculateFeet,
  calculateLegs,
  calculateShelves,
} from "../utils"
import { Foot, Leg, Shelf } from "../types"

interface Params {
  foot: Foot
  leg: Leg
  shelf: Shelf
  shelvesPerModule: number
}

export const StandElements = ({
  foot,
  leg,
  shelf,
  shelvesPerModule,
}: Params) => {
  const feet = calculateFeet({ foot })
  const legs = calculateLegs({ leg })
  const { shelves, supports } = calculateShelves({
    shelf,
    shelvesPerModule,
  })

  const backs = calculateBacks({ height: leg.h, width: shelf.w })

  return (
    <>
      <div className="text-xl py-8 mt-4">Rozpiska:</div>
      <table className="table-auto mx-8">
        <thead>
          <tr>
            <th>Element</th>
            <th>Ilość</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`Stopa ${foot?.w}`}</td>
            <td>{feet.number}</td>
          </tr>
          <tr>
            <td>{`Profil ${leg?.h}`}</td>
            <td>{legs.number}</td>
          </tr>
          <tr>
            <td>{`Półka ${shelf?.w} / ${shelf?.d}`}</td>
            <td>{shelves.number}</td>
          </tr>
          {!isEmpty(supports) && (
            <tr>
              <td>{`Wspornik ${shelf?.d}`}</td>
              <td>{supports.number}</td>
            </tr>
          )}
          {map(
            ({ element: { h, w }, number }) => (
              <tr key={v1()}>
                <td>{`Plecy ${w} / ${h}`}</td>
                <td>{number}</td>
              </tr>
            ),
            backs.order
          )}
        </tbody>
      </table>
    </>
  )
}
