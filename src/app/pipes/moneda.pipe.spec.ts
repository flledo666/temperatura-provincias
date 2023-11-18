import { MonedaPipe } from './moneda.pipe';

describe('MonedaPipe', () => {
  it('Creación', () => {
    const pipe = new MonedaPipe();
    expect(pipe).toBeTruthy();
  });
  it('abc |moneda -> NaN', () => {
    const pipe = new MonedaPipe();
    expect(pipe.transform("abc")).toBe('NaN');
  });
  
  describe ('Test Euros', () => {
    it('123.4 |moneda:EUR  -> 123,40 €', () => {
      const pipe = new MonedaPipe();
      expect(pipe.transform(123.4,"EUR")).toBe('123,40 €');
    });
    it('123.4 |moneda  -> 123,40 €', () => {
      const pipe = new MonedaPipe();
      expect(pipe.transform(123.4)).toBe('123,40 €');
    });
    it('null |moneda -> - €', () => {
      const pipe = new MonedaPipe();
      expect(pipe.transform(null)).toBe('- €');
    });
  });

  describe ('Test Dólares', () => {
    it('123.4 |moneda:USD  -> $123.40', () => {
      const pipe = new MonedaPipe();
      expect(pipe.transform(123.4,"USD")).toBe('$123.40');
    });
    it('123.409 |moneda:USD -> $123.41', () => {
      const pipe = new MonedaPipe();
      expect(pipe.transform(123.409,"USD")).toBe('$123.41');
    });
    it('null |moneda:USD -> $-', () => {
      const pipe = new MonedaPipe();
      expect(pipe.transform(null,"USD")).toBe('$-');
    });
  });
});
