import { formatCurrency } from "../../scripts/utils/money.js";

describe('Test Suite: Formatcurrency',()=>{
  it('test with zero',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });
  it('converst cents to dollar',()=>{
    expect(formatCurrency(1000)).toEqual('10.00');
  })
  it('rounds the nubmer',()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01');
  })
});