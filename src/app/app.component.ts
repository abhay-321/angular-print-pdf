import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'print-pdf';
  base64String: any;
  constructor(private dataService : DataService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.dataService.getData().subscribe((baseImage:any) => {
      let base64Source = 'data:image/jpeg;base64,' + baseImage.data;
      this.base64String = this.sanitizer.bypassSecurityTrustUrl(base64Source);
    })
  }

  printPDF() {
    const targetElement : any = document.getElementById("printContainer");
    const WindowPrt : any = window.open('', '', 'left=500,top=100,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(targetElement.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}
