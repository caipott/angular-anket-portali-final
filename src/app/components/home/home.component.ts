import { HotToastService } from '@ngneat/hot-toast';
import { Gorev } from '../../models/Gorev';
import { Cevap } from 'src/app/models/Cevap';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap'
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  secGorev!: Gorev;
  Gorevler!: Gorev[];
  cevap!: Cevap;
  modal!: Modal;
  modalBaslik: string = "";
  uye = this.fbservis.AktifUyeBilgi;
  mevcutGorevler: Gorev[] = [];
  eskiGorevler: Gorev[] = [];
  frm: FormGroup = new FormGroup({
    baslik: new FormControl(),
    tamam: new FormControl(),
    soruBir: new FormControl(),
    soruIki: new FormControl(),
    soruUc: new FormControl(),
    soruDort: new FormControl(),
    soruBes: new FormControl(),
    soruAlti: new FormControl(),
  });
  frmCevap: FormGroup = new FormGroup({
    gorevId: new FormControl(),
    soruBir: new FormControl(),
    soruIki: new FormControl(),
    soruUc: new FormControl(),
    soruDort: new FormControl(),
    soruBes: new FormControl(),
    soruAlti: new FormControl(),
  })
  constructor(
    public fbservis: FbservisService,
    public htoast: HotToastService
  ) { }

  ngOnInit() {
    this.GorevListele();
    this.fbservis.aktifUye.subscribe(d => {
      console.log(d);
    });
  }
  GorevListele() {
    this.fbservis.GorevListele().subscribe(d => {
      this.mevcutGorevler = d.filter(s => s.tamam == false || s.tamam == null);
      this.eskiGorevler = d.filter(s => s.tamam == true);
    });
  }
  Kaydet() {
    // console.log(this.frm.value);
    this.fbservis.GorevEkle(this.frm.value)
      .pipe(
        this.htoast.observe({
          success: 'Anket Eklendi',
          loading: 'Anket Ekleniyor...',
          error: ({ message }) => `${message}`
        })
      )
      .subscribe();
  }

  CevapKaydet() {
    // console.log(this.frm.value);
    this.fbservis.CevapEkle(this.frmCevap.value, this.frmCevap.value)
      .pipe(
        this.htoast.observe({
          success: 'Cevap Eklendi',
          loading: 'Cevap Ekleniyor...',
          error: ({ message }) => `${message}`
        })
      )
      .subscribe();
  }

  Sil(gorev: Gorev) {
    this.fbservis.GorevSil(gorev).then(() => {

    });
  }
  TamamIptal(gorev: Gorev, d: boolean) {
    gorev.tamam = d;
    this.fbservis.GorevDuzenle(gorev).then(() => {

    });
  }

  Cevapla(gorev: Gorev, cevap: Cevap, el: HTMLElement) {
    console.log(gorev)
    this.secGorev = gorev;
    this.frmCevap.patchValue(cevap);

    let tmpGorevler: Gorev[] = [];
    tmpGorevler.push(gorev)
    this.Gorevler = tmpGorevler

    this.modalBaslik = "Cevapla";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
}
