import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-profile-photo',
  template: `
    <img
      src="https://toppng.com/uploads/preview/avatar-png-115540218987bthtxfhls.png"
      alt="Your profile photo"
    />
  `,
  styles: `
    img {
      border-radius: 50%;
      width: 50px;
    }
  `,
})
export class ProfilePhoto {
  // logica del componente
}
