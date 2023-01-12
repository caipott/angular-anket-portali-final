import { Component } from '@angular/core';
import { Uye } from './../../models/Uye';
import { Gorev } from 'src/app/models/Gorev';
import { HotToastService } from '@ngneat/hot-toast';
import { FormGroup, FormControl } from '@angular/forms';
import { FbservisService } from 'src/app/services/fbservis.service';
import { switchMap } from 'rxjs';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-uyeler',
  templateUrl: './uyeler.component.html',
  styleUrls: ['./uyeler.component.scss']
})
export class UyelerComponent {
  mevcutGorevler: Gorev[] = [];
  eskiGorevler: Gorev[] = [];
  uyeler!: Uye[];
  modal!: Modal;
  modalBaslik: string = "";
  secUye!: Uye;
  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    displayName: new FormControl(),
    tel: new FormControl(),
    email: new FormControl(),
    parola: new FormControl(),
    admin: new FormControl(),
    adres: new FormControl(),
  });

  constructor(
    public htoast: HotToastService,
    public fbservis: FbservisService
  ) { }


  ngOnInit() {
    this.UyeListele();
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

  TamamIptal(gorev: Gorev, d: boolean) {
    gorev.tamam = d;
    this.fbservis.GorevDuzenle(gorev).then(() => {

    });
  }


  UyeListele() {
    this.fbservis.UyeListele().subscribe(d => {
      this.uyeler = d
    });

  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: Uye, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = "Üye Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Detay(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Detayları";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  Sil(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  GorevFiltre(eskiGorevler: any[]): any[] {
    return eskiGorevler.filter(p => p.uid == this.frm.value.uid);
  }


  UyeEkleDuzenle() {
    var uye: Uye = this.frm.value
    if (!uye.uid) {

      this.fbservis.KayitOl(this.frm.value.email, this.frm.value.parola).pipe(
        switchMap(({ user: { uid } }) =>
          this.fbservis.UyeEkle({
            uid,
            displayName: this.frm.value.displayName,
            // parola: this.frm.value.parola,
            tel: this.frm.value.tel,
            email: this.frm.value.email,
            admin: this.frm.value.admin,
            adres: this.frm.value.adres
          })
        ),
        this.htoast.observe({
          loading: 'Üye Ekleniyor',
          success: 'Üye Eklendi',
          error: ({ message }) => `Hata : ${message}`,
        })
      ).subscribe();
      this.modal.toggle();
    } else {
      this.fbservis.UyeDuzenle(uye).pipe(
        this.htoast.observe({
          loading: "Üye Güncelleniyor",
          success: "Üye GÜncellendi",
          error: ({ message }) => `Hata : ${message}`
        })
      ).subscribe();
      this.modal.toggle();
    }
  }

  UyeSil() {
    this.fbservis.UyeSil(this.secUye).then(() => {

    })
    this.modal.toggle();
  }
}