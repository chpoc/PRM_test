import { expect } from "chai";
import { sort } from "../src/quickSort";

describe("Quick sort", () => {
  it("Returns a sorted array [0]", () => {
    const result = sort([0]);
    expect(result).to.eql([0]);
  });

  it("Sorts [7, 0, 6, 1, 5, 2, 4, 3] into [0, 1, 2, 3, 4, 5, 6, 7]", () => {
    const result = sort([7, 0, 6, 1, 5, 2, 4, 3]);
    expect(result).to.eql([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it("Returns the same pre sorted array [0, 1, 2, 3]", () => {
    const result = sort([0, 1, 2, 3]);
    expect(result).to.eql([0, 1, 2, 3]);
  });
});
