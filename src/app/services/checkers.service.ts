import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class CheckersService {
  constructor(private http: HttpClient) {}

  private processResponse(response: any): Response {
    // Implement processing logic here
    const processedData: Response = {
      ssl_certificate: response.ssl_cetificate,
      cipher_suites: { 'not-found': response.cipher_suites?.['not-found'] },
      security_headers: {
        'missing-headers': response.security_headers?.['missing-headers'] || [],
      },
      dns_info: { 'dns-records': response.dns_info?.['dns-records'] || {} },
      domain_check: response.domain_check || {},
      whois_check: { 'whois-info': response.whois_check?.['whois-info'] || {} },
    };

    return processedData;
  }

  checkDomain(domain: string): Observable<Response> {
    let payload = {
      domain: domain,
    };

    return this.http
      .post<Response>('http://127.0.0.1:8000/webtools/domain_check/', payload)
      .pipe(map((response) => this.processResponse(response)));
  }
}
