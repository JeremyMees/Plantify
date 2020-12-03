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
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantContainerComponent],
      providers: [
        {
          provide: PlantService,
          useValue: jasmine.createSpyObj('PlantService', [
            'setSelectedPlant',
            'getSelectedPlant',
            'getPlants',
            'onPlantChange',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fakeService = TestBed.inject(PlantService) as jasmine.SpyObj<PlantService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantContainerComponent);
    component = fixture.componentInstance;
    fakeService.getPlants.and.returnValue(PLANTS);
    fakeService.getSelectedPlant.and.returnValue(of(PLANTS[1]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should bind PLANTS`, () => {
    expect(component.plants).toEqual(PLANTS);
  });

  describe('given no plant is selected', () => {
    it('should not show details', () => {
      const plantDetail = fixture.debugElement.query(By.css('app-details'));
      expect(plantDetail).toBeNull();
    });

    it('should show the list', () => {
      const plantList = fixture.debugElement.query(By.css('app-list'));
      expect(plantList.properties.plants).toEqual(PLANTS);
    });
  });

  it('should call the function onPlantChange', () => {
    component.onPlantChange(PLANTS[1]);
    expect(fakeService.setSelectedPlant).toHaveBeenCalledWith(PLANTS[1]);
    expect(component.chosenPlant).toEqual(PLANTS[1]);
  });
});
