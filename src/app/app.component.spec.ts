import { TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateService, TranslatePipe, TranslateLoader } from '@ngx-translate/core';
import { of, Observable } from 'rxjs';
import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { BadgeComponent } from './components/badge/badge.component';

const translations: any = {CARDS_TITLE: 'This is a test'};

export class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

@Pipe({
  name: 'translate'
})
export class TranslatePipeMock implements PipeTransform {
  public name = 'translate';

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}

@Injectable()
export class TranslateServiceStub {
  public get<T>(key: T): Observable<T> {
    return of(key);
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserDynamicTestingModule
      ],
      declarations: [
        AppComponent, BadgeComponent
      ],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: TranslatePipe, useClass: TranslatePipeMock },
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ BadgeComponent ],
      }
    }).compileComponents();
  }));

  /*it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });*/

  /*it('should render badge element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('alarms-badge-element').textContent).toContain('alarms-management-ui app is running!');
  });*/
});
