import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string ): string {
    const base_url = environment.base_url;
    if (img) {
      if (img.includes('https')) {
        return img;
      } else {
        return `${ base_url }/upload/usuarios/${ img }`;
      }
    }else{
      return `${ base_url }/upload/usuarios/no-image`;
    }
  }

}
