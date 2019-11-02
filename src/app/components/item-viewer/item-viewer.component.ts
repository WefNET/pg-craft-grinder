import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-viewer',
  templateUrl: './item-viewer.component.html',
  styleUrls: ['./item-viewer.component.scss']
})
export class ItemViewerComponent {
  @Input() item: any;
  // { Item: "Salt", IconId: 5013 }

  constructor() { }

  getIconUrl(id: any): string {
    return `http://cdn.projectgorgon.com/v327/icons/icon_${id}.png`;
  }

}
