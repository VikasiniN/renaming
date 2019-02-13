import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from './customer.model';
import { Url } from './url.model';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { NavHeaderService } from './nav-header.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  toggleMenuBar = 'colapseMenuBar';
  /* subscribeModel: Subscribe; */
  arrayBuffer: any;
  file: File;
  copyForm: FormGroup;
  urlList: Url;
  newCustomer: Customer[] = [];
  customers;
  whatsappShareUrl: string;
  facebookShareUrl: string;
  /*   readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY'; */

  constructor(private fb: FormBuilder,
    private navHeaderService: NavHeaderService, private http: HttpClient, private swUpdate: SwUpdate, private swPush: SwPush) { }

  ngOnInit() {
    this.urlForm();
  }
  toggleMenu() {
    this.toggleMenuBar = this.toggleMenuBar === 'colapseMenuBar' ? 'expandMenuBar' : 'colapseMenuBar';
  }
  uploadingfile(event) {
    this.file = event.target.files[0];
  }
  shareContent() {
    this.whatsappShareUrl = 'https://api.whatsapp.com/send?phone=919965437973&text=welcome%20to%20CRM%20'
   /* + 'http://ec2-13-126-16-163.ap-south-1.compute.amazonaws.com:3021/' */;

    window.location.href = this.whatsappShareUrl;

  }
  shareFacebook() {
    this.facebookShareUrl =
      'https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttps%253A%252F%252Frinteger.com%252F%26amp%253Bsrc%3Dsdkpreparse&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=en_GB';
    window.location.href = this.facebookShareUrl;
  }


  /* subscribe()
  {
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      this.subscribeModel = new Subscribe();
      this.subscribeModel.userSubscriptions = sub;
      this.navHeaderService.addPushSubscriber(this.subscribeModel).subscribe();
    })
    .catch(err => console.error('Could not subscribe to notifications', err));
} */
  urlForm() {
    this.copyForm = this.fb.group({
      url: ['']
    });
  }


  Upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.customers = XLSX.utils.sheet_to_json(worksheet);
      this.navHeaderService.createCustomer(this.customers).subscribe(detail => {
        this.newCustomer = detail;
        console.log(detail);
      });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  copy(copyForm: FormGroup) {
    this.urlList = new Url(
      copyForm.controls.url.value,
    );
    this.navHeaderService.copyUrl(this.urlList).subscribe();
  }
  renameOriginal(copyForm: FormGroup) {
    this.urlList = new Url(
      copyForm.controls.url.value,
    );
    this.navHeaderService.renameOriginalUrl(this.urlList).subscribe();
  }
  renameCropped(copyForm: FormGroup) {
    this.urlList = new Url(
      copyForm.controls.url.value,
    );
    this.navHeaderService.renameOriginalCroppedUrl(this.urlList).subscribe();
  }
  resizeCopy(copyForm: FormGroup) {
    this.urlList = new Url(
      copyForm.controls.url.value,
    );
    this.navHeaderService.resizeCopyUrl(this.urlList).subscribe();
  }
  resizeRename(copyForm: FormGroup) {
    this.urlList = new Url(
      copyForm.controls.url.value,
    );
    this.navHeaderService.resizeRenameCopyUrl(this.urlList).subscribe();
  }
}

