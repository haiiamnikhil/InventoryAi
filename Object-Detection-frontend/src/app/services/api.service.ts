import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  header = new HttpHeaders({'Content-Type': 'application/json'})

  private messageSource = new BehaviorSubject<any>(0);
  currentmessage = this.messageSource.asObservable();
  
  constructor(private http:HttpClient) { }

  
  setMessages(message:any){
    const files = sessionStorage.setItem('files', JSON.stringify(message))
    this.messageSource.next(message)
  }

  changeMode(mode:string){
    this.messageSource.next(mode)
  }

  getsingleDetection(image:any):Observable<any>{
    return this.http.post('/process-image/',image)
  }
  downloadImage(image:any):Observable<any>{
    return this.http.post('/download-image/',image)
  }

  getMultiDetection(files:any):Observable<any>{
    return this.http.post('/multi-image-processor/',files)
  }

  login(credentials:any):Observable<any>{
    return this.http.post('/login-auth/',credentials,{headers:this.header})
  }

  register(credentials:any):Observable<any>{
    return this.http.post('/register-auth/',credentials,{headers:this.header})
  }

  isLoggedIn():Observable<any>{
    return this.http.post('/is-authenticated/',{headers:this.header})
  }

  logoutUser():Observable<any>{
    return this.http.get('/logout',{headers:this.header})
  }

  userDetails():Observable<any>{
    return this.http.get('/user-details/',{headers:this.header})
  }

  getInventory():Observable<any>{
    return this.http.get('/inventory/',{headers:this.header})
  }

  getAnalysis():Observable<any>{
    return this.http.get('/analysis/',{headers:this.header})
  }

  productAnalytics():Observable<any>{
    return this.http.get('/product-analytics/',{headers:this.header})
  }

  productHistory(category:any):Observable<any>{
    return this.http.post('/periodical-select/',category,{headers:this.header})
  }

  detectionHistory():Observable<any>{
    return this.http.get('/api-single-detection/',{headers:this.header})
  }
}