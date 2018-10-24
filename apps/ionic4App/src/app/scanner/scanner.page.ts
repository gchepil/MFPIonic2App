import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanner',
  templateUrl: 'scanner.page.html',
  styleUrls: ['scanner.page.scss']
})
export class ScannerPage {
  result: BarcodeScanResult;

  constructor(private barcodeScanner: BarcodeScanner) {
  }

  async scanBarcode() {
    try {
      const options: BarcodeScannerOptions = {
        prompt: 'Scan QRcode',
        torchOn: true
      }
      this.result = await this.barcodeScanner.scan(options);
    }
    catch (error) {
      alert('Error: ' + error);
    }
  }

  openBrowser(): boolean {
    window.open(this.result.text, '_system', 'location=yes');
    return false;
  }
}
