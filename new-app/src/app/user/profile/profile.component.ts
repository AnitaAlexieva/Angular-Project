  import { Component } from '@angular/core';
  import { NgForm } from '@angular/forms';
import { DOMAINS } from 'src/app/constants';
  import { User } from 'src/app/types/User';

  @Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
  })
  export class ProfileComponent {
  domains=DOMAINS;
  showEditMode: boolean = false;

  profileDetails: User = {
    username: 'Anitaaa',
    email: 'anitaa@gmail.com',
    imageUrl: 'https://i.pravatar.cc/150?img=12'
  };

  formModel: User = { ...this.profileDetails }; // копие за формата

  onEdit(): void {
    this.showEditMode = true;
    this.formModel = { ...this.profileDetails }; // reset на формата
  }

  saveProfile(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.profileDetails = { ...this.formModel }; // записваме само при Save
    this.showEditMode = false;
  }

  cancelEdit() {
    this.showEditMode = false;
  }
}
