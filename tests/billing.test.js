import { calculateCost } from "../libs/billing-lib";

test("Lowest tier", () => {
  const accounts = 2;

  const cost = 0;
  const expectedCost = calculateCost(accounts);

  expect(cost).toEqual(expectedCost);
});

test("Middle tier", () => {
  const accounts = 5;

  const cost = 600;
  const expectedCost = calculateCost(accounts);

  expect(cost).toEqual(expectedCost);
});

test("Highest tier", () => {
  const accounts = 10;

  const cost = 800;
  const expectedCost = calculateCost(accounts);

  expect(cost).toEqual(expectedCost);
});