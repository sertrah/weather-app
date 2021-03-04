import { api } from "./api";

describe("Helpers tests", () => {
  it("If the query fails, it must return an object ", function () {
    api.get("test").then((result) => {
      expect(result).toBe({});
    });
  });
});
