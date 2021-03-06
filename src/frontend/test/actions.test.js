import * as actions from '../actions'
import { SET_CELL_COLOR } from "../actionTypes";

describe('color changing actions', () => {
  it('should change a cell to cadetblue', () => {
    const cellId = 1;
    const cell = { id: cellId, color: "white" };
    expect(actions.setCellColor(cellId, "cadetblue")).toEqual({
      type: SET_CELL_COLOR,
      value: {
        id: cellId,
        color: "cadetblue",
      }
    })
  });

  it('should change a cell to white', () => {
    const cellId = 1;
    const cell = { id: cellId, color: "cadetblue" };
    expect(actions.setCellColor(cellId, "white")).toEqual({
      type: SET_CELL_COLOR,
      value: {
        id: cellId,
        color: "white",
      }
    })
  });
});

