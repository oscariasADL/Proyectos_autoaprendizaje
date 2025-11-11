import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ContactProductFilter } from '../entities/contact.interface';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  const setup = (): {
    service: ContactService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(ContactService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: ContactService = TestBed.inject(ContactService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchContacts', () => {
    const { service, httpTestingController } = setup();
    const url =
      urlBuilder.services(ENV.api.services.contact.all) +
      `?filterBy=${ContactProductFilter.ALL}`;
    const mockData = {};
    const payload = {
      filterBy: ContactProductFilter.ALL
    };
    service.fetchContacts(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchContactProducts', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.contact.products);
    const mockData = {};
    const payload = {
      idType: '',
      id: '',
      filterBy: ContactProductFilter.ALL
    };
    service.fetchContactProducts(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call addProductToContact', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.contact.add_product);
    const mockData = {};
    const payload = null;
    service.addProductToContact(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
