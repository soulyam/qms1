import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
//   private audio = new Audio();
//   public playSound = false;

//   constructor() {
//     this.audio.src = '../../../assets/audio/sound.mp3';
//   }




//   private soundPlayedSubject = new Subject<void>();
//   soundPlayed$ = this.soundPlayedSubject.asObservable();

//   play() {
//     this.audio.currentTime = 0;
//     this.audio.play();
//     this.soundPlayedSubject.next();
//   }
// private buttonClickedSubject = new Subject<void>();

// buttonClicked$ = this.buttonClickedSubject.asObservable();

// onButtonClicked() {
//   this.buttonClickedSubject.next();
// }


private buttonClickSubject = new Subject<boolean>();
  public buttonClick$ = this.buttonClickSubject.asObservable();
  public variableToChange: any;

    // Méthode pour modifier la variable
    public changeVariable(newValue: any) {
      this.variableToChange = newValue;
    }
  
    // Méthode pour déclencher l'observable
    public buttonClicked() {
      this.buttonClickSubject.next(true);
    }


    private clickSubject = new Subject();

    emitClick() {
      this.clickSubject.next(true);
    }
    getClickEvent() {
      return this.clickSubject.asObservable();
    }
}
