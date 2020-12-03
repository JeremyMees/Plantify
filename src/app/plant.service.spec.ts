import { TestBed } from '@angular/core/testing';
import { PlantService } from './plant.service';
import { PLANTS } from './mock-plants';

describe('PlantService', () => {
  let service: PlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get plants', () => {
    expect(service.getPlants()).toEqual(PLANTS);
  });

  it('should get the slected plant', () => {
    const mockPlant = {
      id: 1,
      latinName: 'Monstera Deliciosa',
      name: 'Alfredo',
      price: 28.69,
      quantity: 1,
    };
    service.setSelectedPlant(mockPlant);
    service.getSelectedPlant().subscribe((result) => {
      expect(result).toEqual(mockPlant);
    });
  });
});
