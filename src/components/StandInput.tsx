import { ChangeEvent } from "react"
import { map } from "lodash/fp"

import "../App.css"
import { Foot, Leg, Shelf } from "../types"

interface Props {
  footOptions: Foot[]
  handleSetFoot: (arg: ChangeEvent<HTMLSelectElement>) => void
  handleSetLeg: (arg: ChangeEvent<HTMLSelectElement>) => void
  handleSetShelf: (arg: ChangeEvent<HTMLSelectElement>) => void
  handleSetShelfNumber: (arg: ChangeEvent<HTMLInputElement>) => void
  handleSetWidth: (arg: ChangeEvent<HTMLSelectElement>) => void
  legOptions: Leg[]
  shelf: Shelf
  shelfOptions: Shelf[]
  shelvesPerModule: number
  width: number
  widthOptions: number[]
}

export const StandInput = ({
  footOptions,
  handleSetFoot,
  handleSetLeg,
  handleSetShelf,
  handleSetShelfNumber,
  handleSetWidth,
  legOptions,
  shelf,
  shelfOptions,
  shelvesPerModule,
  width,
  widthOptions,
}: Props) => {
  return (
    <>
      <div className="text-xl py-8">Regał {width} mm:</div>
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
