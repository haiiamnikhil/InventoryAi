import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragndrop]'
})
export class DragndropDirective {

  @Output() dropedFiles = new EventEmitter()
  @HostBinding('class.fileover') fileover:Boolean

  files:any= []

  constructor() { }
  @HostListener('dragover',['$event']) onDragover(event:any){
    event.preventDefault();
    event.stopPropagation();
    this.fileover = true;
  }

  @HostListener('dragleave',['$event']) onDragLeave(event:any){
    event.preventDefault();
    event.stopPropagation();
    this.fileover = false;
  }

  @HostListener('drop',['$event']) onDrop(event:any){
    event.preventDefault();
    event.stopPropagation();
    this.fileover = false;
    let files = event.dataTransfer.files;
    if(files.length > 0){
      this.files.push(this.dropedFiles.emit(files))
    }
  }
}
