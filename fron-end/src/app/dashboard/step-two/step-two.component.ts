import { Component, OnInit } from '@angular/core';
import { RealAccountService } from 'src/app/website/services/real-account.service';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/website/services/home-service.service';
import { LanguageService } from 'src/app/website/services/language.service';
import { DemAccountService } from 'src/app/website/services/dem-account.service';
import { LoginService } from 'src/app/website/auth/login.service';


@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {
  cardfile: any = [];
  isShowWebCam = false;
  cardfileSrcOne: any = '';
  cardfileSrcTwo: any = '';
  showAlert = false;
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';

  profileImageError = '';
  cardFileError = '';
  cardFileNumberError = '';


  constructor(protected realAccountService: RealAccountService,
    private router: Router,protected homeService: HomeService,
    protected languageService: LanguageService, protected loginService: LoginService,
    protected demoAccountService: DemAccountService
  ) { }

  ngOnInit(): void {
  }

  onShowWebCamModal() {
    this.isShowWebCam = !this.isShowWebCam;
  }

  public getSnapshot(): void {
    this.isShowWebCam = !this.isShowWebCam;
    this.trigger.next(void 0);
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;

  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }


  onChangeCardFile(event: any) {


    if (event.target.files.length == 1 && this.cardfile.length == 0) {
      this.cardfile.splice(0, 1, event.target.files[0]);
      const reader = new FileReader();
      reader.onload = e => this.cardfileSrcOne = reader.result;
      reader.readAsDataURL(this.cardfile[0]);
    } else if (event.target.files.length == 1 && this.cardfile.length == 1) {
      this.cardfile.splice(1, 1, event.target.files[0]);

      const reader = new FileReader();
      reader.onload = e => this.cardfileSrcTwo = reader.result;

      reader.readAsDataURL(this.cardfile[1]);
    }
    else if (event.target.files.length > 1) {

      for (let i = 0; i < event.target.files.length; i++) {
        this.cardfile.splice(0, 1, event.target.files[0]);
        this.cardfile.splice(1, 1, event.target.files[1]);

      }
      const readerone = new FileReader();
      const readertwo = new FileReader();

      readerone.onload = e => this.cardfileSrcOne = readerone.result;
      readertwo.onload = e => this.cardfileSrcTwo = readertwo.result;

      readerone.readAsDataURL(this.cardfile[0]);
      readertwo.readAsDataURL(this.cardfile[1]);
    }



  }


  onChangefileOne(event: any) {

    this.cardfile.splice(0, 1, event.target.files[0]);
    const reader = new FileReader();
    reader.onload = e => this.cardfileSrcOne = reader.result;
    reader.readAsDataURL(this.cardfile[0]);

  }

  onChangefileTwo(event: any) {

    this.cardfile.splice(1, 1, event.target.files[0]);
    const reader = new FileReader();
    reader.onload = e => this.cardfileSrcTwo = reader.result;
    reader.readAsDataURL(this.cardfile[1]);

  }

  onCloseOne() {
    if (this.cardfile.length == 2) {
      this.cardfile.splice(0, 1);
      this.cardfileSrcOne = this.cardfileSrcTwo;
      this.cardfileSrcTwo = '';
    } else if (this.cardfile.length == 1) {
      this.cardfile.pop();
      this.cardfileSrcOne = '';
    }

  }

  onCloseTwo() {
    this.cardfile.pop();
    this.cardfileSrcTwo = '';

  }


  dataURItoBlob(dataURI: any) {

    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab]);
    return bb;
  }


  onSubmit() {
    console.log("naw button");
    
    if (this.realAccountService.realFormStepOne.valid && this.sysImage != '' && this.cardfile.length != 0) {
      console.log("naw if");
      
      var profileImage = this.dataURItoBlob(this.sysImage);
      const formData = new FormData();
      formData.append('first_name', this.realAccountService.realFormStepOne.value.firstName);
      formData.append('last_name', this.realAccountService.realFormStepOne.value.lastName);
      formData.append('phone', this.realAccountService.realFormStepOne.value.phoneNumber);
      formData.append('email', this.realAccountService.realFormStepOne.value.email);
      formData.append('city', this.realAccountService.realFormStepOne.value.city);
      formData.append('birth', this.realAccountService.realFormStepOne.value.dateOfBirth);
      formData.append('password', this.realAccountService.realFormStepOne.value.password);
      formData.append('password_confirmation', this.realAccountService.realFormStepOne.value.confiremPassword);
      formData.append('country_id', this.realAccountService.realFormStepOne.value.country);
      formData.append('currency_id', this.realAccountService.realFormStepOne.value.currency);
      formData.append('type', 'real');
      formData.append('account_type', this.realAccountService.realFormStepOne.value.accountType);
      formData.append('platform', this.realAccountService.realFormStepOne.value.platformType);
      formData.append('leverage', this.realAccountService.realFormStepOne.value.leverage);
      formData.append('investment', this.realAccountService.realFormStepOne.value.investment);
      formData.append('typeCard', this.realAccountService.realFormStepOne.value.cardtype);
      formData.append('number', this.realAccountService.realFormStepOne.value.cardnumber);
      formData.append('image', profileImage, '');
      formData.append('image2', this.cardfile[0], this.cardfile[0].name);
      if (this.cardfileSrcTwo != '') {
        formData.append('secondary_image', this.cardfile[1], this.cardfile[1].name);
      }

      this.realAccountService.onSubmitRealAccount(formData).subscribe((response: any) => {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          this.router.navigate(['/']);
        }, 2000);

        console.log(response);
        localStorage.setItem('token', response.token)
        this.loginService.token = response.token;
        this.homeService.isVerifyEmailModalShow = true;
        this.homeService.isModalShow = false;
        
        this.realAccountService.realFormStepOne.reset();

      }, error => {
console.log(error);

      });

    } else {
      console.log("naw errory front");
      
      if (this.sysImage == '') {
        this.profileImageError = 'وێنە داواکراوە';
      }
      else {
        this.profileImageError = '';

      }

      if (this.cardfile.length == 0) {
        this.cardFileError = 'وێنە داواکراوە';

      }
      else {
        this.cardFileError = '';
      }

      if (this.realAccountService.realFormStepOne.value.cardnumber == null) {
        this.cardFileNumberError = 'ژمارەی کارت داواکراوە;';
      }
      else {
        this.cardFileNumberError = '';

      }


    }





  }



}
