const assert = require("chai").assert;
const cut = require("../src/cutLib");
const { getSplittedFields, splitFields, getField } = cut;

describe("cutFields", () => {
  it("should give an array of string that contains specified field values", () => {
    let cutInfo = {
      field: 2,
      lines: ["123  123", "123  124"]
    };
    let actual = getSplittedFields(cutInfo);
    let expected = ["123", "124"];
    assert.deepStrictEqual(actual, expected);

    cutInfo = {
      field: 2,
      lines: ["123  123  123", "123  124  123"]
    };
    actual = getSplittedFields(cutInfo);
    expected = ["123", "124"];
    assert.deepStrictEqual(actual, expected);
  });

  it("should give the line when the separator is not present", () => {
    const cutInfo = {
      field: 2,
      lines: ["123", "123"]
    };
    const actual = getSplittedFields(cutInfo);
    const expected = ["123", "123"];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getCutFields", () => {
  it("should give the line when the separator is not present", () => {
    const field = 2;
    const fieldContents = [];
    const line = "123 123";
    const actual = splitFields(field, fieldContents, line);
    assert.deepStrictEqual(actual, ["123 123"]);
  });
  it("should give the field contents when the separator is present", () => {
    const field = 2;
    const fieldContents = [];
    const line = "123  124";
    const actual = splitFields(field, fieldContents, line);
    assert.deepStrictEqual(actual, ["124"]);
  });
});

describe("getField", () => {
  it("should give an object containing the field value", () => {
    const cmdLineArg = ["node", "-f", "3"];
    assert.deepStrictEqual(getField(cmdLineArg), { field: "3" });
  });
});