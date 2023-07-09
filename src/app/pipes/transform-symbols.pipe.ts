import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformSymbols'
})
export class TransformSymbolsPipe implements PipeTransform {

  transform(value: string) {
   value = value.replace(/&#039;/gi, "'").replace(/&quot;/gi, '"')
    return value;
  }

}
