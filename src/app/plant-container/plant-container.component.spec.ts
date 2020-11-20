import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlantContainerComponent } from './plant-container.component';
import { PlantService } from '../plant.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PLANTS } from '../mock-plants';

describe('PlantContainerComponent', () => {
  let component: PlantContainerComponent;
  let fixture: ComponentFixture<PlantContainerComponent>;
  let fakeService: jasmine.SpyObj<PlantService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantContainerComponent ],
      providers: [
        {
          provide: PlantService,
          useValue: jasmine.createSpyObj('PlantService', [
            'onPlantChange',
            'getSelectedPlant',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    fakeService = TestBed.inject(PlantService) as jasmine.SpyObj<PlantService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantContainerComponent);
    component = fixture.componentInstance;
    fakeService.getSelectedPlant.and.returnValue(of(PLANTS[1]))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('given no plant is selected', () => {
    beforeEach(() => {
      fixture.detectChanges();
      fakeService.getSelectedPlant.and.returnValue(of(PLANTS[1]));
      fixture.detectChanges();
    });

    it('should not show details', () => {
      fixture.detectChanges();
      const plantDetail = fixture.debugElement.query(By.css('app-detail'));
      expect(plantDetail).toBeNull();
    });

    it('should show the list', () => {
      const plantList = fixture.debugElement.query(By.css('app-list'));
      expect(plantList.properties.plants).toEqual(PLANTS);
    });
  });

  describe('when a plant is selected', () => {
    beforeEach(() => {
      fixture.detectChanges();
      fakeService.getSelectedPlant.and.returnValue(of(PLANTS[1]));
      fixture.detectChanges();
    });

    it('should show the details of the selected plant', () => {
      const plantDetail = fixture.debugElement.query(By.css('app-detail'));
      expect(plantDetail.properties.plant).toEqual(component.choosenPlant);
    });
  });
});