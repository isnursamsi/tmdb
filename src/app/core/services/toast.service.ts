import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  [x: string]: any;
  toasts: any[] = [];
  message: string = ''

  show(statusCode: number|null,textOrTpl: string | TemplateRef<any>, type:string, options: any = {}) {
    this.toasts.push({ textOrTpl, statusCode, type, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
  setMessage(message: string) {
    this.message = message;
  }
}
