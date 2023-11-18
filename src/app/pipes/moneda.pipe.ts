import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'moneda'})

export class MonedaPipe implements PipeTransform {

  transform(value: number|string|null|undefined, moneda?:string): string {
    if (!value) 
    {
      switch (moneda?.toLowerCase())
      {
        case "usd":
          return `$-`;
        case "eur":
        default:
          return `- €`;
      }
    }
    if (typeof value === 'string')
    {
      return "NaN";
    }
    let v = value.toFixed(2);

    switch (moneda?.toLowerCase())
    {
      case "usd":
        return `$${v}`;
      default:
      case "eur":
        v = v.replace(".",","); 
        return `${v} €`;
    }
  }
}
