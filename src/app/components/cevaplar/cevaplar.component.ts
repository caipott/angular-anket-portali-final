import { HotToastService } from '@ngneat/hot-toast';
import { Gorev } from '../../models/Gorev';
import { Cevap } from 'src/app/models/Cevap';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap'
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-cevaplar',
  templateUrl: './cevaplar.component.html',
  styleUrls: ['./cevaplar.component.scss']
})
export class CevaplarComponent {
  mevcutCevaplar: Cevap[] = [];
  constructor(
    public fbservis: FbservisService,
    public htoast: HotToastService
  ) { }
  ngOnInit() {
    this.CevapListele();
    this.fbservis.aktifUye.subscribe(d => {
      console.log(d);
    });
  }
  CevapListele() {
    this.fbservis.CevapListele().subscribe(d => {
      this.mevcutCevaplar = d.filter(s => s.gorevId == null);
    });
  }
}
