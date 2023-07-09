import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(value: number | null): string {
    const hours: number = Math.floor(value as number / 3600);
    const minutes: number = Math.floor((value as number % 3600) / 60);
    return (
      ("00" + hours).slice(-2) +
      ":" +
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value as number - minutes * 60)).slice(-2)
    );
  }

}
