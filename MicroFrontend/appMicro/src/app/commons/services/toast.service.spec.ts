import { TestBed } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { ToastrService } from 'ngx-toastr';
import { ToastType } from '../entities/toast/toast.entities';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        ToastService,
        {
          provide: ToastrService,
          useValue: {
            [ToastType.success]: (a, b, c) => {
              return;
            },
            clear: () => {
              return;
            }
          }
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be create toast', () => {
    expect(
      service.create({
        type: ToastType.success,
        title: 'TEST',
        message: 'TEST'
      })
    ).toBeUndefined();
  });
  it('should clear all toasts', () => {
    const toastrService = TestBed.inject(ToastrService);
    spyOn(toastrService, 'clear');

    service.clear();

    expect(toastrService.clear).toHaveBeenCalled();
  });
  it('should return null when key is null', () => {
    const result = (service as any).getText(null);
    expect(result).toBeNull();
  });
});
