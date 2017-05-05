import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeightConverter } from '../../providers/weight-converter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  values = ['microgram', 'milligram', 'centigram', 'decigram', 'gram', 'dekagram', 'hectogram', 'kilogram', 'metricton'];
  convertForm: FormGroup;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private converter: WeightConverter,
    private formBuilder: FormBuilder) {

      this.convertForm = formBuilder.group({
        convValue: ['', Validators.required],
        from: ['', Validators.required],
        to: ['', Validators.required]
      });
  }

  convert(){
    this.converter.convertfromGramToKilogram(this.convertForm.value.convValue, this.convertForm.value.from, this.convertForm.value.to).then((res: any) => {
      let alert = this.alertCtrl.create({
        title: 'Convert Result: ' + res.ChangeMetricWeightUnitResult,
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }
}
