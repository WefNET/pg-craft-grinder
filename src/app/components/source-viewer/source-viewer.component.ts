import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-source-viewer',
  templateUrl: './source-viewer.component.html',
  styleUrls: ['./source-viewer.component.scss']
})
export class SourceViewerComponent  {
  @Input() item: any;
  @Input() items: any;

  constructor() {
   }

  getItem(itemTypeId: any): any {
    // console.log("Item Type ID", itemTypeId);

    const item = this.items.find(i => i.ItemNumber === Number(itemTypeId));

    return item;
    // if (item) {
    //   return `${item.Name} - Item`;
    // } else {
    //   return `Some item.. couldnt find`;
    // }
  }

  getIconUrl(id: any): string {
    return `http://cdn.projectgorgon.com/v327/icons/icon_${id}.png`;
  }
}
