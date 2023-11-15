import { ChangeEvent } from "react"
import { find, map, toInteger, toString } from "lodash/fp"

import "../App.css"
import { getShelf } from "../products"
import {
  Foot,
  Leg,
  Shelf,
  SetFoot,
  SetLeg,
  SetShelf,
  SetNumber,
} from "../types"

interface Props {
  footOptions: Foot[]
  setFoot: SetFoot
  setLeg: SetLeg
  setShelf: SetShelf
  setShelfNumber: SetNumber
  setWidth: SetNumber
  legOptions: Leg[]
  shelf: Shelf
  shelfOptions: Shelf[]
  shelvesPerModule: number
  width: number
  widthOptions: number[]
}

export const StandInput = ({
  footOptions,
  legOptions,
  setFoot,
  setLeg,
  setShelf,
  setShelfNumber,
  setWidth,
  shelf,
  shelfOptions,
  shelvesPerModule,
  width,
  widthOptions,
}: Props) => {
  const handleSetWidth = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const newShelves = getShelf(toInteger(value))
    const newShelf = find(({ d }) => d === shelf?.d, newShelves)
    setShelf(newShelf || newShelves[0])
    setWidth(toInteger(value))
  }

  const handleSetFoot = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const newFoot = find(({ w }) => toString(w) === value, footOptions)
    setFoot(newFoot || footOptions[0])
  }

  const handleSetLeg = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const newLeg = find(({ h }) => toString(h) === value, legOptions)
    setLeg(newLeg || legOptions[0])
  }

  const handleSetShelf = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const newShelf = find(({ d }) => toString(d) === value, shelfOptions)
    setShelf(newShelf || shelfOptions[0])
  }

  const handleSetShelfNumber = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setShelfNumber(toInteger(value))
  }

  return (
    <>
      <div className="text-xl py-8">Regał {width} cm:</div>
      <div className="flex flex-col gap-6 px-8">
        <label>
          Szerokość:
          <select name="width" value={width} onChange={handleSetWidth}>
            {map(
              (width) => (
                <option key={width} value={width}>
                  {width}
                </option>
              ),
              widthOptions
            )}
          </select>
        </label>

        <label>
          Wysokość:
          <select name="leg" onChange={handleSetLeg}>
            {map(
              ({ h }) => (
                <option key={`leg-${h}`} value={h}>
                  {h}
                </option>
              ),
              legOptions
            )}
          </select>
        </label>

        <label>
          Półki:
          <select name="shelf" value={shelf?.d} onChange={handleSetShelf}>
            {map(
              ({ d, w }) => (
                <option key={`shelf-${d}`} value={d}>
                  {d} / {w}
                </option>
              ),
              shelfOptions
            )}
          </select>
          <div className="pr-4">
            x{" "}
            <input
              type="number"
              onChange={handleSetShelfNumber}
              defaultValue={shelvesPerModule}
              min={1}
              max={10}
            />
          </div>
        </label>

        <label>
          Stopa:
          <select name="foot" onChange={handleSetFoot}>
            {map(
              ({ w }) => (
                <option key={`foot-${w}`} value={w}>
                  {w}
                </option>
              ),
              footOptions
            )}
          </select>
        </label>
      </div>
    </>
  )
}
