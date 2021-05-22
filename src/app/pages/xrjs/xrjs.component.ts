import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry,take, map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-xrjs',
  templateUrl: './xrjs.component.html',
  styles: [
  ]
})
export class XrjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {
    
    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('subs', valor),
    //   (error) => console.log('error',error),
    //   () => console.log('obs terminado')
    //   )
   this.intervalSubs = this.retornaIntervalo()
        .subscribe(console.log)
  }
  ngOnDestroy(){
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo():Observable<number>{
    return interval(500)
      .pipe(
        //take(10),
        map(valor => valor + 1),
        filter(f => (f % 2 === 0) ? true:false)
        
      )
    
  }

  retornaObservable(){
    let i =-1;
   return new Observable<number>( observer=>{
      const intervalo = setInterval( () =>{
        i++
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo)
          observer.complete();
        }

        if (i === 2) {
          // i = 0;
          console.log('i es igual a 2 ... eror')
          observer.error('i llego al valor 2')
        }
      },1000);
    });

  }


}
